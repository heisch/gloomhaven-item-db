import qs from "qs";
import { GameType } from "./games";
import { AllGames } from "./games/GameType";
import { gameTypeState } from "./State";

type CreateParams = {
	filename: string;
	game?: string;
	folder?: string;
	className?: string;
	lowercaseName?: boolean;
	subfolder?: string;
};

export const createWorldhavenString = (parms: CreateParams) => {
	const {
		game,
		folder = "general",
		className = "icon",
		lowercaseName = true,
		subfolder = "",
	} = parms;
	let { filename } = parms;
	filename = lowercaseName ? filename.toLowerCase() : filename;
	const src = require(`../worldhaven/images/${folder}/${game}/${subfolder}/${filename}.png`);
	return `<img class="${className}" src="${src}" alt="${filename}"/>`;
};

const createImageString = (parms: CreateParams) => {
	const {
		folder = "general",
		className = "icon",
		lowercaseName = true,
	} = parms;
	let { filename } = parms;
	filename = lowercaseName ? filename.toLowerCase() : filename;
	const src = require(`./img/icons/${folder}/${filename}.png`);
	return `<img class="${className}" src="${src}" alt="${filename}"/>`;
};

export class Helpers {
	static uniqueArray<T>(arr: Array<T>, sort = true) {
		const result: Array<T> = [];
		arr.forEach((entry) => {
			if (!result.includes(entry)) {
				result.push(entry);
			}
		});
		return sort ? result.sort() : result;
	}

	static parseForIcon(
		delimiter: string,
		text: string,
		folder: string = "general"
	) {
		const exp = new RegExp(`${delimiter}(.+?)${delimiter}`, "g");
		const matches = text.match(exp);
		if (matches) {
			matches.forEach((match) => {
				text = text.replace(
					match,
					createImageString({
						filename: match.substring(1, match.length - 1),
						folder,
					})
				);
			});
		}
		return text;
	}

	static parseEffectText(text: string, gameType: GameType) {
		if (text.includes("~!")) {
			const reg = new RegExp(`(~!)(.+?)(!~)`, "g");
			text = text.replace(reg, `<span class="action"> ${"$2"} </span>`);
		}

		text = this.parseForIcon("\\^", text);
		text = this.parseForIcon("\\$", text, "status");

		[
			"BANE",
			"BLESS",
			"BRITTLE",
			"CURSE",
			"DISARM",
			"IMMOBILIZE",
			"IMPAIR",
			"INVISIBLE",
			"MUDDLE",
			"PIERCE",
			"POISON",
			"PULL",
			"PUSH",
			"REGENERATE",
			"ROLLING",
			"STRENGTHEN",
			"STUN",
			"TARGET",
			"WOUND",
			"WARD",
		].forEach((status) => {
			let filename = status.toLowerCase();
			if (filename === "wound" && gameType === GameType.Frosthaven) {
				filename = "fh-" + filename;
			}
			const reg = new RegExp(`\\b${status}\\b`, "g");
			text = text.replace(
				reg,
				`${status} ${createImageString({ filename, folder: "status" })}`
			);
		});

		["Attack", "Move", "Range", "Heal"].forEach((find) => {
			const reg = new RegExp(`(\\+\\d+ ${find}\\b)`, "g");
			text = text.replace(
				reg,
				`${"$1"} ${createImageString({ filename: find })}`
			);
		});

		[
			"Attack",
			"Heal",
			"Shield",
			"Retaliate",
			"Move",
			"Range",
			"Loot",
		].forEach((find) => {
			const reg = new RegExp(`\\b(${find})\\b (\\d+)`, "g");
			text = text.replace(
				reg,
				`${"$1"} ${createImageString({ filename: find })} ${"$2"}`
			);
		});

		["Refresh", "Recover", "Jump", "Teleport", "Flying", "spent"].forEach(
			(find) => {
				const reg = new RegExp(`\\b(${find})\\b`, "g");
				text = text.replace(
					reg,
					`${"$1"} ${createImageString({ filename: find })}`
				);
			}
		);

		[
			"modifier_minus_one",
			"modifier_minus_one_circle",
			"consumed",
			"experience_1",
			"modifier_2x_circle",
			"modifier_zero_circle",
			"modifier_no_damage",
			"modifier_plus_1",
			"retaliate",
			"eot",
			"shield",
			"target",
			"attack",
			"loot",
			"scrapX",
			"damage",
			"range",
			"move",
			"recover",
			"fh-range",
			"fh-shield",
			"fh-heal",
			"fh-jump",
			"fh-move",
		].forEach((find) => {
			const reg = new RegExp(`{${find}}`, "g");
			text = text.replace(reg, createImageString({ filename: find }));
		});

		["muddle", "regenerate", "fh-wound", "poison"].forEach((find) => {
			const reg = new RegExp(`{${find}}`, "g");
			text = text.replace(
				reg,
				createImageString({ filename: find, folder: "status" })
			);
		});

		[
			"Doom",
			"Command",
			"song",
			"Augment",
			"Spirit",
			"Prayer",
			"Mounted",
		].forEach((find) => {
			const reg = new RegExp(`{${find}}`, "g");
			text = text.replace(
				reg,
				`<span class="${find.toLowerCase()}">${find}</span>`
			);
		});

		["enchantment-circle"].forEach((find) => {
			const reg = new RegExp(`{${find}}`, "g");
			text = text.replace(
				reg,
				`<span class="${find.toLowerCase()}"></span>`
			);
		});

		text = text.replace(
			/\bsmall items\b/g,
			`${createImageString({
				filename: "small",
				folder: "equipment_slot",
			})} items`
		);
		["any", "earth", "fire", "ice", "light", "dark", "wind"].forEach(
			(element) => {
				const reg = new RegExp(`{${element}(X?)}`, "g");
				text = text.replace(reg, (m, m1) =>
					createImageString({
						filename: element.toLowerCase() + m1,
						folder: "element",
						lowercaseName: false,
					})
				);
			}
		);

		text = text.replace(/{multi_attack\.(.+?)}/, (m, m1) => {
			let className = "icon";
			const type = m1.replace(/^(.+?)_.*$/, "$1");
			if (["cleave", "cone", "cube"].includes(type)) {
				className += " double-height";
			}
			return createImageString({
				filename: m1,
				folder: "multi_attack",
				className,
			});
		});

		["cs-spirit-caller-token"].forEach((find) => {
			const reg = new RegExp(`{${find}}`, "g");
			text = text.replace(
				reg,
				createWorldhavenString({
					folder: "tokens",
					game: "crimson-scales",
					subfolder: "character-tokens",
					filename: find,
				})
			);
		});

		["INFECT", "RUPTURE"].forEach((status) => {
			let filename = status.toLowerCase();
			filename = "cs-" + filename;
			const reg = new RegExp(`\\b${status}\\b`, "g");
			text = text.replace(
				reg,
				`${status} ${createWorldhavenString({
					filename,
					folder: "tokens",
					game: "crimson-scales",
					subfolder: "condition-tokens",
				})}`
			);
		});

		return text;
	}
}

export function isFlagEnabled(flagName: string) {
	if (!window) {
		return false;
	}
	const urlParams = qs.parse(window.location.search.substr(1));

	const paramValue = urlParams[flagName];

	const localStorageFlagKey = flagName;

	if (paramValue === "false" || paramValue === "0") {
		window.localStorage.removeItem(localStorageFlagKey);
	}

	if (paramValue === "true" || paramValue === "1") {
		window.localStorage.setItem(localStorageFlagKey, "true");
	}

	return window.localStorage.getItem(localStorageFlagKey) === "true";
}

export const isFrosthavenGameAndEnabled = (gameType: AllGames) => {
	if (gameType === GameType.Frosthaven) {
		if (isFlagEnabled("frosthaven")) {
			return true;
		}
		return false;
	}
	return true;
};
