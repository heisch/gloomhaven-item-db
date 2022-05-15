import React from "react";
import { Container, Form, Segment } from "semantic-ui-react";
import SpoilerFilterItemList from "./SpoilerFilterItemList";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	discountState,
	includeGameState,
	prosperityState,
} from "../../../State";
import { SoloClassFilter } from "./SoloClassFilter";
import { Expansions, GameType } from "../../../games/GameType";
import { useRemovePlayerUtils } from "../../../hooks/useRemovePlayer";
import { CSAClasses } from "../../../State/Types";

const GHSpoilerFilter = () => {
	const { getClassesForGame } = useRemovePlayerUtils();
	const includeGames = useRecoilValue(includeGameState);
	const [discount, setDiscount] = useRecoilState(discountState);
	const [prosperity, setProsperity] = useRecoilState(prosperityState);
	const includeFC = includeGames.includes(Expansions.ForgottenCircles);
	const includeCS = includeGames.includes(Expansions.CrimsonScales);
	const includeCSA = includeGames.includes(Expansions.CrimsonScalesAddon);
	const ghClasses = getClassesForGame(GameType.Gloomhaven);
	const fcClasses = getClassesForGame(Expansions.ForgottenCircles);
	const csClasses = getClassesForGame(Expansions.CrimsonScales);
	const csaClasses = getClassesForGame(Expansions.CrimsonScalesAddon);

	return (
		<>
			<Form.Group inline>
				<label>Reputation Discount:</label>
				<Form.Select
					value={discount}
					options={[
						{ value: -5, text: "-5 gold" }, // (19 - 20)
						{ value: -4, text: "-4 gold" }, // (15 - 18)
						{ value: -3, text: "-3 gold" }, // (11 - 14)
						{ value: -2, text: "-2 gold" }, // (7 - 13)
						{ value: -1, text: "-1 gold" }, // (3 - 6)
						{ value: 0, text: "none" }, // (-2 - 2)
						{ value: 1, text: "+1 gold" }, // (-3 - -6)
						{ value: 2, text: "+2 gold" }, // (-7 - -10)
						{ value: 3, text: "+3 gold" }, // (-11 - -14)
						{ value: 4, text: "+4 gold" }, // (-15 - -18)
						{ value: 5, text: "+5 gold" }, // (-19 - -20)
					]}
					onChange={(obj, e) => {
						setDiscount(parseInt(e.value as string));
					}}
				/>
			</Form.Group>

			<Form.Field>
				<Form.Group inline>
					<label>Prosperity:</label>
					{[...Array(9).keys()].map((index) => {
						const nextProsperity = index + 1;
						return (
							<Form.Radio
								key={index}
								label={nextProsperity}
								checked={prosperity === nextProsperity}
								onChange={() => setProsperity(nextProsperity)}
							/>
						);
					})}
				</Form.Group>

				<Segment>
					<SpoilerFilterItemList
						ranges={[{ start: (prosperity + 1) * 7 + 1, end: 70 }]}
						title="Prosperity Items"
					/>
					<SpoilerFilterItemList
						ranges={[{ start: 71, end: 95 }]}
						title="Random Item Design"
					/>
					<SpoilerFilterItemList
						ranges={[{ start: 96, end: 133 }]}
						title="Other Items"
					/>
					{includeFC && (
						<SpoilerFilterItemList
							ranges={[{ start: 152, end: 163 }]}
							title="Forgotten Circles Items"
						/>
					)}
					{includeCS && (
						<SpoilerFilterItemList
							offset={164}
							ranges={[
								{ start: 1, end: 33 },
								{ start: 35, end: 39 },
								{ start: 43, end: 44 },
								{ start: 46 },
								{ start: 49 },
								{ start: 52 },
								{ start: 54, end: 55 },
								{ start: 58, end: 100 },
							]}
							title="Crimson Scales Items"
						/>
					)}
					{includeCSA && (
						<>
							<SpoilerFilterItemList
								ranges={[{ start: 1, end: 2 }]}
								title="Crimson Scales Add on Items"
								prefix="aa"
								offset={264}
								padCount={0}
							/>
							<SpoilerFilterItemList
								ranges={[{ start: 1, end: 5 }]}
								prefix="qa"
								offset={267}
								padCount={0}
							/>
							<SpoilerFilterItemList
								ranges={[{ start: 1, end: 4 }, { start: 6 }]}
								prefix="rm"
								offset={273}
								padCount={0}
							/>
						</>
					)}
				</Segment>
			</Form.Field>
			<Segment>
				<Form.Group inline>
					<label>Solo Class Items:</label>
				</Form.Group>
				<SoloClassFilter name="Gloomhaven" classes={ghClasses} />
				{includeFC && (
					<SoloClassFilter
						name="Forgotten Circles"
						classes={fcClasses}
					/>
				)}
				{includeCS && (
					<SoloClassFilter
						name="Crimson Scales"
						classes={csClasses}
					/>
				)}
				{includeCSA && (
					<SoloClassFilter
						name="Crimson Scales Addon"
						classes={csaClasses}
					/>
				)}
			</Segment>
		</>
	);
};

export default GHSpoilerFilter;
