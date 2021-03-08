import React, { useState } from 'react';
import { Container, DropdownProps, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import MainView from './components/Tabs/MainView/MainView';
import GameProvider from './components/Game/GameProvider'
import { gameDataTypes, GameType } from './games';
import SearchOptionsProvider from './components/Providers/SearchOptionsProvider';
import FilterOptionsProvider from './components/Providers/FilterOptionsProvider';

type GameSelectorProps = {
    onChange:(obj:any,e:DropdownProps) => void;
    defaultGameType:GameType;
}

const GameSelector = (props:GameSelectorProps) => {
    const {onChange, defaultGameType} = props;
    const options:any[] = [];
    Object.values(GameType).forEach( (gameType) =>{
        const gameData = gameDataTypes[gameType as GameType];
        options.push({text:gameData.name, value:gameType});
    } )

    return <>    
        <Form.Select 
            value={defaultGameType}
            options={options}
            onChange={onChange}/>
        </>
}


const App = () => {
    const [gameType, setGameType] = useState<GameType>(localStorage.getItem("lastGame") as GameType || GameType.Gloomhaven);

    const onGameTypeChanged = (obj:any, e:DropdownProps):void => {
        setGameType(e.value as GameType);
        localStorage.setItem("lastGame", e.value as GameType);
    }

    return (
        <Container>
            <GameSelector defaultGameType={gameType} onChange={onGameTypeChanged}/>
            <GameProvider gameType={gameType}>
                <FilterOptionsProvider>
                    <SearchOptionsProvider>
                        <MainView/>
                    </SearchOptionsProvider>
                </FilterOptionsProvider>
            </GameProvider>
        </Container>
    );
}

export default App;
