import { GloomhavenItem, SortDirection, SortProperty } from "../State/Types";
import { useRecoilValue } from "recoil";
import { gameDataState, sortPropertyState, sortDirectionState } from "../State";
import { useCallback, useEffect, useState } from "react";
import { Expansions, GameType } from "../games";
import { AllGames } from "../games/GameType";
import { useIsItemShown } from "./useIsItemShown";

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
	[Expansions.TrailOfAshes]: 8,
	[GameType.JawsOfTheLion]: 9,
};

const useItems = (): Array<GloomhavenItem> => {
	const { items } = useRecoilValue(gameDataState);
	const isItemShown = useIsItemShown();
	const sortProperty = useRecoilValue(sortPropertyState);
	const sortDirection = useRecoilValue(sortDirectionState);

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
					if (itemA.cost && itemB.cost) {
						value = compareItems(itemA.cost, itemB.cost);
					} else if (itemA.cost) {
						return -1;
					} else {
						return 1;
					}
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
		const itemsCopy = Object.assign([], items);
		itemsCopy.sort(doSort);
		setSortedItems(itemsCopy);
	}, [items, doSort]);

	useEffect(() => {
		setFilteredItems(sortedItems.filter(isItemShown));
	}, [sortedItems, isItemShown]);

	return filteredItems;
};

export default useItems;
