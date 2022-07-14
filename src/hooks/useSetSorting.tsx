import { useRecoilState } from "recoil";
import { sortDirectionState, sortPropertyState } from "../State";
import { SortDirection, SortProperty } from "../State/Types";

export const useSetSorting = () => {
	const [sortProperty, setSortProperty] = useRecoilState(sortPropertyState);
	const [sortDirection, setSortDirection] =
		useRecoilState(sortDirectionState);

	const setSorting = (newProperty: SortProperty) => {
		let newDirection: SortDirection;
		if (sortProperty === newProperty) {
			newDirection =
				sortDirection === SortDirection.ascending
					? SortDirection.descending
					: SortDirection.ascending;
		} else {
			newDirection = SortDirection.ascending;
		}

		setSortProperty(newProperty);
		setSortDirection(newDirection);
	};
	return setSorting;
};
