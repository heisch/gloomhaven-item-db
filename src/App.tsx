import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import dbApp from "./State/Reducer";
import MainView from './components/Tabs/MainView/MainView';
import GameProvider, {GameType} from './components/Game/GameProvider';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export const store = createStore(dbApp,  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

const App = () => {
    return (
        <Container>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <GameProvider gameType={GameType.GH}>
                                <MainView/>
                            </GameProvider>
                        </Route>                    
                        <Route exact path="/jotl">
                        <GameProvider gameType={GameType.JOTL}>
                            <MainView/>
                        </GameProvider>
                        </Route>                    
                    </Switch>
                </Router>
            </Provider>
        </Container>
    );
}

export default App;
