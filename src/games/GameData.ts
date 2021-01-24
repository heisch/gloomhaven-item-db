import { GloomhavenItem, GloomhavenItemSlot } from "../State/Types"
import {SpoilerFilter} from "../State/SpoilerFilter";
import { Helpers } from "../helpers";
import { GameType } from ".";

const deSpoilerItemSource = (source:string): string => {
    return source.replace(/{(.{2})}/, (m, m1) => '<img class="icon" src="'+require('../img/classes/'+m1+'.png')+'" alt="" />');
}

export const LOCAL_STORAGE_PREFIX:string = "ItemView:spoilerFilter_";

export abstract class BaseGameData {
    name: string;
    gameType: GameType;
    initItems: Array<GloomhavenItem> | undefined;
    constructor(name:string, gameType:GameType){
        this.name = name;
        this.gameType = gameType;
        this.initItems = undefined;
    }

    get initialItems() : Array<GloomhavenItem> {
        if (this.initItems) {
            return this.initItems;
        }
        const items: Array<GloomhavenItem> = require(`./${this.gameType}/items.json`);

        items.forEach(item => {

            item.descHTML = Helpers.parseEffectText(item.desc);

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
        });
        this.initItems = items;
        return this.initItems;
    }

    abstract isItemShown(item: GloomhavenItem, spoilerFilter:SpoilerFilter) : boolean;

    abstract get spoilerFilter () : JSX.Element | null;

    get localStorageKey() {
        return LOCAL_STORAGE_PREFIX + this.gameType;
    }

    convertSavedData(storageKey: string) {
        // base function does nothing
    }

    abstract getItemSubfolder(item:GloomhavenItem): string;

    getItemPath(item:GloomhavenItem) {
        let folder = this.getItemSubfolder(item);
        let name = item.name.toLowerCase().replace(/\s/g, '-').replace(/'/, '');
        return require(`../../vendor/${this.gameType}/images/items/${folder}/${name}.png`);
    }

    getItemFilterSlots() : GloomhavenItemSlot[] {
        return ['Head', 'Body', 'Legs', 'One Hand', 'Two Hands', 'Small Item'];
    }
    
}

export default BaseGameData;
