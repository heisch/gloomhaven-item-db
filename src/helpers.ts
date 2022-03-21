import qs from "qs";
import { GameType } from "./games";

type CreateParams = {
	filename: string;
	folder?: string;
	className?: string;
	lowercaseName?: boolean;
};

const createImageString = (parms: CreateParams) => {
	let {
		filename,
		folder = "general",
		className = "icon",
		lowercaseName = true,
	} = parms;
	filename = lowercaseName ? filename.toLowerCase() : filename;
	const src = require(`./img/icons/${folder}/${filename}.png`);
	return `<img class="${className}" src="${src}" alt="${filename}"/>`;
};

export class Helpers {
	static uniqueArray(arr: Array<any>, sort: boolean = true) {
		const result: Array<any> = [];
		arr.forEach((entry) => {
			if (!result.includes(entry)) {
				result.push(entry);
			}
		});
		return sort ? result.sort() : result;
	}

	static parseEffectText(text: string, gameType: GameType) {
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
			if (status === "WOUND" && gameType === GameType.Frosthaven) {
				filename = "FH-WOUND".toLowerCase();
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

		["Refresh", "Recover", "Jump", "Teleport", "Flying"].forEach((find) => {
			const reg = new RegExp(`\\b(${find})\\b`, "g");
			text = text.replace(
				reg,
				`${"$1"} ${createImageString({ filename: find })}`
			);
		});

		["modifier_minus_one", "consumed", "experience_1"].forEach((find) => {
			const reg = new RegExp(`{${find}}`, "g");
			text = text.replace(reg, createImageString({ filename: find }));
		});

		["Doom", "Command", "song", "Augment"].forEach((find) => {
			const reg = new RegExp(`{${find}}`, "g");
			text = text.replace(
				reg,
				`<span class="${find.toLowerCase()}">${find}</span>`
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
