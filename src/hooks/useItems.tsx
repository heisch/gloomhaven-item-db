import { GloomhavenItem, SortDirection, SortProperty } from "../State/Types";
import { useRecoilValue } from "recoil";
import {
	gameDataState,
	searchState,
	slotsState,
	sortPropertyState,
	sortDirectionState,
	availableOnlyState,
	selectedClassState,
	itemState,
	itemsOwnedByState,
	allState,
	specialUnlocksState,
	prosperityState,
	soloClassState,
	scenarioCompletedState,
	includeGameState,
	resourcesState,
} from "../State";
import { useCallback, useEffect, useState } from "react";
import { Expansions, GameType } from "../games";
import { AllGames } from "../games/GameType";

function compareItems<T>(a: T, b: T) {
	if (a === b) {
		return 0;
	} else {
		return a > b ? 1 : -1;
	}
}

const getItemUse = ({ consumed, spent, lost }: GloomhavenItem) => {
	if (spent) {
		return "a";
	}
	if (consumed) {
		return "b";
	}
	if (lost) {
		return "c";
	}
	return "d";
};

const sortOrder: Record<AllGames, number> = {
	[GameType.Frosthaven]: 1,
	[Expansions.FHSoloScenarios]: 2,
	[GameType.Gloomhaven]: 3,
	[Expansions.GHSoloScenarios]: 4,
	[Expansions.ForgottenCircles]: 5,
	[Expansions.CrimsonScales]: 6,
	[Expansions.CrimsonScalesAddon]: 7,
	[GameType.JawsOfTheLion]: 8,
};

const useItems = (): Array<GloomhavenItem> => {
	const { items } = useRecoilValue(gameDataState);
	const slots = useRecoilValue(slotsState);
	const resources = useRecoilValue(resourcesState);
	const sortProperty = useRecoilValue(sortPropertyState);
	const sortDirection = useRecoilValue(sortDirectionState);
	const searchString = useRecoilValue(searchState);
	const availableOnly = useRecoilValue(availableOnlyState);
	const selectedClass = useRecoilValue(selectedClassState);
	const item = useRecoilValue(itemState);
	const itemsOwnedBy = useRecoilValue(itemsOwnedByState);
	const all = useRecoilValue(allState);
	const specialUnlocks = useRecoilValue(specialUnlocksState);
	const prosperity = useRecoilValue(prosperityState);
	const soloClass = useRecoilValue(soloClassState);
	const scenarioCompleted = useRecoilValue(scenarioCompletedState);
	const includeGames = useRecoilValue(includeGameState);

	const [sortedItems, setSortedItems] = useState<GloomhavenItem[]>([]);
	const [filteredItems, setFilteredItems] = useState<GloomhavenItem[]>([]);

	const doSort = useCallback(
		(itemA: GloomhavenItem, itemB: GloomhavenItem) => {
			let value = 0;
			switch (sortProperty) {
				case SortProperty.Name:
					value = compareItems(itemA.name, itemB.name);
					break;
				case SortProperty.Slot:
					value = compareItems(itemA.slot, itemB.slot);
					break;
				case SortProperty.Cost:
					value = compareItems(itemA.cost, itemB.cost);
					break;
				case SortProperty.Id:
					value = compareItems(
						sortOrder[itemA.gameType],
						sortOrder[itemB.gameType]
					);
					if (value === 0) {
						value = compareItems(itemA.id, itemB.id);
					}
					break;
				case SortProperty.Use:
					value = compareItems(getItemUse(itemA), getItemUse(itemB));
					break;
			}
			return sortDirection === SortDirection.ascending
				? value
				: value * -1;
		},
		[sortDirection, sortProperty]
	);

	useEffect(() => {
		if (!items) {
			return;
		}
		const foo = Object.assign([], items);
		foo.sort(doSort);
		setSortedItems(foo);
	}, [items, doSort]);

	const isItemShown = useCallback(
		({
			id,
			soloItem,
			unlockProsperity,
			unlockScenario,
			gameType,
			slot,
			name,
			resources: itemResources,
			desc,
			count,
			specialUnlock,
		}: GloomhavenItem) => {
			if (!includeGames.includes(gameType)) {
				return false;
			}

			let show =
				all ||
				prosperity >= unlockProsperity ||
				scenarioCompleted.includes(unlockScenario) ||
				(soloItem && soloClass.includes(soloItem)) ||
				(specialUnlock && specialUnlocks.includes(specialUnlock)) ||
				item.includes(id);

			if (show) {
				if (slots.length > 0 && !slots.includes(slot)) {
					return false;
				}
				if (resources.length > 0) {
					if (itemResources) {
						const itemResourceTypes = Object.keys(itemResources);
						if (
							!resources.some(
								(r) => itemResourceTypes.indexOf(r) >= 0
							)
						) {
							return false;
						}
					} else {
						return false;
					}
				}
				if (searchString.length > 2) {
					if (
						!name.match(new RegExp(searchString, "i")) &&
						!desc.match(new RegExp(searchString, "i"))
					) {
						return false;
					}
				}
				if (selectedClass) {
					const owners = itemsOwnedBy[id];
					if (!owners || !owners.includes(selectedClass)) {
						return false;
					}
				}
				if (availableOnly) {
					const owners = itemsOwnedBy[id];
					if (owners) {
						if (count == owners.length) {
							return false;
						}
					}
				}
			}
			return show;
		},
		[
			all,
			availableOnly,
			includeGames,
			item,
			itemsOwnedBy,
			prosperity,
			resources,
			scenarioCompleted,
			searchString,
			selectedClass,
			slots,
			soloClass,
			specialUnlocks,
		]
	);

	useEffect(() => {
		setFilteredItems(sortedItems.filter(isItemShown));
	}, [sortedItems, isItemShown]);

	return filteredItems;
};

export default useItems;
