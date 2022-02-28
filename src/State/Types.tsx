import { GameType } from "../games";

export enum SortDirection {
	ascending = "ascending",
	descending = "descending",
}

export enum ItemManagementType {
	None = "None",
	Simple = "Simple",
	Party = "Party",
}

export enum ItemViewDisplayType {
	List = "list",
	Images = "images",
}

export type SortProperty = "id" | "slot" | "cost" | "name" | "use";

export enum GHClasses {
	BR = "BR",
	TI = "TI",
	SW = "SW",
	SC = "SC",
	CH = "CH",
	MT = "MT",
	SK = "SK",
	QM = "QM",
	SU = "SU",
	NS = "NS",
	PH = "PH",
	BE = "BE",
	SS = "SS",
	DS = "DS",
	SB = "SB",
	EL = "EL",
	BT = "BT",
	XX = "XX",
}

export enum FCClasses {
	DR = "DR",
}

export enum JOTLClasses {
	DM = "DM",
	HT = "HT",
	RG = "RG",
	VW = "VW",
}
export type SoloClassShorthand = GHClasses | FCClasses;

export type ClassesInUse = GHClasses | FCClasses | JOTLClasses;

export enum GloomhavenItemSlot {
	Head = "Head",
	Body = "Body",
	Legs = "Legs",
	OneHand = "One Hand",
	TwoHands = "Two Hands",
	SmallItem = "Small Item",
}
export type GloomhavenItemSourceType =
	| "Prosperity"
	| "Random Item Design"
	| "Scenario"
	| "Treasure"
	| "Solo Scenario"
	| "Road Event"
	| "City Event";

export interface GloomhavenItem {
	id: number;
	displayId: number;
	gameType: GameType;
	name: string;
	count: number;
	cost: number;
	slot: GloomhavenItemSlot;
	source: string;
	spent?: boolean;
	consumed?: boolean;
	minusOneCardsAdded?: number;
	useSlots?: number;
	desc: string;
	descHTML: string;
	faq?: string;
	summon?: {
		hp: number;
		move: number;
		attack: number;
		range: number;
	};
	soloItem?: SoloClassShorthand;
	folder: string;
}
export const getGHClassList = (envelopeX: boolean, fc: boolean = false) => {
	let ghList: ClassesInUse[] = Object.values(GHClasses);
	if (!envelopeX) {
		ghList = ghList.filter((c) => c !== GHClasses.XX);
	}
	if (fc) {
		ghList = ghList.concat(FCClasses.DR);
	}
	return ghList;
};
