import React from 'react';
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import MainView from './components/Tabs/MainView/MainView';
import SearchOptionsProvider from './components/Providers/SearchOptionsProvider';
import FilterOptionsProvider from './components/Providers/FilterOptionsProvider';
import { GameSelector } from './components/GameSelector';
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
    <RecoilRoot>
      <Container>
          <GameSelector/>
          <FilterOptionsProvider>
                <SearchOptionsProvider>
                  <MainView />
                </SearchOptionsProvider>
            </FilterOptionsProvider>
      </Container>
    </RecoilRoot>
  );
};

export default App;
