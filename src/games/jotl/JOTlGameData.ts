import { BaseGameData } from '../GameData';
import { GloomhavenItem } from '../../State/Types';
import JOTLSpoilerFilter from '../../components/Tabs/SpoilerFilters/JOTLSpoilerFilter';
import { SpoilerFilter } from '../../State/SpoilerFilter';
import { GameType } from '..';

export class JOTLGameData extends BaseGameData {
    constructor()
    {
        super("Gloomhaven: Jaws of the Lion", GameType.JawsOfTheLion);
    }
    isItemShown(item:GloomhavenItem, {scenarioCompleted}:SpoilerFilter) {
        if (item.id <=13 && scenarioCompleted.includes(2)) {
            return true;
        }
        if (item.id >=15 && item.id <= 20 && scenarioCompleted.includes(9)) {
            return true;
        }
        if (item.id >=21 && item.id <= 26 && scenarioCompleted.includes(15)) {
            return true;
        }
        return false;
    }
    get spoilerFilter() {
        return JOTLSpoilerFilter({gameType:this.key});
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
