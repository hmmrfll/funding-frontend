# 🚀 Funding Arbitrage Bot - Frontend

Telegram Mini App для мониторинга и арбитража funding rates между биржами Extended и Hyperliquid.

> 📅 **Проект зародился 24 августа 2025 года** как личная инициатива для участия в конкурсе от команды [cp0x](https://t.me/c/1639919522/35731/39936) и [Extended](https://app.extended.exchange/)

## 🔗 Связанные репозитории

- **Frontend (Telegram Mini App)**: [funding-frontend](https://github.com/hmmrfll/funding-frontend) *(текущий репозиторий)*
- **Backend (API Server)**: [funding-backend](https://github.com/hmmrfll/funding-backend)

## 🛠️ Технологический стек

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Telegram Mini App](https://img.shields.io/badge/Telegram-Mini_App-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)

## 🏗️ Архитектура

- **Telegram Mini App** - Нативная интеграция с Telegram WebApp API
- **React + TypeScript** - Современный UI с типизацией
- **Vite** - Быстрая сборка и разработка
- **TailwindCSS** - Utility-first CSS фреймворк

## 🚀 Быстрый старт

### Предварительные требования

- ![Node.js](https://img.shields.io/badge/Node.js-18+-43853D?style=flat&logo=node.js&logoColor=white)
- ![npm](https://img.shields.io/badge/npm-8+-CB3837?style=flat&logo=npm&logoColor=white) или ![yarn](https://img.shields.io/badge/yarn-1.22+-2C8EBB?style=flat&logo=yarn&logoColor=white)
- Запущенный [Backend сервер](https://github.com/hmmrfll/funding-backend)

### 🌐 Настройка HTTPS для разработки

Telegram Mini App требует HTTPS. Для локальной разработки используйте:

**Вариант 1: ngrok**
```bash
# Установите ngrok: https://ngrok.com/
# Запустите туннель для frontend
ngrok http 5173

# Скопируйте HTTPS URL (например: https://def456.ngrok.io)
```

**Вариант 2: Cloudflare Tunnel**
```bash
# Установите cloudflared
cloudflared tunnel --url http://localhost:5173

# Скопируйте HTTPS URL из вывода команды
```

### Установка и запуск

1. **Клонируйте репозиторий**
```bash
git clone https://github.com/hmmrfll/funding-frontend.git
cd funding-frontend
```

2. **Настройте переменные окружения**
```bash
cp .env.example .env
```

Отредактируйте `.env` файл:
```env
FRONTEND_PORT_LOCAL=5173
FRONTEND_CONTAINER_NAME=front-funding
VITE_PORT=5173
VITE_BACKEND_URL=
VITE_FRONTEND_URL=
```

> ⚠️ **Важно**: `VITE_BACKEND_URL` и `VITE_FRONTEND_URL` должны быть HTTPS ссылками. Локальные `http://localhost` не будут работать с Telegram Mini App.

3. **Запустите приложение**
```bash
docker-compose up -d
```

4. **Проверьте статус**
```bash
docker-compose ps
curl https://your-ngrok-url.ngrok.io/health
```

### 🛠️ Разработка без Docker

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Запуск продакшен версии
npm start
```

## 🗂️ Структура проекта

```
├── public/                 # Статические файлы
├── src/                   # Исходный код
│   ├── components/        # React компоненты
│   ├── pages/            # Страницы приложения
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API сервисы
│   ├── store/           # State management
│   ├── types/            # TypeScript типы
│   ├── utils/            # Утилиты
│   ├── App.tsx           # Главный компонент
│   └── main.tsx          # Точка входа
├── package.json          # Зависимости
├── vite.config.ts        # Конфигурация Vite
├── tailwind.config.js    # Конфигурация Tailwind
└── tsconfig.json         # Конфигурация TypeScript
```


## ⚡ Основной функционал

- **📊 Real-time мониторинг** - Отслеживание funding rates с бирж Extended и Hyperliquid в режиме реального времени
- **💰 Арбитражные возможности** - Автоматический поиск и отображение выгодных арбитражных сделок
- **📈 Аналитика и графики** - Интерактивные диаграммы и исторические данные по торговым парам
- **🔔 Персональные уведомления** - Настраиваемые алерты при превышении порогов прибыльности
- **⚙️ Управление настройками** - Подключение API ключей бирж и персонализация интерфейса
- **📱 Нативная интеграция** - Полная адаптация под Telegram Mini App с haptic feedback


## 🗺️ Дорожная карта

> 🌟 **Open Source проект!** Каждый желающий может внести свой вклад в развитие. Проект родился благодаря личной инициативе для участия в конкурсе от команды [cp0x](https://t.me/c/1639919522/35731/39936) и [Extended](https://app.extended.exchange/). Присоединяйтесь к разработке! 🚀

<table>
<tr>
<td width="25%">

### ✅ **MVP v1.0**
**Текущая версия**

- [x] 📱 Telegram Mini App
- [x] 📊 Real-time мониторинг
- [x] 🎨 Responsive дизайн
- [x] 🔔 Push уведомления
- [x] ⚙️ Настройки пользователя
- [x] 🔐 Telegram авторизация
- [x] 🌓 Темная/светлая тема

</td>
<td width="25%">

### 🔄 **v1.1**
**В разработке**

- [ ] 📈 Интерактивные графики
- [ ] 📊 Advanced аналитика
- [ ] 📄 Экспорт данных
- [ ] 🎯 Быстрые действия

</td>
<td width="25%">

### 🚀 **v1.2**
**Планируется**

- [ ] 💳 Интеграция кошельков
- [ ] 🤖 Автоматические сделки
- [ ] 🔔 Smart уведомления
- [ ] 📊 Кастомные дашборды
- [ ] 🎮 Геймификация

</td>
<td width="25%">

### 🌟 **v2.0**
**Будущее**

- [ ] 🌐 Мультиплатформенность
- [ ] 👥 Социальные функции
- [ ] 🎨 Кастомизация UI
- [ ] 🌍 Мультиязычность

</td>
</tr>
</table>

## 📞 Поддержка

- **Канал разработчика**: [@vm4sto](https://t.me/vm4sto)
- **Контакт разработчика**: [@hmmrfll](https://t.me/hmmrfll)

## 📄 Лицензия

MIT License - подробности в файле [LICENSE](LICENSE)

---

<div align="center">
  <strong>Нативное Telegram Mini App для трейдеров</strong><br>
  <em>Арбитраж funding rates в вашем кармане 📱</em><br><br>

  ![Telegram Mini App](https://img.shields.io/badge/Telegram-Mini_App-blue?style=flat&logo=telegram)
  ![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat&logo=typescript)
  ![Open Source Love](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red?style=flat)
</div>
