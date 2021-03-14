import { BaseGameData } from '../GameData';
import { GloomhavenItem, GloomhavenItemSlot } from '../../State/Types';
import { GameType } from '..';
import { FilterOptions } from '../../components/Providers/FilterOptions';

export class JOTLGameData extends BaseGameData {
    constructor()
    {
        super("Gloomhaven: Jaws of the Lion", GameType.JawsOfTheLion);
    }
    isItemShown(item:GloomhavenItem, {scenarioCompleted}:FilterOptions) {
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

    getItemFilterSlots(): GloomhavenItemSlot[] {
        return ['Head', 'Body', 'Legs', 'One Hand', 'Small Item'];
    }
}
export default JOTLGameData;
