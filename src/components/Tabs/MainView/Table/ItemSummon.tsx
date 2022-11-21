import React from "react";
import { Summon } from "../../../../State/Types";
import { GHIcon } from "../GHIcon";

type Props = {
	summon: Summon;
};

export const ItemSummon = (props: Props) => {
	const {
		summon: { hp, move, attack, range },
	} = props;
	return (
		<div className={"item-summon"}>
			<div>
				<GHIcon name={"heal.png"} />: {hp}
			</div>
			<div>
				<GHIcon name={"move.png"} />: {move}
			</div>
			<div>
				<GHIcon name={"attack.png"} />: {attack}
			</div>
			<div>
				<GHIcon name={"range.png"} />: {range || "-"}
			</div>
		</div>
	);
};
