import React from "react";

type Props = {
	name: string;
	folder?: string;
};

export const GHIcon = (props: Props) => {
	const { name, folder } = props;
	return (
		<img
			src={require(`../../../img/icons/${folder || "general"}/${name}`)}
			className={"icon"}
			alt={name}
		/>
	);
};
