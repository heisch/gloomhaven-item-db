import React, { useContext, createContext, useState, FC } from "react";
import { useRecoilValue } from "recoil";
import { GameType } from "../../games";
import { gameDataState } from "../../State";
import { GloomhavenItem, ClassesInUse } from "../../State/Types";

export interface SearchOptions {
	selectedItem: GloomhavenItem | undefined;
	selectedClass: ClassesInUse | undefined;
	classToRemove: ClassesInUse | undefined;
	confirmEnvelopeX: boolean;
}

const initialSearchOptions: SearchOptions = {
	selectedItem: undefined,
	selectedClass: undefined,
	classToRemove: undefined,
	confirmEnvelopeX: false,
};

const initialGameSearchOptions = {
	[GameType.Gloomhaven]: initialSearchOptions,
	[GameType.JawsOfTheLion]: initialSearchOptions,
};

type ContextData = {
	searchOptions: SearchOptions;
	updateSearchOptions: (options: any) => void;
};

export const Context = createContext<ContextData | undefined>(undefined);

export function useSearchOptions() {
	const result = useContext(Context);
	if (!result) {
		throw Error("No Context Found");
	}
	return result;
}

const SearchOptionsProvider: FC = (props) => {
	const { children } = props;
	const { gameType } = useRecoilValue(gameDataState);

	const [gameSearchOptions, setGameSearchOptions] = useState(
		initialGameSearchOptions
	);
	const { Provider } = Context;

	const updateSearchOptions = (options: any) => {
		gameSearchOptions[gameType] = {
			...gameSearchOptions[gameType],
			...options,
		};
		setGameSearchOptions(Object.assign({}, gameSearchOptions));
	};

	return (
		<Provider
			value={{
				searchOptions: gameSearchOptions[gameType],
				updateSearchOptions,
			}}
		>
			{children}
		</Provider>
	);
};

export default SearchOptionsProvider;
