# 🏓 iBasterisk Retro TENIS

Retro arkádová webová hra inšpirovaná klasickým PONGom.

🌐 https://tenis.ibasterisk.eu

## Funkcie

- Hra proti počítaču a režim pre dvoch hráčov
- Tri úrovne obtiažnosti
- Originálna 8-bit hudba a zvukové efekty
- Slovenské a anglické rozhranie
- Ovládanie klávesnicou a dotykom
- Responzívny dizajn
- Mobilné ikony a PWA manifest
- Docker nasadenie pomocou Nginx

## Ovládanie

| Akcia | Ovládanie |
|---|---|
| Hráč 1 | W / S |
| Hráč 2 | Šípky ↑ / ↓ |
| Pauza | Medzerník |
| Mobil | Dotykové tlačidlá |

Zápas sa hrá do 7 bodov.

## Spustenie pomocou Docker Compose

```bash
docker compose up -d --build
```

Aplikácia je statická webová hra obsluhovaná Nginxom.

Pred spustením na inom serveri upravte IP adresu a port
v súbore `docker-compose.yml`.

Predvolená konfigurácia používa `10.10.8.6:3087`.

## Technológie

HTML5 Canvas, CSS3, JavaScript, Web Audio API, Docker a Nginx.

## Jazykové verzie

🇸🇰 Slovenčina / 🇬🇧 English

[English README](README_EN.md)

## Autor

iBasterisk
