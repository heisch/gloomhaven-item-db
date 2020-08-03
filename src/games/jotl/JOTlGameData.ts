import { BaseGameData } from '../GameData';
import { GloomhavenItem } from '../../State/Types';
import JOTLSpoilerFilter from '../../components/Tabs/SpoilerFilters/JOTLSpoilerFilter';
import SpoilerFilter, { spoilerFilter } from '../../State/SpoilerFilter';

export class JOTLGameData extends BaseGameData {
    constructor()
    {
        super("Gloomhaven: Jaws of the Lion", "jotl");
    }
    isItemShown(item:GloomhavenItem, {}:SpoilerFilter) {
        return (item.id <= 13);
    }
    get spoilerFilter() {
        return JOTLSpoilerFilter();
    }
    getItemSubfolder (item: GloomhavenItem) {
        if (item.id >= 27) {
            return '27-36';
        } else if (item.id >= 21) {
            return '21-26';
        } else if (item.id >= 15) {
            return '15-20';
        } else if (item.id == 14) {
            return '14';
        } else  {
            return '1-13';
        }
    }
}
export default JOTLGameData;
