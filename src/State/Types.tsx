import { AllGames } from "../games/GameType";

export type ItemsOwnedBy = Record<string, ClassesInUse[]>;
// export type ItemsOwnedBy = Array<ClassesInUse[]>;

export type ItemsInUse = Record<number, number>;

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

export enum SortProperty {
	Id = "id",
	Slot = "slot",
	Cost = "cost",
	Name = "name",
	Use = "use",
}

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

export enum FHClasses {
	BB = "BB",
	BN = "BN",
	BO = "BO",
	DF = "DF",
	DW = "DW",
	GE = "GE",
	FH7 = "FH7",
	FH8 = "FH8",
	FH9 = "FH9",
	FH10 = "FH10",
	FH11 = "FH11",
	FH12 = "FH12",
	FH13 = "FH13",
	FH14 = "FH14",
	FH15 = "FH15",
	FH16 = "FH16",
	FH17 = "FH17",
}

export enum CSClasses {
	CS1 = "CS1",
	CS2 = "CS2",
	CS3 = "CS3",
	CS4 = "CS4",
	CS5 = "CS5",
	CS6 = "CS6",
	CS7 = "CS7",
	CS8 = "CS8",
	CS9 = "CS9",
	CS10 = "CS10",
	CS11 = "CS11",
}
export enum CSAClasses {
	CSA1 = "CSA1",
	CSA2 = "CSA2",
	CSA3 = "CSA3",
}

export enum SpecialUnlockTypes {
	EnvelopeX = "envelopeX",
	EnvelopeE = "envelopeE",
}

export type SoloClasses = GHClasses | FCClasses | FHClasses | CSClasses;

export type ClassesInUse =
	| GHClasses
	| FCClasses
	| JOTLClasses
	| FHClasses
	| CSClasses
	| CSAClasses;

export enum GloomhavenItemSlot {
	Head = "head",
	Body = "body",
	Legs = "legs",
	OneHand = "1h",
	TwoHands = "2h",
	SmallItem = "small",
}

export enum ResourceTypes {
	Arrowvine = "arrowvine",
	Axenut = "axenut",
	Corpsecap = "corpsecap",
	Flamefruit = "flamefruit",
	Rockroot = "rockroot",
	Snowthistle = "snowthistle",
	Hide = "hide",
	Lumber = "lumber",
	Metal = "metal",
}

export interface Summon {
	hp: number;
	move: number;
	attack: number;
	range: number;
}

interface Resources {
	metal?: number;
	hide?: number;
	lumber?: number;
	item?: number[];
	arrowvine?: number;
	axenut?: number;
	corpsecap?: number;
	flamefruit?: number;
	rockroot?: number;
	snowthistle?: number;
}

export interface GloomhavenItem {
	id: number;
	displayId: string;
	gameType: AllGames;
	name: string;
	count: number;
	cost: number;
	slot: GloomhavenItemSlot;
	source: string;
	spent?: boolean;
	consumed?: boolean;
	lost?: boolean;
	minusOneCardsAdded?: number;
	useSlots?: number;
	desc: string;
	backDesc: string;
	descHTML: string;
	backDescHTML: string;
	faq?: string;
	faqImage?: string;
	summon?: Summon;
	soloItem?: SoloClasses;
	folder: string;
	unlockScenario: number;
	unlockProsperity: number;
	resources: Resources;
	imagePrefix?: string;
	imageSuffix?: string;
	specialUnlock?: SpecialUnlockTypes;
	alwaysShown?: boolean;
}
