import { Helpers } from "../../helpers";
import { GloomhavenItem, ImportedSet } from "../../State/Types";
import { GameData, getInitialItems } from "../GameData";
import { AllGames, Expansions, GameType } from "../GameType";

export interface BaseImportedSetData {
	title: string;
	items: number[];
	game: AllGames;
}

export interface ImportedSetData extends BaseImportedSetData {
	importSet: ImportedSet;
}

export const alwaysImported: BaseImportedSetData = {
	title: "Initial",
	items: [10, 25, 72, 105, 109, 116],
	game: GameType.Gloomhaven,
};

export const ghImportSets: ImportedSetData[] = [
	{
		title: "Set 1",
		importSet: ImportedSet.GloomhavenA,
		items: [106, 37, 53, 115, 21, 93, 94],
		game: GameType.Gloomhaven,
	},
	{
		title: "Set 2",
		importSet: ImportedSet.GloomhavenB,
		items: [
			110, 111, 102, 121, 122, 46, 126, 123, 83, 84, 85, 86, 87, 88, 128,
		],
		game: GameType.Gloomhaven,
	},
	{
		title: "Set 3",
		importSet: ImportedSet.GloomhavenC,
		items: [
			17, 74, 51, 35, 62, 129, 127, 131, 119, 117, 47, 118, 77, 78, 79,
			80, 81, 82,
		],
		game: GameType.Gloomhaven,
	},
	{
		title: "Set 1",
		importSet: ImportedSet.ForgottenCirclesA,
		items: [153, 154, 155, 157, 159, 161, 163],
		game: Expansions.ForgottenCircles,
	},
];

const sortById = (a: number, b: number) => a - b;

const allImportSets = [alwaysImported, ...ghImportSets];

allImportSets.forEach((group) => group.items.sort(sortById));

export const ghItemToImport = allImportSets.flatMap((groups) => [
	...groups.items,
]);

ghItemToImport.sort(sortById);

let { items, filterSlots, resources } = getInitialItems(GameType.Frosthaven);
export const ghItemOffset = 1000;

const { items: ghItems, filterSlots: ghFilterSlots } = getInitialItems(
	GameType.Gloomhaven
);

const getImportedSet = (id: number) => {
	const set = ghImportSets.find((set) => set.items.includes(id));
	if (set) {
		return set.importSet;
	}
	return undefined;
};

const filteredGhItems = ghItems
	.filter((item) => ghItemToImport.includes(item.id))
	.map((item: GloomhavenItem) => ({
		...item,
		displayId: item.id.toString(),
		id: ghItemOffset + item.id,
		unlockProsperity: Number.MAX_VALUE,
		importedSet: getImportedSet(item.id),
	}));

items = items.concat(filteredGhItems);

filterSlots = Helpers.uniqueArray(filterSlots.concat(ghFilterSlots));

export const FHGameData: GameData = {
	gameType: GameType.Frosthaven,
	items,
	filterSlots,
	resources,
};
