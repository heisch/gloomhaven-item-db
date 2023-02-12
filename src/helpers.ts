import qs from "qs";
import { GameType } from "./games";
import { AllGames } from "./games/GameType";
import { GloomhavenItem } from "./State";

interface CreateParams {
	filename: string;
	folder: string;
	game?: string;
	subfolder?: string;
}

export const createWorldhavenString = (parms: CreateParams) => {
	const { game, folder = "general", subfolder = "", filename } = parms;
	const src = require(`../worldhaven/images/${folder}/${game}/${subfolder}/${filename}.png`);
	return `<img class="icon" src="${src}" alt="${filename}"/>`;
};

const folderMap: Record<string, string> = {
	"\\@": "elements",
	"\\#": "equipment_slot",
	"\\$": "conditions",
	"\\^": "general",
	"\\*": "multi_attack",
	"\\`": "resources",
};

const parseForIcon = (delimiter: string, text: string) => {
	const folder = folderMap[delimiter];
	const exp = new RegExp(`${delimiter}(.+?)${delimiter}`, "g");
	const matches = text.match(exp);
	if (matches) {
		matches.forEach((match) => {
			let filename = match.substring(1, match.length - 1);
			let src;
			if (filename.startsWith("wfh-")) {
				filename = filename.substring(1);
				src = require(`../worldhaven/images/tokens/frosthaven/${folder}/${filename}.png`);
			} else {
				src = require(`./img/icons/${folder}/${filename}.png`);
			}
			text = text.replace(
				match,
				`<img class="icon" src="${src}" alt="${filename}"/>`
			);
		});
	}
	return text;
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

	static parseEffectText(text: string) {
		const consumeReg = new RegExp(`(~@)(.+?)(@~)`, "g");
		text = text.replace(
			consumeReg,
			`<span class="consume-action"> ${"$2"} </span>`
		);

		const actionReg = new RegExp(`(~!)(.+?)(!~)`, "g");
		text = text.replace(actionReg, `<span class="action"> ${"$2"} </span>`);

		Object.keys(folderMap).forEach((key) => {
			text = parseForIcon(key, text);
		});

		const reg = new RegExp(`%(.+?)%`, "g");
		text = text.replace(reg, `<span class="${"$1"}">${"$1"}</span>`);

		const reg2 = new RegExp(`!(.+?)!`, "g");
		text = text.replace(reg2, `<span class="${"$1"}"/>`);

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

export const formatId = (id: number | string) => {
	return id.toString().padStart(3, "0");
};

export const getItemIdString = (item: GloomhavenItem) => {
	const { displayId, id, gameType } = item;
	return `${gameType ? gameType.toUpperCase() : ""} #${formatId(
		displayId || id
	)}`;
};

export const isLocalHost = /localhost|127\.0\.0\.1|::1/.test(
	window.location.host
);
