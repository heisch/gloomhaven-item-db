import React, { useContext, createContext, ReactNode, useState } from 'react'
import {BaseGameData, GameType, gameDataTypes} from '../../games'
import { GloomhavenItem, GloomhavenItemSlot, SortDirection, SortProperty } from '../../State/Types';
import { useGame } from '../Game/GameProvider';

export interface SearchOptions {
    slots?: Array<GloomhavenItemSlot>;
    search: string;
    direction: SortDirection;
    property: SortProperty;
    selectedItem: GloomhavenItem | undefined;
}

const initialSearchOptions : SearchOptions = {
    slots: undefined,
    search: '',
    direction: SortDirection.ascending,
    property: 'id',
    selectedItem: undefined,
};

const initialGameSearchOptions = {
    [GameType.Gloomhaven] : initialSearchOptions,
    [GameType.JawsOfTheLion] : initialSearchOptions,
};

export const Context = createContext({searchOptions: initialSearchOptions, setSearchOptions: (options: any) => {}});

export function useSearchOptions() {
    return useContext(Context);
}

type Props = {
    children: ReactNode;
}



const SearchOptionsProvider = (props:Props) => {
    const { children} = props;
    const {gameType} = useGame();
    const [ gameSearchOptions, setGameSearchOptions] = useState(initialGameSearchOptions);
    const { Provider } = Context;

    const setSearchOptions = ( options : any ) => {
        gameSearchOptions[gameType] = {...gameSearchOptions[gameType], ...options};
        setGameSearchOptions(Object.assign({}, gameSearchOptions))
    }
    
    console.log("rendering");

    return <Provider value={{searchOptions:gameSearchOptions[gameType], setSearchOptions}}>{children}</Provider>
}
 
export default SearchOptionsProvider;
