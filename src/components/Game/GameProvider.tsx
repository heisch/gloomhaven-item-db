import React, { useContext, createContext, FC } from 'react'
import {GameType, gameDataTypes} from '../../games'
import { GameData } from '../../games/GameData';

export const GameContext = createContext<GameData>(gameDataTypes[GameType.Gloomhaven]);

export function useGame() {
    return useContext(GameContext);
}

type Props = {
    gameType:GameType;
}

const GameProvider:FC<Props> = (props) => {
    const {gameType, children} = props;
    return <GameContext.Provider value={gameDataTypes[gameType]}>{children}</GameContext.Provider>
}
 
export default GameProvider;
