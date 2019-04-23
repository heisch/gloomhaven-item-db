import React, {Component} from 'react';
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import ItemView from "./ItemView";

class App extends Component {

    render() {

        return (
            <Container><ItemView/></Container>
        );

    }
}

export default App;
