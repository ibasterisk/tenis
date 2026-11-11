[🇸🇰 Slovenčina](README.md) | [🇬🇧 English](README_EN.md)

# 🏓 iBasterisk Retro TENNIS

A retro arcade browser game inspired by classic PONG.

🌐 https://tenis.ibasterisk.eu

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

The default configuration uses `10.10.8.6:3087`.

## Technologies

HTML5 Canvas, CSS3, JavaScript, Web Audio API, Docker and Nginx.

## Languages

🇸🇰 Slovak / 🇬🇧 English

[Slovenský README](README.md)

## Author

iBasterisk
