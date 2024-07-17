import { chromium } from "playwright";

const numOfPeople = 8;
const searchUrl = new URL(
	"https://reubird.hk/search/type/party-room?person=8&deliverDate=2024-07-21&timeStart=1721538000000&timeEnd=1721552400000&dayPart=afternoon"
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

async function main() {
	const browser = await chromium.launch({ headless: false });
	const page = await browser.newPage();

	for (let pageNum = 1; ; pageNum++) {
		searchUrl.searchParams.set("page", pageNum.toString());
		await page.goto(searchUrl.toString());

		if (await page.$(`:text("未有相符結果")`)) {
			break;
		}

		const links = await page.$$eval('a[href^="/party-room/"]', anchors =>
			anchors.map(anchor => (anchor as HTMLAnchorElement).href)
		);

		for (const link of links) {
			await page.goto(link);

			const fitRequirements = await Promise.all(
				requirements.map(async keyword => page.$(`:text("${keyword}")`))
			);

			if (!fitRequirements.every(Boolean)) {
				continue;
			}

			await page.fill(
				`input[placeholder="請填寫人數"]`,
				numOfPeople.toString()
			);

			await page.click(`h6:text("日期") + div`);

			await page.click(`.react-datepicker__day--021`);
			if (await page.$(`.rb-close-badge`)) {
				await page.click(`.rb-close-badge`);
			}

			await page.selectOption(`select:has(:text("開始時間"))`, {
				label: "01:00 PM",
			});

			await page.selectOption(`select:has(:text("完結時間"))`, {
				label: "07:00 PM",
			});

			await page.click(`:text("發出預約查詢")`);

			await page.fill(`:text("你的稱呼") + div input`, "Jacky");
			await page.fill(`:text("聯絡電話") + div input`, "64676899");
			await page.fill(
				`:text("電郵地址") + div input`,
				"chanyatfu0616@gmail.com"
			);

			await page.click(`:text("發出預訂查詢")`);
			await page.waitForSelector(`:text("預約查詢已經發出")`);
		}
	}

	await browser.close();
}

main();
