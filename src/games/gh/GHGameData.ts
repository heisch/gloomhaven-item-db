import { BaseGameData } from '../GameData'
import { GloomhavenItem } from '../../State/Types';
import { GameType } from '..';
import { FilterOptions } from '../../components/Providers/FilterOptions';

class GHGameData extends BaseGameData  {
    constructor()
    {
        super("Gloomhaven", GameType.Gloomhaven);
    }
    isItemShown(item:GloomhavenItem, {prosperity, soloClass}: FilterOptions) {
        if (item.id <= (prosperity+1)*7)
        {
            return true;
        }
        if (item.soloItem && soloClass.includes(item.soloItem)) {
            return true
        };
        return false;
    }

    getItemSubfolder(item:GloomhavenItem) {
        if (item.id >= 152 && item.id <= 165) {
            return '152-165';
        } else if (item.id >= 64 && item.id <= 151) {
            return '64-151';
        } else if (item.id <= 14) {
            return '1-14';
        } else {
            let range_from = item.id % 7 === 0
                ? Math.floor((item.id - 1) / 7) * 7
                : Math.floor((item.id) / 7) * 7;
            return (range_from + 1) + '-' + (range_from + 7);
        }
    }
}

export default GHGameData;
