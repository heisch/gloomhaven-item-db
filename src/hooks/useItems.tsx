import { GloomhavenItemSlot, GloomhavenItem, SortDirection } from "../State/Types"
import { useGame } from "../components/Game/GameProvider"
import { getSpoilerFilter } from "../State/SpoilerFilter";
import { useSearchOptions } from "../components/Providers/SearchOptionsProvider";

const gloomhavenItemSlots: Array<GloomhavenItemSlot> = ['Head', 'Body', 'Legs', 'One Hand', 'Two Hands', 'Small Item'];

const useItems = (): Array<GloomhavenItem> => {

    const { isItemShown, initialItems} = useGame();
    const spoilerFilter = getSpoilerFilter();
    const { all, item: spoilerFilterItem, itemsOwnedBy } = spoilerFilter;
    const { searchOptions: { property, direction, slots, search, selectedClass, availableOnly }} = useSearchOptions();

    const getFilteredItems = () => {
        const spoilerFiltered = all ? initialItems : initialItems.filter(item => {
            if (isItemShown(item, spoilerFilter)) return true;
            return spoilerFilterItem.includes(item.id);
        });
        return spoilerFiltered.filter(item => {
            let hit = true;
            if (slots) { 
                hit = slots.includes(item.slot);
            }
            if (search.length > 2 && hit) { 
                hit = (!!item.name.match(new RegExp(search, 'i')) || !!item.desc.match(new RegExp(search, 'i')));
            }
            if (selectedClass && hit) {
                const owners = itemsOwnedBy[item.id];
                if (owners) {
                    hit = owners.includes(selectedClass);
                }
                else {
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
    }

    const getSortedAndFilteredItems = () => {
        const items = getFilteredItems();
        return (items.sort((itemA, itemB) => {
            let value = 0;
            switch (property) {
                case "name":
                    value = itemA["name"].localeCompare(itemB["name"]);
                    break;
                case "slot":
                    if (gloomhavenItemSlots.indexOf(itemA.slot) === gloomhavenItemSlots.indexOf(itemB.slot)) {
                        value = 0
                    } else {
                        value = gloomhavenItemSlots.indexOf(itemA.slot) > gloomhavenItemSlots.indexOf(itemB.slot) ? 1 : -1
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
                    const itemAuse = itemA.spent ? 'c' : (itemA.consumed ? 'b' : 'a');
                    const itemBuse = itemB.spent ? 'c' : (itemB.consumed ? 'b' : 'a');
                    value = itemAuse.localeCompare(itemBuse);
                    break;
            }
            return direction === SortDirection.ascending ? value : value * -1;
        }));
    }

    return getSortedAndFilteredItems();
}

export default useItems;
