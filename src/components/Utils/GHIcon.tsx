import React from "react";

type Props = {
	name: string;
	className?: string;
	folder?: string;
	onClick?: () => void;
};

export const GHIcon = (props: Props) => {
	const { name, folder = "general", onClick, className = "icon" } = props;
	return (
		<img
			src={require(`../../img/icons/${folder}/${name}`)}
			className={className}
			alt={name}
			onClick={onClick}
		/>
	);
};
