import React, { useContext, createContext, ReactNode, useState } from 'react'
import { GameType } from '../../games'
import { PullDownOptions, GloomhavenItem, GloomhavenItemSlot, SortDirection, SortProperty } from '../../State/Types';
import { useGame } from '../Game/GameProvider';

export interface FilterOptions {
    all: boolean;
    // prosperity: number;
    // item: Array<number>;
    // itemsInUse: ItemsInUse;
    // soloClass: Array<SoloClassShorthand>;
    // discount: number;
    // displayAs: ItemViewDisplayType;
    // itemManagementType: ItemManagementType;
    // lockSpoilerPanel: boolean;
    // scenarioCompleted: Array<number>;
    // classesInUse: ClassesInUse[];
    // itemsOwnedBy: ItemsOwnedBy;
}
const initialFilterOptions : FilterOptions = {
    all: false,
};

const initialGameFilterOptions = {
    [GameType.Gloomhaven] : initialFilterOptions,
    [GameType.JawsOfTheLion] : initialFilterOptions,
};

export const Context = createContext({filterOptions: initialFilterOptions, updateFilterOptions: (options: any) => {}});

export function useFilterOptions() {
    return useContext(Context);
}

type Props = {
    children: ReactNode;
}

const FilterProvider = (props:Props) => {
    const { children} = props;
    const {gameType} = useGame();
    const [ gameFilterOptions, setGameFilterOptions] = useState(initialGameFilterOptions);
    const { Provider } = Context;

    const updateFilterOptions = ( options : any ) => {
        gameFilterOptions[gameType] = {...gameFilterOptions[gameType], ...options};
        setGameFilterOptions(Object.assign({}, gameFilterOptions))
    }
    
    return <Provider value={{filterOptions:gameFilterOptions[gameType], updateFilterOptions}}>{children}</Provider>
}
 
export default FilterProvider;
