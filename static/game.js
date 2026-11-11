"use strict";

(() => {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const $ = id => document.getElementById(id);
    const t = key => window.TenisI18n.t(key);
    let overlayType = "ready";
    let winnerKey = "winner1";

    function updateLabels() {
        $("right-label").textContent =
            t(mode === "cpu" ? "computer" : "player2");

        $("music-btn").textContent =
            t("music") + ": " + (musicEnabled ? "ON" : "OFF");

        $("sound-btn").textContent =
            t("sound") + ": " + (soundEnabled ? "ON" : "OFF");

        if (state !== "playing") {
            if (overlayType === "ready") {
                overlay(t("ready"), t("readyMessage"));
            } else if (overlayType === "paused") {
                overlay(t("pause"), t("pauseMessage"));
            } else if (overlayType === "finished") {
                overlay(t(winnerKey), t("gameOver"));
            }
        }
    }
    const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

    const left = { x: 25, y: 200, w: 13, h: 100, score: 0 };
    const right = { x: W - 38, y: 200, w: 13, h: 100, score: 0 };
    const ball = { x: W / 2, y: H / 2, vx: 0, vy: 0, r: 9 };

    let mode = "cpu";
    let difficulty = "normal";
    let state = "ready";
    let lastTime = 0;
    let musicEnabled = false;
    let soundEnabled = true;
    let volume = 0.35;
    let audio = null;
    let musicTimer = null;
    let noteIndex = 0;
    let aiOffset = 0;
    let aiTimer = 0;

    const keys = new Set();
    const touch = new Set();

    const melody = [
        220, 0, 330, 440, 0, 330, 392, 0,
        294, 0, 392, 494, 0, 392, 330, 0,
        262, 0, 330, 392, 0, 494, 440, 0,
        330, 0, 294, 262, 0, 220, 330, 0
    ];

    function initAudio() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return false;
        if (!audio) audio = new AudioContext();
        if (audio.state === "suspended") audio.resume();
        return true;
    }

    function tone(freq, duration = 0.08, type = "square", gain = 0.12) {
        if (!audio || !freq) return;

        const now = audio.currentTime;
        const osc = audio.createOscillator();
        const amp = audio.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        amp.gain.setValueAtTime(
            Math.max(0.0001, gain * volume),
            now
        );
        amp.gain.exponentialRampToValueAtTime(
            0.0001, now + duration
        );

        osc.connect(amp);
        amp.connect(audio.destination);
        osc.start(now);
        osc.stop(now + duration);
    }

    function effect(freq, duration = 0.07) {
        if (soundEnabled) tone(freq, duration, "square", 0.16);
    }

    function startMusic() {
        stopMusic();
        if (!musicEnabled || state !== "playing" || !initAudio()) return;

        musicTimer = setInterval(() => {
            if (state !== "playing") return;
            const note = melody[noteIndex % melody.length];
            noteIndex++;
            if (note) tone(note, 0.12, "triangle", 0.09);
        }, 190);
    }

    function stopMusic() {
        if (musicTimer !== null) clearInterval(musicTimer);
        musicTimer = null;
    }

    function overlay(title, message) {
        $("game-overlay").classList.remove("hidden");
        $("game-overlay").innerHTML =
            `<h2>${title}</h2><p>${message}</p>`;
    }

    function hideOverlay() {
        $("game-overlay").classList.add("hidden");
    }

    function updateScore() {
        $("score-left").textContent = left.score;
        $("score-right").textContent = right.score;
    }

    function serve(direction = Math.random() < 0.5 ? -1 : 1) {
        ball.x = W / 2;
        ball.y = H / 2;
        const speed = difficulty === "hard" ? 6.7 : 5.3;
        ball.vx = speed * direction;
        ball.vy = (Math.random() * 4 - 2) || 1.5;
        aiOffset = 0;
        aiTimer = 0;
    }

    function reset() {
        state = "ready";
        stopMusic();
        left.score = 0;
        right.score = 0;
        left.y = (H - left.h) / 2;
        right.y = (H - right.h) / 2;
        ball.x = W / 2;
        ball.y = H / 2;
        ball.vx = 0;
        ball.vy = 0;
        updateScore();
        overlayType = "ready";
        overlay(t("ready"), t("readyMessage"));
    }

    function start() {
        initAudio();
        mode = $("game-mode").value;
        difficulty = $("difficulty").value;
        $("right-label").textContent =
            t(mode === "cpu" ? "computer" : "player2");

        if (state === "ready" || state === "finished") {
            left.score = 0;
            right.score = 0;
            updateScore();
            serve();
        }

        state = "playing";
        hideOverlay();
        startMusic();
    }

    function pause() {
        if (state === "playing") {
            state = "paused";
            stopMusic();
            overlayType = "paused";
            overlay(t("pause"), t("pauseMessage"));
        } else if (state === "paused") {
            state = "playing";
            hideOverlay();
            startMusic();
        }
    }

    function finish(winner) {
        state = "finished";
        stopMusic();

        if (soundEnabled) {
            effect(523, 0.15);
            setTimeout(() => effect(784, 0.2), 160);
        }

        overlayType = "finished";
        winnerKey = winner;
        overlay(t(winnerKey), t("gameOver"));
    }

    function point(player) {
        player.score++;
        updateScore();
        effect(165, 0.25);

        if (player.score >= 7) {
            finish(player === left
                ? "winner1"
                : mode === "cpu"
                    ? "winnerCpu"
                    : "winner2");
            return;
        }

        serve(player === left ? 1 : -1);
    }

    function movePaddles(dt) {
        const speed = 7.5 * dt;

        let leftDir = 0;
        if (keys.has("w") || touch.has("left-up")) leftDir--;
        if (keys.has("s") || touch.has("left-down")) leftDir++;

        if (mode === "cpu") {
            if (keys.has("arrowup")) leftDir--;
            if (keys.has("arrowdown")) leftDir++;
        }

        left.y = clamp(left.y + leftDir * speed, 0, H - left.h);

        if (mode === "pvp") {
            let rightDir = 0;
            if (keys.has("arrowup") || touch.has("right-up")) rightDir--;
            if (keys.has("arrowdown") || touch.has("right-down")) rightDir++;
            right.y = clamp(right.y + rightDir * speed, 0, H - right.h);
        } else {
            const settings = {
                easy: { speed: 2.7, error: 62 },
                normal: { speed: 4.3, error: 28 },
                hard: { speed: 6.3, error: 9 }
            }[difficulty];

            aiTimer -= dt;
            if (aiTimer <= 0) {
                aiOffset = (Math.random() * 2 - 1) * settings.error;
                aiTimer = 34;
            }

            const target = ball.vx > 0
                ? ball.y - right.h / 2 + aiOffset
                : H / 2 - right.h / 2;

            const delta = target - right.y;
            right.y = clamp(
                right.y + clamp(
                    delta, -settings.speed * dt, settings.speed * dt
                ),
                0, H - right.h
            );
        }
    }

    function paddleHit(paddle, movingRight) {
        const overlapY =
            ball.y + ball.r >= paddle.y &&
            ball.y - ball.r <= paddle.y + paddle.h;

        const overlapX = movingRight
            ? ball.x + ball.r >= paddle.x &&
              ball.x - ball.r <= paddle.x + paddle.w
            : ball.x - ball.r <= paddle.x + paddle.w &&
              ball.x + ball.r >= paddle.x;

        if (!overlapX || !overlapY) return false;

        const relative = clamp(
            (ball.y - (paddle.y + paddle.h / 2)) / (paddle.h / 2),
            -1, 1
        );
        const speed = Math.min(12, Math.hypot(ball.vx, ball.vy) + 0.3);
        const angle = relative * 0.85;

        ball.vx = (movingRight ? -1 : 1) *
            Math.max(3.5, speed * Math.cos(angle));
        ball.vy = speed * Math.sin(angle);

        ball.x = movingRight
            ? paddle.x - ball.r
            : paddle.x + paddle.w + ball.r;

        effect(420 + Math.abs(relative) * 280);
        return true;
    }

    function update(dt) {
        if (state !== "playing") return;

        movePaddles(dt);

        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;

        if (ball.y - ball.r <= 0) {
            ball.y = ball.r;
            ball.vy = Math.abs(ball.vy);
            effect(310);
        } else if (ball.y + ball.r >= H) {
            ball.y = H - ball.r;
            ball.vy = -Math.abs(ball.vy);
            effect(310);
        }

        if (ball.vx < 0) paddleHit(left, false);
        if (ball.vx > 0) paddleHit(right, true);

        if (ball.x < -ball.r) point(right);
        else if (ball.x > W + ball.r) point(left);
    }

    function draw() {
        ctx.fillStyle = "#020509";
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = "#284458";
        ctx.lineWidth = 4;
        ctx.setLineDash([16, 17]);
        ctx.beginPath();
        ctx.moveTo(W / 2, 0);
        ctx.lineTo(W / 2, H);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = "#132c3b";
        ctx.lineWidth = 2;
        ctx.strokeRect(10, 10, W - 20, H - 20);

        ctx.shadowBlur = 20;
        ctx.shadowColor = "#22d3ee";
        ctx.fillStyle = "#22d3ee";
        ctx.fillRect(left.x, left.y, left.w, left.h);

        ctx.shadowColor = "#f472b6";
        ctx.fillStyle = "#f472b6";
        ctx.fillRect(right.x, right.y, right.w, right.h);

        ctx.shadowColor = "#ffffff";
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    function frame(timestamp) {
        const dt = lastTime
            ? Math.min((timestamp - lastTime) / 16.667, 2)
            : 1;
        lastTime = timestamp;

        update(dt);
        draw();
        requestAnimationFrame(frame);
    }

    $("start-btn").addEventListener("click", start);
    $("pause-btn").addEventListener("click", pause);
    $("reset-btn").addEventListener("click", reset);

    $("game-mode").addEventListener("change", () => {
        if (state !== "playing") {
            mode = $("game-mode").value;
            $("right-label").textContent =
                t(mode === "cpu" ? "computer" : "player2");
        }
    });

    $("music-btn").addEventListener("click", () => {
        initAudio();
        musicEnabled = !musicEnabled;
        $("music-btn").textContent =
            t("music") + ": " + (musicEnabled ? "ON" : "OFF");
        if (musicEnabled) startMusic();
        else stopMusic();
    });

    $("sound-btn").addEventListener("click", () => {
        soundEnabled = !soundEnabled;
        $("sound-btn").textContent =
            t("sound") + ": " + (soundEnabled ? "ON" : "OFF");
    });

    $("volume").addEventListener("input", event => {
        volume = Number(event.target.value) / 100;
    });

    window.addEventListener("keydown", event => {
        const key = event.key.toLowerCase();

        if (["arrowup", "arrowdown", " "].includes(key)) {
            event.preventDefault();
        }

        keys.add(key);

        if (key === " " && !event.repeat) {
            if (state === "ready" || state === "finished") start();
            else pause();
        }
    });

    window.addEventListener("keyup", event => {
        keys.delete(event.key.toLowerCase());
    });

    window.addEventListener("blur", () => {
        keys.clear();
        touch.clear();
        if (state === "playing") pause();
    });

    for (const id of ["left-up", "left-down", "right-up", "right-down"]) {
        const button = $(id);

        button.addEventListener("pointerdown", event => {
            event.preventDefault();
            button.setPointerCapture(event.pointerId);
            touch.add(id);
        });

        const release = () => touch.delete(id);
        button.addEventListener("pointerup", release);
        button.addEventListener("pointercancel", release);
        button.addEventListener("lostpointercapture", release);
    }

    canvas.addEventListener("pointermove", event => {
        if (state !== "playing") return;
        if (event.pointerType === "mouse" && event.buttons !== 1) return;

        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width * W;
        const y = (event.clientY - rect.top) / rect.height * H;

        if (x < W / 2) {
            left.y = clamp(y - left.h / 2, 0, H - left.h);
        } else if (mode === "pvp") {
            right.y = clamp(y - right.h / 2, 0, H - right.h);
        }
    });

    window.addEventListener("tenis-language-change", updateLabels);

    reset();
    requestAnimationFrame(frame);
})();
