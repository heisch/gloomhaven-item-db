import { GloomhavenItem } from "../State/Types";
import { useRecoilValue } from "recoil";
import {
	searchState,
	slotsState,
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
	craftsmanBuildingLevelState,
} from "../State";
import { useCallback } from "react";

export const useIsItemShown = (): ((item: GloomhavenItem) => boolean) => {
	const slots = useRecoilValue(slotsState);
	const resources = useRecoilValue(resourcesState);
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
	const craftsmanLevel = useRecoilValue(craftsmanBuildingLevelState);

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
			alwaysShown = false,
			unlockCrafstmanLevel,
		}: GloomhavenItem) => {
			if (!includeGames.includes(gameType)) {
				return false;
			}
			if (specialUnlock && !specialUnlocks.includes(specialUnlock)) {
				return false;
			}

			let show =
				all ||
				prosperity >= unlockProsperity ||
				scenarioCompleted.includes(unlockScenario) ||
				(soloItem && soloClass.includes(soloItem)) ||
				item.includes(id) ||
				craftsmanLevel >= unlockCrafstmanLevel ||
				alwaysShown;

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
			craftsmanLevel,
		]
	);

	return isItemShown;
};
