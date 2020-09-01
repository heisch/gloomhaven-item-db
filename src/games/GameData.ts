import { GloomhavenItem } from "../State/Types"
import SpoilerFilter from "../State/SpoilerFilter";

export abstract class BaseGameData {
    name: string;
    key: string;
    constructor(name:string, key:string){
        this.name = name;
        this.key = key;
    }

    get dataFile() {
        return require(`./${this.key}/items.json`);
    }

    abstract isItemShown(item: GloomhavenItem, spoilerFilter:SpoilerFilter) : boolean;

    abstract get spoilerFilter () : JSX.Element | null;
    
    get localStorageKey() {
        return "ItemView:spoilerFilter_" + this.key;
    }

    convertSavedData(storageKey: string) {
        // base function does nothing
    }

    abstract getItemSubfolder(item:GloomhavenItem): string;

    getItemPath(item:GloomhavenItem) {
        let folder = this.getItemSubfolder(item);
        let name = item.name.toLowerCase().replace(/\s/g, '-').replace(/'/, '');
        return require(`../../vendor/${this.key}/images/items/${folder}/${name}.png`);
    }
}

export default BaseGameData;
