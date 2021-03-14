import React, { useContext, createContext, ReactNode, useState } from 'react'
import { GameType } from '../../games'
import { PullDownOptions, GloomhavenItem, GloomhavenItemSlot, SortDirection, SortProperty, ClassesInUse } from '../../State/Types';
import { useGame } from '../Game/GameProvider';

export interface SearchOptions {
    slots?: Array<GloomhavenItemSlot>;
    search: string;
    direction: SortDirection;
    property: SortProperty;
    selectedItem: GloomhavenItem | undefined;
    selectedClass: PullDownOptions;
    availableOnly: boolean;
    classToRemove: PullDownOptions;
    confirmEnvelopeX: boolean;
}

const initialSearchOptions : SearchOptions = {
    slots: undefined,
    search: '',
    direction: SortDirection.ascending,
    property: 'id',
    selectedItem: undefined,
    selectedClass: undefined,
    availableOnly: false,
    classToRemove: undefined,
    confirmEnvelopeX: false,
};

const initialGameSearchOptions = {
    [GameType.Gloomhaven] : initialSearchOptions,
    [GameType.JawsOfTheLion] : initialSearchOptions,
};

export const Context = createContext({searchOptions: initialSearchOptions, updateSearchOptions: (options: any) => {}});

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

    const updateSearchOptions = ( options : any ) => {
        gameSearchOptions[gameType] = {...gameSearchOptions[gameType], ...options};
        setGameSearchOptions(Object.assign({}, gameSearchOptions))
    }
    
    return <Provider value={{searchOptions:gameSearchOptions[gameType], updateSearchOptions}}>{children}</Provider>
}
 
export default SearchOptionsProvider;
