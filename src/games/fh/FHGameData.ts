import { Helpers } from "../../helpers";
import { GloomhavenItem } from "../../State/Types";
import { GameData, getInitialItems } from "../GameData";
import { Expansions, GameType } from "../GameType";

export const ghGroups = [
	{
		title: "Gloomhaven Items - Initial",
		scenarioId: 1,
		items: [10, 25, 72, 105, 109, 116],
		game: GameType.Gloomhaven,
	},
	{
		title: "Gloomhaven Items - Set 1",
		scenarioId: 1000,
		items: [106, 37, 53, 115, 21, 93, 94],
		game: GameType.Gloomhaven,
	},
	{
		title: "Gloomhaven Items - Set 2",
		scenarioId: 2000,
		items: [
			110, 111, 102, 121, 122, 46, 126, 123, 83, 84, 85, 86, 87, 88, 128,
		],
		game: GameType.Gloomhaven,
	},
	{
		title: "Gloomhaven Items - Set 3",
		scenarioId: 3000,
		items: [
			17, 74, 51, 35, 62, 129, 127, 131, 119, 117, 47, 118, 77, 78, 79,
			80, 81, 82,
		],
		game: GameType.Gloomhaven,
	},
	{
		title: "Forgotten Circles Items",
		scenarioId: 4000,
		items: [153, 154, 155, 157, 159, 161, 163],
		game: Expansions.ForgottenCircles,
	},
];

const sortById = (a: number, b: number) => a - b;

ghGroups.forEach((group) => group.items.sort(sortById));

export const ghItemToImport = ghGroups.flatMap((groups) => [...groups.items]);

ghItemToImport.sort(sortById);

let { items, filterSlots, resources } = getInitialItems(GameType.Frosthaven);
export const ghItemOffset = 1000;

const { items: ghItems, filterSlots: ghFilterSlots } = getInitialItems(
	GameType.Gloomhaven
);

const getUnlockScenario = (id: number) => {
	const group = ghGroups.find((group) => group.items.includes(id));
	if (group) {
		return group.scenarioId;
	}
	return -1;
};

const filteredGhItems = ghItems
	.filter((item) => ghItemToImport.includes(item.id))
	.map((item: GloomhavenItem, index: number) => ({
		...item,
		displayId: item.id.toString(),
		unlockScenario: getUnlockScenario(item.id),
		id: ghItemOffset + index + 1,
		unlockProsperity: Number.MAX_VALUE,
	}));

items = items.concat(filteredGhItems);

filterSlots = Helpers.uniqueArray(filterSlots.concat(ghFilterSlots));

export const FHGameData: GameData = {
	gameType: GameType.Frosthaven,
	gameName: "Frosthaven",
	items,
	filterSlots,
	resources,
};
