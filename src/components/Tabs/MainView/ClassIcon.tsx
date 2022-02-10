import React from "react";
import { Image } from "semantic-ui-react";
import { ClassesInUse } from "../../../State/Types";
type Props = {
  name: ClassesInUse | undefined;
  className?: string;
  onClick?: (name: ClassesInUse) => void;
}

const ClassIcon = (props:Props) => {
    const {name, className = "soloClass", onClick} = props;
    if (!name) {
      return null;
    }
    return (
      <Image
        key={name}
        src={require(`../../../img/classes/${name}.png`)}
        className={className}
        onClick={() => onClick && onClick(name)}
      />
    );}

export default ClassIcon;
