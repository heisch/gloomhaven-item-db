import React from "react";
import { Image } from "semantic-ui-react";
import {
	ClassesInUse,
	CSClasses,
	CSAClasses,
	TOAClasses,
} from "../../State/Types";
type Props = {
	name: ClassesInUse | undefined;
	className?: string;
	onClick?: (name: ClassesInUse) => void;
};

export const getWorldHavenClass = (
	name: string,
	game: string,
	gamePrefix: string
) => {
	return require(`../../../worldhaven/images/tokens/${game}/character-tokens/${gamePrefix}-${name}-token.png`);
};

export const getCSClass = (name: string) => {
	return getWorldHavenClass(name, "crimson-scales", "cs");
};

export const getTOAClass = (name: string) => {
	return getWorldHavenClass(name, "trail-of-ashes", "toa");
};

const classIconFolder: Record<string, string> = {
	[CSClasses.CS1]: getCSClass("bombard"),
	[CSClasses.CS2]: getCSClass("brightspark"),
	[CSClasses.CS3]: getCSClass("chainguard"),
	[CSClasses.CS4]: getCSClass("chieftain"),
	[CSClasses.CS5]: getCSClass("fire-knight"),
	[CSClasses.CS6]: getCSClass("hierophant"),
	[CSClasses.CS7]: getCSClass("hollowpact"),
	[CSClasses.CS8]: getCSClass("luminary"),
	[CSClasses.CS9]: getCSClass("mirefoot"),
	[CSClasses.CS10]: getCSClass("spirit-caller"),
	[CSClasses.CS11]: getCSClass("starslinger"),
	[CSAClasses.CSA1]: getCSClass("amber-aegis"),
	[CSAClasses.CSA2]: getCSClass("artificer"),
	[CSAClasses.CSA3]: getCSClass("ruinmaw"),
	[TOAClasses.TOA1]: getTOAClass("incarnate"),
	[TOAClasses.TOA2]: getTOAClass("rimehearth"),
	[TOAClasses.TOA3]: getTOAClass("shardrender"),
	[TOAClasses.TOA4]: getTOAClass("tempest"),
	[TOAClasses.TOA5]: getTOAClass("thornreaper"),
	[TOAClasses.TOA6]: getTOAClass("vanquisher"),
};

export const getClassIcon = (name: string) => {
	let classPath = classIconFolder[name];
	if (!classPath) {
		try {
			classPath = require(`../../img/class-tokens/${name.toLowerCase()}.png`);
		} catch {
			classPath = require(`../../img/classes/${name}.png`);
		}
	}
	return classPath;
};

export const ClassIcon = (props: Props) => {
	const { name, className = "soloClass", onClick } = props;
	if (!name) {
		return null;
	}
	const classPath = getClassIcon(name);
	return (
		<Image
			key={name}
			src={classPath}
			className={className}
			onClick={() => onClick && onClick(name)}
		/>
	);
};
