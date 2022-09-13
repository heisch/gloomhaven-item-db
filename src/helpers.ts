import qs from "qs";
import { GameType } from "./games";
import { AllGames } from "./games/GameType";

interface CreateParams {
	filename: string;
	folder: string;
}

interface WHCreateParams extends CreateParams {
	game?: string;
	className?: string;
	lowercaseName?: boolean;
	subfolder?: string;
}

export const createWorldhavenString = (parms: WHCreateParams) => {
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
	const { folder = "general", filename } = parms;
	const src = require(`./img/icons/${folder}/${filename}.png`);
	return `<img class="icon" src="${src}" alt="${filename}"/>`;
};

const folderMap: Record<string, string> = {
	"\\^": "general",
	"\\$": "status",
	"\\@": "element",
	"\\#": "equipment_slot",
	"\\*": "multi_attack",
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

	static parseForIcon(delimiter: string, text: string) {
		const folder = folderMap[delimiter];
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

	static parseEffectText(text: string) {
		const actionReg = new RegExp(`(~!)(.+?)(!~)`, "g");
		text = text.replace(actionReg, `<span class="action"> ${"$2"} </span>`);

		text = this.parseForIcon("\\^", text);
		text = this.parseForIcon("\\$", text);
		text = this.parseForIcon("\\@", text);
		text = this.parseForIcon("\\#", text);
		text = this.parseForIcon("\\*", text);

		const reg = new RegExp(`%(.+?)%`, "g");
		text = text.replace(reg, `<span class="${"$1"}">${"$1"}</span>`);

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

export const isFrosthavenGameAndEnabled = (gameType: AllGames) => {
	if (gameType === GameType.Frosthaven) {
		if (isFlagEnabled("frosthaven")) {
			return true;
		}
		return false;
	}
	return true;
};
