# Book Party Room

This project is a bot designed to filter and automatically book party rooms on the ReUbird website. The bot uses Playwright to automate the browsing and booking process.

## Prerequisites
- Node.js (v14 or higher)
- pnpm package manager

##Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/mass-submit-party-room.git
cd mass-submit-party-room
```
2. Install the dependencies:
```bash
pnpm install
```

## Configuration
Make sure to update the `searchUrl` and `requirements` in the `index.ts` file as per your needs:
```typescript
const numOfPeople = 8;
const searchUrl = new URL(
    "https://reubird.hk/search/type/party-room?..."
);
const requirements = [
    "獨立派對房間",
    "打麻雀",
    "可以唱K",
    // "可免費自攜飲品",
    // "可免費自攜食物",
    // "場地設有吸煙區",
    // "飲品免費任飲",
    // "可以煮食",
    // "有Poker枱",
    // "大廈外附近有位置可供泊車",
    // "波波池",
    // "提供美食到會預訂服務",
    // "可留至凌晨",
    // "可打邊爐",
    // "可BBQ燒烤",
    // "可打邊爐並提供打邊爐用具",
];
```

## Running the Bot
To start the bot, run the following command:
```
pnpm start
```
