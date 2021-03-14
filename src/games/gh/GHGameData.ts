import { BaseGameData } from '../GameData'
import { GloomhavenItem } from '../../State/Types';
import { GameType } from '..';
import { FilterOptions } from '../../components/Providers/FilterOptions';

class GHGameData extends BaseGameData  {
    constructor()
    {
        super("Gloomhaven", GameType.Gloomhaven);
    }
    isItemShown(item:GloomhavenItem, {all, envelopeX, prosperity, soloClass}: FilterOptions) {
        // Special case for item 151
        if (item.id === 151 && !envelopeX) {
            return false;
        }
    
        if (all) {
            return true;
        }
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
