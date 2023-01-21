import fs from "fs";

const folderName = "../worldhaven/images/items/frosthaven";

const dirs = fs.readdirSync(folderName);

let fileList = [];
dirs.forEach((dir) => {
	const files = fs.readdirSync(`${folderName}/${dir}`);
	const filteredFiles = files.filter((name) => !name.includes("-back.png"));
	fileList = [
		...fileList,
		...filteredFiles
			.map((file) => {
				const splitName = file.split("-");
				const gameType = splitName[0];
				const idStr = splitName[1];
				if (
					idStr.endsWith("b") ||
					idStr.endsWith("c") ||
					idStr.endsWith("d")
				) {
					console.log(`ignoring ${idStr}`);
					return null;
				}
				const count = idStr.endsWith("a") ? 2 : 1;
				const imageSuffix = idStr.endsWith("a") ? "a" : undefined;
				const id = parseInt(splitName[1], 10);
				const name = splitName.slice(2).join(" ").replace(".png", "");
				const item = {
					id,
					gameType,
					name,
					count,
					cost: 50,
					slot: "head",
					source: "unknown",
					desc: "",
					folder: dir,
					imageSuffix,
				};
				return item;
			})
			.filter((item) => item),
	];
});

fs.writeFileSync("./items.json", JSON.stringify(fileList, null, 2));
console.log(fileList.length);
