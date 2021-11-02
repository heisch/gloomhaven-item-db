import React from 'react';
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import MainView from './components/Tabs/MainView/MainView';
import GameProvider from './components/Game/GameProvider'
import SearchOptionsProvider from './components/Providers/SearchOptionsProvider';
import FilterOptionsProvider from './components/Providers/FilterOptionsProvider';
import { GameSelector } from './components/GameSelector';

const App = () => {
  return (
    <Container>
      <GameProvider>
         <GameSelector/>
          <FilterOptionsProvider>
                <SearchOptionsProvider>
                  <MainView />
                </SearchOptionsProvider>
            </FilterOptionsProvider>
          </GameProvider>
    </Container>
  );
};

export default App;
