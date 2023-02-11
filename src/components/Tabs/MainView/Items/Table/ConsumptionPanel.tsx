import React from "react";
import { ElementData } from "../../../../../State";
import { GHIcon } from "../../../../Utils";

interface Props {
	elements: ElementData[];
	effectHtml?: string;
}

const colors: Record<string, string> = {
	air: "#9ab1b9",
	dark: "#202d37",
	earth: "#89a63c",
	fire: "#e55727",
	ice: "#18c0ea",
	light: "edab1c",
};

export const ConsumptionPanel = (props: Props) => {
	const { elements, effectHtml } = props;
	const [leftElementData, rightElementData] = elements;
	const { element: leftElement, colorize: leftColorize } = leftElementData;
	const { element: rightElement, colorize: rightColorize } =
		rightElementData || { element: undefined };
	const leftColor = colors[leftElement];
	const rightColor = rightElement ? colors[rightElement] : undefined;
	const iconSize = 18;
	return (
		<span
			style={{
				position: "relative",
				width: "auto",
				height: "27px",
				borderRadius: "150px",
				display: "flex",
				padding: "5px",
			}}
		>
			<div
				style={{
					width: `${iconSize * elements.length}px`,
					height: "18px",
					left: "0%",
					position: "relative",
					backgroundColor: "grey",
					borderRadius: "150px",
				}}
			>
				{leftColorize && (
					<svg
						viewBox="0 0 500 300"
						xmlns="http://www.w3.org/2000/svg"
						style={{
							color: leftColor,
							width: "100%",
							height: "100%",
							position: "absolute",
						}}
					>
						<circle cx="115" cy="150" r="120" fill="currentColor" />
						<polygon
							points="115 30, 270 30, 225 270, 125 270"
							fill="currentColor"
						/>
					</svg>
				)}
				{rightColorize && (
					<svg
						viewBox="0 0 500 300"
						xmlns="http://www.w3.org/2000/svg"
						style={{
							color: rightColor,
							width: "100%",
							height: "100%",
							position: "absolute",
						}}
					>
						<circle cx="385" cy="150" r="120" fill="currentColor" />
						<polygon
							points="285 30, 385 30, 385 270, 240 270"
							fill="currentColor"
						/>
					</svg>
				)}
				{elements.map(({ element, consume, colorize }, index) => {
					const name = colorize
						? `fh-${element}-icon.png`
						: `fh-${element}.png`;
					return (
						<div key={`${element}-${index}`}>
							<GHIcon
								name={name}
								folder="elements"
								style={{
									width: `${100 / elements.length}%`,
									height: "100%",
									position: "absolute",
									top: "0%",
									left: !index ? "1.5%" : undefined,
									right: index ? "1.5%" : undefined,
								}}
							/>
							{consume && (
								<GHIcon
									name={"fh-consume.png"}
									folder="elements"
									style={{
										height: "40%",
										position: "absolute",
										bottom: "11.5%",
										left: !index
											? `${
													29 +
													(elements.length > 2
														? 0
														: 37)
											  }%`
											: undefined,
										right: index ? "0%" : undefined,
										border: "1px white solid",
										borderRadius: "50%",
									}}
								/>
							)}
						</div>
					);
				})}
			</div>
			{effectHtml && (
				<div
					style={{
						margin: "5px 0 0 5px",
						width: `calc(100% - ${
							(iconSize + 1) * elements.length
						}px)`,
						height: "100%",
						left: `${(iconSize + 1) * elements.length}px`,
						position: "absolute",
						top: 0,
					}}
				>
					{" : "}

					<span
						dangerouslySetInnerHTML={{
							__html: effectHtml,
						}}
					/>
				</div>
			)}
		</span>
	);
};
