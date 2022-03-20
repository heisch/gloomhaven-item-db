import qs from "qs";
import { GameType } from "./games";

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
				`${status} 
					${
						'<img class="icon" src="' +
						require("./img/icons/status/" + filename + ".png") +
						'" alt=""/>'
					}`
			);
		});

		["Attack", "Move", "Range"].forEach((find) => {
			const reg = new RegExp(`(\\+\\d+ ${find}\\b)`, "g");
			text = text.replace(
				reg,
				`${"$1"} 
					${
						'<img class="icon" src="' +
						require("./img/icons/general/" +
							find.toLowerCase() +
							".png") +
						'" alt=""/>'
					}`
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
				`${"$1"}
					${
						'<img class="icon" src="' +
						require("./img/icons/general/" +
							find.toLowerCase() +
							".png") +
						'" alt=""/>'
					} 
					${"$2"}`
			);
		});

		text = text.replace(
			/\bsmall items\b/g,
			'<img class="icon" src="' +
				require("./img/icons/equipment_slot/small.png") +
				'" alt=""/> items'
		);
		text = text.replace(
			/\bRefresh\b/g,
			'Refresh <img class="icon" src="' +
				require("./img/icons/general/refresh.png") +
				'" alt=""/>'
		);
		text = text.replace(
			/\bRecover\b/g,
			'Recover <img class="icon" src="' +
				require("./img/icons/general/recover.png") +
				'" alt=""/>'
		);
		text = text.replace(
			/\bJump\b/g,
			'Jump <img class="icon" src="' +
				require("./img/icons/general/jump.png") +
				'" alt=""/>'
		);
		text = text.replace(
			/\bFlying\b/g,
			'Flying <img class="icon" src="' +
				require("./img/icons/general/flying.png") +
				'" alt=""/>'
		);
		text = text.replace(
			/\bTeleport\b/g,
			'Teleport <img class="icon" src="' +
				require("./img/icons/general/teleport.png") +
				'" alt=""/>'
		);
		text = text.replace(
			/{exp1}/g,
			'<img class="icon" src="' +
				require("./img/icons/general/experience_1.png") +
				'" alt=""/>'
		);
		text = text.replace(/{Doom}/g, '<span class="doom">Doom</span>');
		text = text.replace(
			/{modifier_minus_one}/g,
			'<img class="icon" src="' +
				require("./img/icons/general/modifier_minus_one.png") +
				'" alt=""/>'
		);
		text = text.replace(
			/{consumed}/g,
			'<img class="icon" src="' +
				require("./img/icons/general/consumed.png") +
				'" alt=""/>'
		);
		["any", "earth", "fire", "ice", "light", "dark", "wind"].forEach(
			(element) => {
				const reg = new RegExp(`{${element}(X?)}`, "g");
				// text = text.replace(reg, '<img class="icon" src="'+require('./img/icons/element/'+element.toLowerCase()+'.png')+'" alt=""/>' );
				text = text.replace(
					reg,
					(m, m1) =>
						'<img class="icon" src="' +
						require("./img/icons/element/" +
							element.toLowerCase() +
							m1 +
							".png") +
						'" alt=""/>'
				);
			}
		);

		text = text.replace(/{multi_attack\.(.+?)}/, (m, m1) => {
			let className = "icon";
			const type = m1.replace(/^(.+?)_.*$/, "$1");
			if (["cleave", "cone", "cube"].includes(type)) {
				className += " double-height";
			}
			return `<img class="${className}" src="${require("./img/icons/multi_attack/" +
				m1 +
				".png")}" alt=""/>`;
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
