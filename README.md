[🇸🇰 Slovenčina](README.md) | [🇬🇧 English](README_EN.md)

# 🏓 iBasterisk Retro TENIS

Retro arkádová webová hra inšpirovaná klasickým PONGom.

🌐 https://tenis.ibasterisk.eu

## 📥 Stiahnutie a inštalácia

### Možnosť 1 – Git Clone

```bash
git clone https://github.com/ibasterisk/tenis.git
cd tenis
```

### Možnosť 2 – Download ZIP

1. Otvor [GitHub repozitár](https://github.com/ibasterisk/tenis).
2. Klikni na zelené tlačidlo **Code**.
3. Vyber **Download ZIP**.
4. Rozbaľ stiahnutý archív.

### Spustenie aplikácie

Pre nastavenie IP adresy a portu použi lokálny súbor `.env` podľa `.env.example`.

Potom spusti:

```bash
docker compose up -d --build
```

Aplikácia bude dostupná na porte `3087`, na IP adrese nastavenej v Docker Compose.

**Poznámka:** Pokiaľ je repozitár súkromný, stiahnutie vyžaduje oprávnený GitHub účet.

### Univerzálna Docker konfigurácia

Pred spustením vytvor lokálnu konfiguráciu:

1. Skopíruj `.env.example` do `.env`.
2. V `.env` nastav `TENIS_BIND_IP` a `TENIS_PORT`.
3. Spusti `docker compose up -d --build`.

Predvolené nastavenie používa `127.0.0.1:3087`.
Pre prístup z iných zariadení nastav LAN IP servera.

Pri aktualizácii použi `git pull` a následne
`docker compose up -d --build`.

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

Predvolená konfigurácia používa `127.0.0.1:3087`.

## Technológie

HTML5 Canvas, CSS3, JavaScript, Web Audio API, Docker a Nginx.

## Autor

iBasterisk
