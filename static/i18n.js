"use strict";

(() => {
    const translations = {
        sk: {
            title: "RETRO TENIS",
            subtitle: "Klasický PONG v modernom retro štýle",
            player1: "HRÁČ 1",
            player2: "HRÁČ 2",
            computer: "POČÍTAČ",
            ready: "PRIPRAVENÝ HRAŤ?",
            readyMessage: "Vyber herný režim a stlač HRAŤ",
            mode: "Herný režim",
            cpuMode: "1 hráč proti počítaču",
            pvpMode: "2 hráči",
            difficulty: "Obtiažnosť",
            easy: "Ľahká",
            normal: "Normálna",
            hard: "Ťažká",
            play: "▶ HRAŤ",
            pauseButton: "⏸ PAUZA",
            reset: "↻ RESET",
            music: "♫ HUDBA",
            sound: "♪ ZVUKY",
            volume: "Hlasitosť",
            pause: "PAUZA",
            pauseMessage: "Stlač HRAŤ alebo MEDZERNÍK",
            winner1: "VYHRAL HRÁČ 1!",
            winner2: "VYHRAL HRÁČ 2!",
            winnerCpu: "VYHRAL POČÍTAČ!",
            gameOver: "Koniec zápasu! Stlač HRAŤ pre novú hru.",
            controls1: "HRÁČ 1: W / S alebo ↑ / ↓",
            controls2: "HRÁČ 2: ↑ / ↓",
            controlsPause: "MEDZERNÍK: PAUZA"
        },
        en: {
            title: "RETRO TENNIS",
            subtitle: "Classic PONG with a modern retro look",
            player1: "PLAYER 1",
            player2: "PLAYER 2",
            computer: "COMPUTER",
            ready: "READY TO PLAY?",
            readyMessage: "Choose a game mode and press PLAY",
            mode: "Game mode",
            cpuMode: "1 player vs computer",
            pvpMode: "2 players",
            difficulty: "Difficulty",
            easy: "Easy",
            normal: "Normal",
            hard: "Hard",
            play: "▶ PLAY",
            pauseButton: "⏸ PAUSE",
            reset: "↻ RESET",
            music: "♫ MUSIC",
            sound: "♪ SOUNDS",
            volume: "Volume",
            pause: "PAUSED",
            pauseMessage: "Press PLAY or SPACE",
            winner1: "PLAYER 1 WINS!",
            winner2: "PLAYER 2 WINS!",
            winnerCpu: "COMPUTER WINS!",
            gameOver: "Game over! Press PLAY for a new match.",
            controls1: "PLAYER 1: W / S or ↑ / ↓",
            controls2: "PLAYER 2: ↑ / ↓",
            controlsPause: "SPACE: PAUSE"
        }
    };

    const supported = ["sk", "en"];

    let language = localStorage.getItem("tenis-language") || "sk";
    if (!supported.includes(language)) language = "sk";

    function t(key) {
        return translations[language][key] || key;
    }

    function applyTranslations() {
        document.documentElement.lang = language;

        document.querySelectorAll("[data-i18n]").forEach(element => {
            element.textContent = t(element.dataset.i18n);
        });

        document.querySelectorAll("[data-lang]").forEach(button => {
            const active = button.dataset.lang === language;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        document.title = language === "sk"
            ? "iBasterisk Retro TENIS"
            : "iBasterisk Retro TENNIS";

        window.dispatchEvent(new Event("tenis-language-change"));
    }

    function setLanguage(nextLanguage) {
        if (!supported.includes(nextLanguage)) return;
        language = nextLanguage;
        localStorage.setItem("tenis-language", language);
        applyTranslations();
    }

    window.TenisI18n = {
        t,
        getLanguage: () => language,
        applyTranslations,
        setLanguage
    };

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll("[data-lang]").forEach(button => {
            button.addEventListener("click", () => {
                setLanguage(button.dataset.lang);
            });
        });

        applyTranslations();
    });
})();
