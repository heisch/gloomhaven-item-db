import {
	GloomhavenItem,
	ResourceTypes,
	SortDirection,
	SortProperty,
} from "../State/Types";
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
	envelopeXState,
	prosperityState,
	soloClassState,
	scenarioCompletedState,
	includeGameState,
	resourcesState,
} from "../State";
import { GameType } from "../games";

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
	const envelopeX = useRecoilValue(envelopeXState);
	const prosperity = useRecoilValue(prosperityState);
	const soloClass = useRecoilValue(soloClassState);
	const scenarioCompleted = useRecoilValue(scenarioCompletedState);
	const includeGames = useRecoilValue(includeGameState);

	const isItemShown = ({
		id,
		soloItem,
		unlockProsperity,
		unlockScenario,
		gameType,
	}: GloomhavenItem) => {
		if (
			gameType &&
			gameType === GameType.Gloomhaven &&
			!includeGames.includes(GameType.Gloomhaven)
		) {
			return false;
		}

		// Special case for item XX Solo item.
		if (soloItem && soloItem == "XX" && !envelopeX) {
			return false;
		}

		if (all) {
			return true;
		}
		if (prosperity >= unlockProsperity) {
			return true;
		}
		if (scenarioCompleted.includes(unlockScenario)) {
			return true;
		}

		if (soloItem && soloClass.includes(soloItem)) {
			return true;
		}
		return item.includes(id);
	};
	const getFilteredItems = () => {
		const spoilerFiltered = items.filter(isItemShown);
		return spoilerFiltered.filter((item: GloomhavenItem) => {
			let hit = true;
			if (slots.length > 0) {
				hit = slots.includes(item.slot);
			}
			if (resources.length > 0 && item.resources && hit) {
				const itemResourceTypes = Object.keys(item.resources);
				hit = resources.some((r) => itemResourceTypes.indexOf(r) >= 0);
			}
			if (searchString.length > 2 && hit) {
				hit =
					!!item.name.match(new RegExp(searchString, "i")) ||
					!!item.desc.match(new RegExp(searchString, "i"));
			}
			if (selectedClass && hit) {
				const owners = itemsOwnedBy[item.id];
				if (owners) {
					hit = owners.includes(selectedClass);
				} else {
					hit = false;
				}
			}
			if (availableOnly && hit) {
				const owners = itemsOwnedBy[item.id];
				if (owners) {
					hit = item.count != owners.length;
				}
			}
			return hit;
		});
	};

	const getSortedAndFilteredItems = () => {
		const items = getFilteredItems();
		return items.sort((itemA: GloomhavenItem, itemB: GloomhavenItem) => {
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
					value = compareItems(itemA.id, itemB.id);
					break;
				case SortProperty.Use:
					value = compareItems(getItemUse(itemA), getItemUse(itemB));
					break;
			}
			return sortDirection === SortDirection.ascending
				? value
				: value * -1;
		});
	};

	return getSortedAndFilteredItems();
};

export default useItems;
