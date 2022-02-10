import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DropdownProps, Form } from "semantic-ui-react";
import { gameDataTypes, GameType } from "../games";
import { gameTypeState } from "../State/GameTypeState";

export const GameSelector = () => {
    const gameType = useRecoilValue(gameTypeState);
    const setGameType = useSetRecoilState(gameTypeState);
    const options:any[] = [];
    Object.values(gameDataTypes).forEach( (gameData) =>{
        const {gameName:text, gameType: value} = gameData;
        options.push({text, value});
    } )

    return <Form.Select 
            value={gameType}
            options={options}
            onChange={(obj: any, e: DropdownProps) => {setGameType(e.value as GameType)}}/>;
}
