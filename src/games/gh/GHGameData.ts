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
}

export default GHGameData;
