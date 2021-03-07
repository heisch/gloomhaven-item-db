import React, { useContext, createContext, ReactNode, useState } from 'react'
import { GameType } from '../../games'
import { useGame } from '../Game/GameProvider';
import {initialFilterOptions} from "./FilterOptions"

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
