import React from "react";

type Props = {
	name: string;
	className?: string;
	folder?: string;
	onClick?: () => void;
	style?: any;
};

export const GHIcon = (props: Props) => {
	const {
		name,
		folder = "general",
		onClick,
		className = "icon",
		style,
	} = props;

	let filename = name;
	let src;
	if (filename.startsWith("wfh-")) {
		filename = filename.substring(1);
		src = require(`../../../worldhaven/images/tokens/frosthaven/${folder}/${filename}`);
	} else {
		src = require(`../../img/icons/${folder}/${name}`);
	}

	return (
		<img
			src={src}
			className={className}
			alt={filename}
			onClick={onClick}
			style={style}
		/>
	);
};
