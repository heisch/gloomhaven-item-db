import {
	gloomhavenItemSlots,
	GloomhavenItem,
	SortDirection,
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
	allState,
	discountState,
	prosperityState,
	itemState,
	displayItemAsState,
	itemsInUseState,
	itemManagementTypeState,
	envelopeXState,
	itemsOwnedByState,
	classesInUseState,
	soloClassState,
	scenarioCompletedState,
} from "../State";
import { Spoiler } from "../components/Providers/FilterOptions";

const useItems = (): Array<GloomhavenItem> => {
	const { isItemShown, items } = useRecoilValue(gameDataState);
	const slots = useRecoilValue(slotsState);
	const sortProperty = useRecoilValue(sortPropertyState);
	const sortDirection = useRecoilValue(sortDirectionState);
	const searchString = useRecoilValue(searchState);
	const availableOnly = useRecoilValue(availableOnlyState);
	const selectedClass = useRecoilValue(selectedClassState);
	const all = useRecoilValue(allState);
	const discount = useRecoilValue(discountState);
	const prosperity = useRecoilValue(prosperityState);
	const item = useRecoilValue(itemState);
	const displayAs = useRecoilValue(displayItemAsState);
	const itemsInUse = useRecoilValue(itemsInUseState);
	const itemManagementType = useRecoilValue(itemManagementTypeState);
	const envelopeX = useRecoilValue(envelopeXState);
	const itemsOwnedBy = useRecoilValue(itemsOwnedByState);
	const classesInUse = useRecoilValue(classesInUseState);
	const soloClass = useRecoilValue(soloClassState);
	const scenarioCompleted = useRecoilValue(scenarioCompletedState);

	const spoiler: Spoiler = {
		all,
		discount,
		prosperity,
		item,
		displayAs,
		itemsInUse,
		itemManagementType,
		envelopeX,
		itemsOwnedBy,
		classesInUse,
		soloClass,
		scenarioCompleted,
	};

	const getFilteredItems = () => {
		const spoilerFiltered = items.filter((i: GloomhavenItem) => {
			if (isItemShown(i, spoiler)) return true;
			return item.includes(i.id);
		});
		return spoilerFiltered.filter((item: GloomhavenItem) => {
			let hit = true;
			if (slots.length > 0) {
				hit = slots.includes(item.slot);
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
				case "name":
					value = itemA["name"].localeCompare(itemB["name"]);
					break;
				case "slot":
					if (
						gloomhavenItemSlots.indexOf(itemA.slot) ===
						gloomhavenItemSlots.indexOf(itemB.slot)
					) {
						value = 0;
					} else {
						value =
							gloomhavenItemSlots.indexOf(itemA.slot) >
							gloomhavenItemSlots.indexOf(itemB.slot)
								? 1
								: -1;
					}
					break;
				case "cost":
					if (itemA["cost"] === itemB["cost"]) return 0;
					value = itemA["cost"] > itemB["cost"] ? 1 : -1;
					break;
				case "id":
					if (itemA["id"] === itemB["id"]) return 0;
					value = itemA["id"] > itemB["id"] ? 1 : -1;
					break;
				case "use":
					// assign a dummy value to sort by
					const itemAuse = itemA.spent
						? "c"
						: itemA.consumed
						? "b"
						: "a";
					const itemBuse = itemB.spent
						? "c"
						: itemB.consumed
						? "b"
						: "a";
					value = itemAuse.localeCompare(itemBuse);
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
