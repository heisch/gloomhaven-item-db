import React from "react";
import { Form, Image } from "semantic-ui-react";
import { ClassesInUse } from "../../../State/Types";

type Props = {
    label: string;
    classes: ClassesInUse[];
    onClick: (className: ClassesInUse) => void;
    isEnabled : (className:ClassesInUse) => boolean;
}

export const ClassList = (props: Props) => {
    const { label, classes, onClick, isEnabled} = props;
  return (
    <Form.Group inline className={"inline-break"}>
      <label>{label}</label>
      {classes.map((className) => (
        <Image
          key={className}
          src={require(`../../../img/classes/${className}.png`)}
          className={"icon" + (isEnabled(className) ? "" : " disabled")}
          onClick={() => onClick(className)}
        />
      ))}
    </Form.Group>
  );
};
