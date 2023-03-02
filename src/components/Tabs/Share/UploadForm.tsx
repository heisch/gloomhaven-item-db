import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Form } from "semantic-ui-react";
import { dataMismatchState } from "../../../State";
import { useFirebase } from "../../Firebase";

type Props = {
	configHash: string;
};

const UploadForm = (props: Props) => {
	const { configHash } = props;
	const [error, setError] = useState<Error | undefined>(undefined);
	const { user, exportData } = useFirebase();
	const dataMismatch = useRecoilValue(dataMismatchState);

	if (!user || user.isAnonymous) {
		return null;
	}

	const authUserId = user && !user.isAnonymous && user.uid;

	const shareUrl =
		location.origin + location.pathname + "?importFrom=" + authUserId;

	return (
		<>
			<p>
				Here you can generate a link to your account that others can
				export the data at any time.
			</p>
			<Form.Group>
				<Form.Input
					id={"export-url-input"}
					width={14}
					value={shareUrl}
				/>
				<Form.Button
					width={2}
					onClick={() => {
						(
							document.getElementById(
								"export-url-input"
							) as HTMLInputElement
						).select();
						document.execCommand("copy");
					}}
				>
					Copy
				</Form.Button>
			</Form.Group>
			<Form.Group>
				{user && !user.isAnonymous && (
					<Form.Button onClick={() => exportData(configHash)}>
						Export
					</Form.Button>
				)}
				{dataMismatch && (
					<p>
						Spoiler configuration differs from cloud storage.
						Remember to export your data.
					</p>
				)}
			</Form.Group>
			{error && <Form.Field>{error.message}</Form.Field>}
		</>
	);
};

export default UploadForm;
