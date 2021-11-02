import React from "react";
import { DropdownProps, Form } from "semantic-ui-react";
import { gameDataTypes, GameType } from "../games";
import { useGame } from "./Game/GameProvider";

export const GameSelector = () => {
    const {onGameTypeChanged: onChange, gameData: {gameType}} = useGame();
    const options:any[] = [];
    Object.values(gameDataTypes).forEach( (gameData) =>{
        const {gameName:text, gameType: value} = gameData;
        options.push({text, value});
    } )

    return <Form.Select 
            value={gameType}
            options={options}
            onChange={(obj: any, e: DropdownProps) => {onChange(e.value as GameType)}}/>;
}
