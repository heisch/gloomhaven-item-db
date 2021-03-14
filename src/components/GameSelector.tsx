import React from "react";
import { DropdownProps, Form } from "semantic-ui-react";
import { gameDataTypes, GameType } from "../games";

type GameSelectorProps = {
    onChange:(obj:any,e:DropdownProps) => void;
    defaultGameType:GameType;
}

export const GameSelector = (props:GameSelectorProps) => {
    const {onChange, defaultGameType} = props;
    const options:any[] = [];
    Object.values(GameType).forEach( (gameType) =>{
        const gameData = gameDataTypes[gameType as GameType];
        options.push({text:gameData.gameName, value:gameType});
    } )

    return <Form.Select 
            value={defaultGameType}
            options={options}
            onChange={onChange}/>;
}
