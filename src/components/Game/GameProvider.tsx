import React, { useContext, createContext, FC, useState, useMemo, useCallback } from 'react'
import {GameType, gameDataTypes} from '../../games'
import { GameData } from '../../games/GameData';

type Data = {
    gameData:GameData;
    onGameTypeChanged: (gt:GameType) => void;
}

export const GameContext = createContext<Data | undefined>(undefined);

export function useGame() {
    const result =  useContext(GameContext);
    if (!result) {
        throw Error("No Context");
    }
    return result;
}

const GameProvider:FC = (props) => {
    const {children} = props;
    const [gameType, setGameType] = useState<GameType>(
        (localStorage.getItem("lastGame") as GameType) || GameType.Gloomhaven
      );

      const onGameTypeChanged = useCallback((gameType: GameType) => {
          setGameType(gameType);
          localStorage.setItem("lastGame", gameType);   
      }, [])
        const value = useMemo(() => {
            return {gameData: gameDataTypes[gameType], onGameTypeChanged}
        }, [gameType]
        )


    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
 
export default GameProvider;
