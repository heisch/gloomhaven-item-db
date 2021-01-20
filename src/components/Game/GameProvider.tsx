import React, { useContext, createContext, ReactNode } from 'react'
import {BaseGameData, GameType, gameDataTypes} from '../../games'

export const GameContext = createContext<BaseGameData>(gameDataTypes[GameType.Gloomhaven]);

export function useGame() {
    return useContext(GameContext);
}

type Props = {
    gameType:GameType;
    children: ReactNode;
}

const GameProvider = (props:Props) => {
    const {gameType, children} = props;
    return <GameContext.Provider value={gameDataTypes[gameType]}>{children}</GameContext.Provider>
}
 
export default GameProvider;
