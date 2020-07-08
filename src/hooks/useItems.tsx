import { GloomhavenItemSlot, GloomhavenItem, SortDirection, GloomhavenItemSourceType } from "../State/Types"
import { useEffect, useState } from "react";
import { Helpers } from "../helpers";
import { useSelector } from "react-redux";
import { RootState } from "../State/Reducer";

const gloomhavenItemSlots: Array<GloomhavenItemSlot> = ['Head', 'Body', 'Legs', 'One Hand', 'Two Hands', 'Small Item'];

const useItems = (): Array<GloomhavenItem> => {

    const { all, prosperity, soloClass, item: spoilerFilterItem } = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];
    const { sorting, filter } = useSelector<RootState>( state => state.itemViewState) as RootState['itemViewState'];
    const { slot, search} = filter;
    const { property, direction } = sorting;

    const [initialItems, setInitialItems] = useState<Array<GloomhavenItem>>([]);

    const deSpoilerItemSource = (source:string): string => {
        return source.replace(/{(.{2})}/, (m, m1) => '<img class="icon" src="'+require('../img/classes/'+m1+'.png')+'" alt="" />');
    }

    const getFilteredItems = () => {
        if (all) return initialItems;
        const spoilerFiltered = initialItems.filter(item => {
            if (item.id <= (prosperity+1)*7) return true;
            if (item.id === 134 && soloClass.includes('BR')) return true;
            if (item.id === 135 && soloClass.includes('TI')) return true;
            if (item.id === 136 && soloClass.includes('SW')) return true;
            if (item.id === 137 && soloClass.includes('SC')) return true;
            if (item.id === 138 && soloClass.includes('CH')) return true;
            if (item.id === 139 && soloClass.includes('MT')) return true;
            if (item.id === 140 && soloClass.includes('SK')) return true;
            if (item.id === 141 && soloClass.includes('QM')) return true;
            if (item.id === 142 && soloClass.includes('SU')) return true;
            if (item.id === 143 && soloClass.includes('NS')) return true;
            if (item.id === 144 && soloClass.includes('PH')) return true;
            if (item.id === 145 && soloClass.includes('BE')) return true;
            if (item.id === 146 && soloClass.includes('SS')) return true;
            if (item.id === 147 && soloClass.includes('DS')) return true;
            if (item.id === 148 && soloClass.includes('SB')) return true;
            if (item.id === 149 && soloClass.includes('EL')) return true;
            if (item.id === 150 && soloClass.includes('BT')) return true;
            return spoilerFilterItem.includes(item.id);
        });
        return spoilerFiltered.filter(item => {
            let hit = true;
            if (slot) { 
                hit = item.slot === slot;
            }
            if (search.length > 2 && hit) { 
                hit = (!!item.name.match(new RegExp(search, 'i')) || !!item.desc.match(new RegExp(search, 'i')));
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
                    value = itemA[property].localeCompare(itemB[property]);
                    break;
                case "slot":
                    if (gloomhavenItemSlots.indexOf(itemA.slot) === gloomhavenItemSlots.indexOf(itemB.slot)) {
                        value = 0
                    } else {
                        value = gloomhavenItemSlots.indexOf(itemA.slot) > gloomhavenItemSlots.indexOf(itemB.slot) ? 1 : -1
                    }
                    break;
                case "cost":
                case "id":
                    if (itemA[property] === itemB[property]) return 0;
                    value = itemA[property] > itemB[property] ? 1 : -1;
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


    useEffect( () => {
        const items: Array<GloomhavenItem> = require('../data/items.json');

        let slots: Array<string> = [];
        let sources: Array<string> = [];
        let sourceTypes: Array<GloomhavenItemSourceType> = [];

        items.forEach(item => {

            item.descHTML = Helpers.parseEffectText(item.desc);

            let sourceType: string = item.source;

            item.sourceTypes = [];

            item.source.split("\n").forEach(itemSource => {
                if (itemSource.match(/^Prosperity Level \d/)) {
                    item.sourceTypes.push("Prosperity");
                } else if (itemSource.match(/^Reward from Solo Scenario /)) {
                    item.sourceTypes.push("Solo Scenario");
                } else if (itemSource.match(/^(Reward From )?Scenario #\d+/)) {
                    item.sourceTypes.push("Scenario");
                } else if (itemSource === "Random Item Design") {
                    item.sourceTypes.push("Random Item Design");
                } else if (itemSource.match(/^City Event \d+/)) {
                    item.sourceTypes.push("City Event");
                } else if (itemSource.match(/^Road Event \d+/)) {
                    item.sourceTypes.push("Road Event");
                }
            });

            item.source = item.source.replace(/Reward from /ig, '');
            item.source = item.source.replace(/ ?\((Treasure #\d+)\)/ig, "\n$1");
            item.source = item.source.replace(/Solo Scenario #\d+ — /i, 'Solo ');
            item.source = deSpoilerItemSource(item.source);

            slots.push(item.slot);
            sources.push(item.source);

            sourceTypes = [...sourceTypes, ...item.sourceTypes];

            if (!sources.includes(sourceType)) sources.push(sourceType);
        });

        slots = Helpers.uniqueArray(slots);
        sourceTypes = Helpers.uniqueArray(sourceTypes);
        sources = Helpers.uniqueArray(sources);

        setInitialItems(items);
    },[]);

    return getSortedAndFilteredItems();
}

export default useItems;