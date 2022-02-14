import React, { useCallback } from "react";
import { Tab } from "semantic-ui-react";
import ItemList from "./ItemList";
import SpoilerFilters from "../SpoilerFilters/SpoilerFilters";
import Share from "../Share/Share";
import { useFilterOptions } from "../../Providers/FilterOptionsProvider";
import ImportData from "./ImportData";
import { isFlagEnabled } from "../../../helpers";
import { Account } from "../Account/Account";
import { About } from "../About";
import { useRecoilValue } from "recoil";
import { allState } from "../../../State";

// .git ignore vscode file
// List mode looks crappy
// Buying uses the first element even if nothing is selected
// Look at Object.assign calls

type TabItem = {
	menuItem: string;
	component: JSX.Element;
	shouldShow: boolean;
};

const MainView = () => {
	const all = useRecoilValue(allState);

	const { lockSpoilerPanel, dataChanged } = useFilterOptions();
	const sharingEnabled = isFlagEnabled("sharing");

	const tabData: TabItem[] = [
		{ menuItem: "Item List", component: <ItemList />, shouldShow: true },
		{
			menuItem: "Spoiler Configuration",
			component: <SpoilerFilters />,
			shouldShow: !lockSpoilerPanel,
		},
		{
			menuItem: "Share",
			component: <Share />,
			shouldShow: !lockSpoilerPanel,
		},
		{
			menuItem: "Account",
			component: <Account />,
			shouldShow: !lockSpoilerPanel && sharingEnabled,
		},
		{ menuItem: "About", component: <About />, shouldShow: true },
	];
	const panes = tabData
		.map(({ shouldShow, component, menuItem }) => {
			if (shouldShow) {
				return {
					menuItem,
					render: () => <Tab.Pane>{component}</Tab.Pane>,
				};
			}
			return {};
		})
		.filter((pane) => pane.menuItem !== undefined);

	const getOutlineClass = useCallback(() => {
		if (all || dataChanged) {
			return "spoiler";
		}
		return "";
	}, [all, dataChanged]);

	return (
		<>
			<ImportData />
			<div className={getOutlineClass()}>
				<Tab panes={panes} defaultActiveIndex={0} />
			</div>
			<em className={"pull-right ui text grey"}>
				Gloomhaven and all related properties, images and text are owned
				by{" "}
				<a
					href={"https://www.cephalofair.com/"}
					target={"_blank"}
					rel={"noopener"}
				>
					Cephalofair Games
				</a>
				.
			</em>
		</>
	);
};

export default MainView;
