import React from "react";
import { Image } from "semantic-ui-react";
import { ClassesInUse, CSClasses, CSAClasses } from "../../State/Types";
type Props = {
	name: ClassesInUse | undefined;
	className?: string;
	onClick?: (name: ClassesInUse) => void;
};

export const getWorldHavenClass = (name: string) => {
	return require(`../../../worldhaven/images/tokens/crimson-scales/character-tokens/cs-${name}-token.png`);
};

const classIconFolder: Record<string, string> = {
	[CSClasses.CS1]: getWorldHavenClass("bombard"),
	[CSClasses.CS2]: getWorldHavenClass("brightspark"),
	[CSClasses.CS3]: getWorldHavenClass("chainguard"),
	[CSClasses.CS4]: getWorldHavenClass("chieftain"),
	[CSClasses.CS5]: getWorldHavenClass("fire-knight"),
	[CSClasses.CS6]: getWorldHavenClass("hierophant"),
	[CSClasses.CS7]: getWorldHavenClass("hollowpact"),
	[CSClasses.CS8]: getWorldHavenClass("luminary"),
	[CSClasses.CS9]: getWorldHavenClass("mirefoot"),
	[CSClasses.CS10]: getWorldHavenClass("spirit-caller"),
	[CSClasses.CS11]: getWorldHavenClass("starslinger"),
	[CSAClasses.CSA1]: getWorldHavenClass("amber-aegis"),
	[CSAClasses.CSA2]: getWorldHavenClass("artificer"),
	[CSAClasses.CSA3]: getWorldHavenClass("ruinmaw"),
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
