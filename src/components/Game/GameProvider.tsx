import React, { useContext, createContext, ReactNode } from 'react';

export enum GameType
{
    GH = "gh",
    JOTL= "jotl"
}

export const GameContext = createContext<GameType>(GameType.GH);

export function useGame() {
    return useContext(GameContext);
}

type Props = {
    gameType:GameType;
    children: ReactNode;
}

const GameProvider = (props:Props) => {
    const {gameType, children} = props;
    return <GameContext.Provider value={gameType}>{children}</GameContext.Provider>
}
 
export default GameProvider;
