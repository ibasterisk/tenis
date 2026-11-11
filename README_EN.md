[🇸🇰 Slovenčina](README.md) | [🇬🇧 English](README_EN.md)

# 🏓 iBasterisk Retro TENNIS

A retro arcade browser game inspired by classic PONG.

🌐 https://tenis.ibasterisk.eu

## 📥 Download and installation

### Option 1 – Git Clone

```bash
git clone https://github.com/ibasterisk/tenis.git
cd tenis
```

### Option 2 – Download ZIP

1. Open the [GitHub repository](https://github.com/ibasterisk/tenis).
2. Click the green **Code** button.
3. Select **Download ZIP**.
4. Extract the downloaded archive.

### Run the application

Configure the IP address and port in a local `.env` file using `.env.example`.

Then run:

```bash
docker compose up -d --build
```

The application will be available on port `3087` at the IP address configured in Docker Compose.

**Note:** While the repository is private, downloading requires GitHub authorization.

### Universal Docker configuration

Before starting the application:

1. Copy `.env.example` to `.env`.
2. Configure `TENIS_BIND_IP` and `TENIS_PORT` in `.env`.
3. Run `docker compose up -d --build`.

The default configuration uses `127.0.0.1:3087`.
For access from other devices, configure your server's LAN IP.

To update, run `git pull` followed by
`docker compose up -d --build`.

## Features

- Single-player mode against the computer
- Local two-player mode
- Three difficulty levels
- Original 8-bit music and sound effects
- Slovak and English interface
- Keyboard and touch controls
- Responsive design
- Mobile icons and PWA manifest
- Docker deployment with Nginx

## Controls

| Action | Controls |
|---|---|
| Player 1 | W / S |
| Player 2 | Arrow keys ↑ / ↓ |
| Pause | Space |
| Mobile | Touch buttons |

The first player to reach 7 points wins.

## Docker Compose

```bash
docker compose up -d --build
```

The game is a static website served by Nginx.

Before deploying to another server, adjust the IP address and
port in `docker-compose.yml`.

The default configuration uses `127.0.0.1:3087`.

## Technologies

HTML5 Canvas, CSS3, JavaScript, Web Audio API, Docker and Nginx.

## Languages

🇸🇰 Slovak / 🇬🇧 English

[Slovenský README](README.md)

## Author

iBasterisk
