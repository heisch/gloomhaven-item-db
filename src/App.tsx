import React from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import MainView from "./components/Tabs/MainView/MainView";
import FilterOptionsProvider from "./components/Providers/FilterOptionsProvider";
import { GameSelector } from "./components/GameSelector";
import { RecoilRoot } from "recoil";

const App = () => {
	return (
		<RecoilRoot>
			<Container>
				<GameSelector />
				<FilterOptionsProvider>
					<MainView />
				</FilterOptionsProvider>
			</Container>
		</RecoilRoot>
	);
};

export default App;
