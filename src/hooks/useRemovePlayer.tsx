import React, { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";
import {
	classesInUseState,
	itemsOwnedByState,
	selectedClassState,
} from "../State";
import { ClassesInUse } from "../State/Types";

export const useRemovePlayerUtils = () => {
	const [classesInUse, setClassesInUseBy] = useRecoilState(classesInUseState);
	const [selectedClass, setSelectedClass] =
		useRecoilState(selectedClassState);
	const [itemsOwnedBy, setItemsOwnedBy] = useRecoilState(itemsOwnedByState);

	const itemsOwnedByClass = useCallback((owner: ClassesInUse | undefined) => {
		if (!owner) {
			return [];
		}
		const itemIds: number[] = [];
		Object.entries(itemsOwnedBy).forEach(([itemId, owners]) => {
			if (owners && owners.includes(owner)) {
				itemIds.push(parseInt(itemId));
			}
		});
		return itemIds;
	}, []);

	const removeItemsFromOwner = useCallback(
		(itemsId: number[] | number, owner: ClassesInUse) => {
			const newItemsOwnedBy = Object.assign({}, itemsOwnedBy);
			const items = !Array.isArray(itemsId) ? [itemsId] : itemsId;
			items.forEach((itemId) => {
				const owners = newItemsOwnedBy[itemId];
				const copyOwners = Object.assign([], owners);
				if (copyOwners.includes(owner)) {
					copyOwners.splice(copyOwners.indexOf(owner), 1);
				}
				if (copyOwners.length) {
					newItemsOwnedBy[itemId] = copyOwners;
				} else {
					delete newItemsOwnedBy[itemId];
				}
			});
			setItemsOwnedBy(newItemsOwnedBy);
		},
		[]
	);

	const removeClasses = useCallback(
		(classes: ClassesInUse | ClassesInUse[]) => {
			const classesToRemove = !Array.isArray(classes)
				? [classes]
				: classes;
			const newClassesInUse = Object.assign([], classesInUse);
			let clearClassSelection = false;
			classesToRemove.forEach((classToRemove) => {
				removeItemsFromOwner(
					itemsOwnedByClass(classToRemove),
					classToRemove
				);
				const index = newClassesInUse.indexOf(classToRemove);
				if (index != -1) {
					newClassesInUse.splice(index, 1);
				}

				let newSelectedClass = selectedClass;
				if (newSelectedClass === classToRemove) {
					clearClassSelection = true;
				}
			});
			if (clearClassSelection) {
				setSelectedClass(undefined);
			}
			setClassesInUseBy(newClassesInUse);
		},
		[]
	);

	const functions = useMemo(
		() => ({
			removeClasses,
			removeItemsFromOwner,
			itemsOwnedByClass,
		}),
		[removeClasses, removeItemsFromOwner, itemsOwnedByClass]
	);
	return functions;
};
