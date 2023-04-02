import { useCallback, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameInfo } from "../games/GameInfo";
import { AllGames, Expansions, GameType } from "../games/GameType";
import {
  classesInUseState,
  specialUnlocksState,
  itemsOwnedByState,
  selectedClassState,
  gameDataState,
} from "../State";
import {
  ClassesInUse,
  GHClasses,
  SpecialUnlockTypes,
  TOAClasses,
} from "../State/Types";

export const useRemovePlayerUtils = () => {
  const { items } = useRecoilValue(gameDataState);
  const [classesInUse, setClassesInUseBy] = useRecoilState(classesInUseState);
  const [selectedClass, setSelectedClass] = useRecoilState(selectedClassState);
  const [itemsOwnedBy, setItemsOwnedBy] = useRecoilState(itemsOwnedByState);
  const specialUnlocks = useRecoilValue(specialUnlocksState);
  const envelopeX = specialUnlocks.includes(SpecialUnlockTypes.EnvelopeX);
  const envelopeV = specialUnlocks.includes(SpecialUnlockTypes.EnvelopeV);

  const itemsOwnedByClass = useCallback(
    (owner: ClassesInUse | undefined) => {
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
    },
    [itemsOwnedBy]
  );

  const removeItemsFromOwner = useCallback(
    (
      itemsId: number[] | number,
      owner: ClassesInUse,
      removingGame?: AllGames
    ) => {
      const newItemsOwnedBy = Object.assign({}, itemsOwnedBy);
      const itemsToRemove = !Array.isArray(itemsId) ? [itemsId] : itemsId;
      itemsToRemove.forEach((itemId) => {
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
      if (removingGame) {
        const gameItems = items.filter(
          (item) => item.gameType === removingGame
        );
        gameItems.forEach(({ id }) => {
          delete newItemsOwnedBy[id];
        });
      }
      setItemsOwnedBy(newItemsOwnedBy);
    },
    [itemsOwnedBy, setItemsOwnedBy, items]
  );

  const removeClasses = useCallback(
    (classes: ClassesInUse | ClassesInUse[], removingGame?: AllGames) => {
      const classesToRemove = !Array.isArray(classes) ? [classes] : classes;
      const newClassesInUse = Object.assign([], classesInUse);
      let clearClassSelection = false;
      classesToRemove.forEach((classToRemove) => {
        removeItemsFromOwner(
          itemsOwnedByClass(classToRemove),
          classToRemove,
          removingGame
        );
        const index = newClassesInUse.indexOf(classToRemove);
        if (index !== -1) {
          newClassesInUse.splice(index, 1);
        }

        const newSelectedClass = selectedClass;
        if (newSelectedClass === classToRemove) {
          clearClassSelection = true;
        }
      });
      if (clearClassSelection) {
        setSelectedClass(undefined);
      }
      setClassesInUseBy(newClassesInUse);
    },
    [
      classesInUse,
      itemsOwnedByClass,
      removeItemsFromOwner,
      selectedClass,
      setClassesInUseBy,
      setSelectedClass,
    ]
  );

  const getClassesForGame = useCallback(
    (gameType: AllGames) => {
      let classes = gameInfo[gameType].gameClasses();
      switch (gameType) {
        case GameType.Gloomhaven:
          if (!envelopeX) {
            classes = classes.filter((c) => c !== GHClasses.XX);
          }
          break;
        case Expansions.TrailOfAshes:
          if (!envelopeV) {
            classes = classes.filter((c) => c !== TOAClasses.TOA6);
          }
          break;
      }
      return classes;
    },
    [envelopeX, envelopeV]
  );

  const getClassesToRemove = useCallback(
    (removingGame: AllGames) => {
      const classes: ClassesInUse[] = getClassesForGame(removingGame);
      return classes.filter((c) => classesInUse.includes(c));
    },
    [classesInUse, getClassesForGame]
  );

  const getRemovingItemCount = useCallback(
    (removingGame: AllGames) => {
      const classesToRemove = getClassesToRemove(removingGame);
      let itemCount = 0;
      classesToRemove.forEach((classToRemove) => {
        const items = itemsOwnedByClass(classToRemove);
        itemCount += items.length;
      });
      return itemCount;
    },
    [getClassesToRemove, itemsOwnedByClass]
  );

  const anyGameItemsOwned = useCallback(
    (gameType: AllGames) => {
      const gameItemIds = items
        .filter((item) => item.gameType === gameType)
        .map((item) => item.id.toString());
      return gameItemIds.filter((id) => itemsOwnedBy[id]).length;
    },
    [itemsOwnedBy, items]
  );

  const functions = useMemo(
    () => ({
      removeClasses,
      removeItemsFromOwner,
      itemsOwnedByClass,
      getClassesForGame,
      getClassesToRemove,
      getRemovingItemCount,
      anyGameItemsOwned,
    }),
    [
      removeClasses,
      removeItemsFromOwner,
      itemsOwnedByClass,
      getClassesForGame,
      getClassesToRemove,
      getRemovingItemCount,
      anyGameItemsOwned,
    ]
  );
  return functions;
};
