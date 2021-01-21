import React, { useState } from 'react';
import { Container, DropdownProps } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import MainView from './components/Tabs/MainView/MainView';
import GameProvider from './components/Game/GameProvider'
import { GameType } from './games';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SearchOptionsProvider from './components/Providers/SearchOptionsProvider';
import FilterOptionsProvider from './components/Providers/FilterOptionsProvider';
import { GameSelector } from './components/GameSelector';
import Navigation from './components/Navigation';
import SignInPage from './components/Tabs/Share/Account/SignIn';
import SignUpPage from './components/Tabs/Share/Account/SignUp';
import PasswordForgetPage from './components/Tabs/Share/Account/PasswordForgotten';
import AccountPage from './components/Tabs/Share/Account/Account';
import * as ROUTES from './constants/routes';

const App = () => {
  const [gameType, setGameType] = useState<GameType>(
    (localStorage.getItem("lastGame") as GameType) || GameType.Gloomhaven
  );

  const onGameTypeChanged = (obj: any, e: DropdownProps): void => {
    setGameType(e.value as GameType);
    localStorage.setItem("lastGame", e.value as GameType);
  };

  return (
    <Container>
      <GameSelector defaultGameType={gameType} onChange={onGameTypeChanged} />
        <Router>
          <Navigation />
          <Switch>
            <Route exact path={ROUTES.HOME}>
              <GameProvider gameType={gameType}>
              <FilterOptionsProvider>
                    <SearchOptionsProvider>
                      <MainView />
                    </SearchOptionsProvider>
                </FilterOptionsProvider>
              </GameProvider>
            </Route>
            <Route exact path={ROUTES.SIGN_IN}>
              <SignInPage />
            </Route>
            <Route exact path={ROUTES.SIGN_UP}>
              <SignUpPage />
            </Route>
            <Route exact path={ROUTES.PASSWORD_FORGET}>
              <PasswordForgetPage />
            </Route>
            <Route exact path={ROUTES.ACCOUNT}>
              <AccountPage />
            </Route>
          </Switch>
        </Router>
    </Container>
  );
};

export default App;
