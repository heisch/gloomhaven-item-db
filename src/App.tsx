import React from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import MainView from "./components/Tabs/MainView/MainView";
import { GameSelector } from "./components/GameSelector";

const App = () => {
	return (
		<Container>
			<GameSelector />
			<MainView />
		</Container>
	);
};

export default App;
