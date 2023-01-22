import React from "react";
import { Segment } from "semantic-ui-react";
import SpoilerFilterItemList from "./SpoilerFilterItemList";
import { useRecoilValue } from "recoil";
import { prosperityState } from "../../../../State";
import { AllGames, Expansions } from "../../../../games/GameType";
import { ReputationPulldown } from "./ReputationPulldown";
import { ProsperityFilter } from "./ProsperityFilter";
import { SoloClassFilterBlock } from "./SoloClassFilterBlock";

const soloClassesToInclude: AllGames[] = [
	Expansions.GHSoloScenarios,
	Expansions.ForgottenCircles,
	Expansions.CrimsonScales,
	Expansions.CrimsonScalesAddon,
	Expansions.TrailOfAshes,
];

export const GHSpoilerFilter = () => {
	const prosperity = useRecoilValue(prosperityState);

	return (
		<Segment>
			<ReputationPulldown />
			<ProsperityFilter />
			<Segment>
				<SpoilerFilterItemList
					ranges={[
						{
							range: [
								{ start: (prosperity + 1) * 7 + 1, end: 70 },
							],
						},
					]}
					title="Prosperity Items"
				/>
				<SpoilerFilterItemList
					ranges={[{ range: [{ start: 71, end: 95 }] }]}
					title="Random Item Design"
				/>
				<SpoilerFilterItemList
					ranges={[{ range: [{ start: 96, end: 133 }] }]}
					title="Other Items"
				/>
				<SpoilerFilterItemList
					ranges={[{ range: [{ start: 152, end: 163 }] }]}
					title="Forgotten Circles Items"
					filterOn={Expansions.ForgottenCircles}
				/>
				<SpoilerFilterItemList
					ranges={[
						{
							offset: 164,
							range: [
								{ start: 1, end: 33 },
								{ start: 35, end: 39 },
								{ start: 43, end: 44 },
								{ start: 46 },
								{ start: 49 },
								{ start: 52 },
								{ start: 54, end: 55 },
								{ start: 58, end: 100 },
							],
						},
					]}
					title="Crimson Scales Items"
					filterOn={Expansions.CrimsonScales}
				/>
				<SpoilerFilterItemList
					ranges={[
						{
							range: [{ start: 1, end: 2 }],
							offset: 264,
							prefix: "aa",
						},
						{
							range: [{ start: 1, end: 5 }],
							offset: 267,
							prefix: "qa",
						},
						{
							range: [{ start: 1, end: 4 }, { start: 6 }],
							offset: 273,
							prefix: "rm",
						},
					]}
					title="Crimson Scales Add on Items"
					filterOn={Expansions.CrimsonScalesAddon}
				/>
				<SpoilerFilterItemList
					ranges={[
						{
							offset: 180,
							range: [
								{ start: 101, end: 118 },
								{ start: 122 },
								{ start: 124, end: 127 },
								{ start: 129, end: 130 },
							],
						},
					]}
					title="Trail of Ashes Items"
					filterOn={Expansions.TrailOfAshes}
				/>
			</Segment>

			<SoloClassFilterBlock gameTypes={soloClassesToInclude} />
		</Segment>
	);
};
