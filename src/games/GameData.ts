import { GloomhavenItem, GloomhavenItemSlot, gloomhavenItemSlots } from "../State/Types"
import { Helpers } from "../helpers";
import { GameType } from ".";
import { FilterOptions } from "../components/Providers/FilterOptions";

const deSpoilerItemSource = (source:string): string => {
    return source.replace(/{(.{2})}/, (m, m1) => '<img class="icon" src="'+require('../img/classes/'+m1+'.png')+'" alt="" />');
}

export const LOCAL_STORAGE_PREFIX:string = "ItemView:spoilerFilter_";

export abstract class BaseGameData {
    name: string;
    gameType: GameType;
    initItems: Array<GloomhavenItem> | undefined;
    filterSlots: GloomhavenItemSlot[];
    constructor(name:string, gameType:GameType){
        this.name = name;
        this.gameType = gameType;
        this.initItems = undefined;
        this.filterSlots = [];
    }

    get initialItems() : Array<GloomhavenItem> {
        if (this.initItems) {
            return this.initItems;
        }
        const items: Array<GloomhavenItem> = require(`./${this.gameType}/items.json`);

        items.forEach(item => {

            item.descHTML = Helpers.parseEffectText(item.desc);
            const source = item.source.replace(/Reward from /ig, '')
                            .replace(/ ?\((Treasure #\d+)\)/ig, "\n$1")
                            .replace(/Solo Scenario #\d+ — /i, 'Solo ');
            item.source = deSpoilerItemSource(source);
            if (!this.filterSlots.includes(item.slot)) {
                this.filterSlots.push(item.slot);
            }
        });
        this.initItems = items;
        return this.initItems;
    }

    abstract isItemShown(item: GloomhavenItem, FilterOptions: FilterOptions) : boolean;

    get ItemFilterSlots() : GloomhavenItemSlot[] {
        return gloomhavenItemSlots.filter( slot => this.filterSlots.includes(slot));
    }
    
}

export default BaseGameData;
