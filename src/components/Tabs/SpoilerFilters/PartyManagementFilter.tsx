import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
	Dropdown,
	DropdownProps,
	Form,
	Popup,
	Icon,
	List,
} from "semantic-ui-react";
import { itemManagementTypeState } from "../../../State";
import { ItemManagementType } from "../../../State/Types";

const PartyManagementFilter = () => {
	const [itemManagementType, setItemManagementType] = useRecoilState(
		itemManagementTypeState
	);

	const [managementType, setManagmentType] = useState(itemManagementType);

	useEffect(() => {
		setManagmentType(itemManagementType);
	}, [itemManagementType]);

	const options = Object.keys(ItemManagementType).map((key) => {
		return { value: key, text: key };
	});

	const onChangeItemManagement = (_d: any, data: DropdownProps) => {
		const { value } = data;
		if (value) {
			setManagmentType(value as ItemManagementType);
			setItemManagementType(value as ItemManagementType);
		}
	};

	return (
		<Form.Group inline>
			<Form.Group inline>
				<label>Store Stock Management Type:</label>

				<Popup
					closeOnDocumentClick
					hideOnScroll
					trigger={
						<Icon name={"question circle"} className={"blue"} />
					}
					header={"Stock Management"}
					content={
						<List bulleted>
							<List.Item>
								None
								<List.List>
									<List.Item>No management</List.Item>
								</List.List>
							</List.Item>
							<List.Item>
								Simple
								<List.List>
									<List.Item>
										Indicate that an item has been
										purchased.
									</List.Item>
								</List.List>
							</List.Item>
							<List.Item>
								Party
								<List.List>
									<List.Item>
										Indicate which member of your party has
										the item
									</List.Item>
								</List.List>
							</List.Item>
						</List>
					}
				/>
				<Dropdown
					value={managementType}
					onChange={onChangeItemManagement}
					options={options}
				/>
			</Form.Group>
		</Form.Group>
	);
};

export default PartyManagementFilter;
