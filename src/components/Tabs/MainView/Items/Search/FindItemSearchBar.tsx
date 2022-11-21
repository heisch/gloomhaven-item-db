import React from "react";
import { useRecoilState } from "recoil";
import { Form, Input } from "semantic-ui-react";
import { searchState } from "../../../../../State";

export const FindItemSearchBar = () => {
	const [searchString, setSearchString] = useRecoilState(searchState);
	return (
		<Form.Group inline>
			<label>Find Item:</label>
			<Input
				value={searchString}
				onChange={(e) => {
					setSearchString(e.target.value);
				}}
				icon={{
					name: "close",
					link: true,
					onClick: () => setSearchString(""),
				}}
				placeholder={"Search..."}
			/>
		</Form.Group>
	);
};
