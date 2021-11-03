import React from "react";
import { Image, Dropdown, DropdownProps } from "semantic-ui-react";
import { ClassesInUse } from "../../../State/Types";

type Props = {
  className?: string;
  optionsList: ClassesInUse[];
  onChange: (option: ClassesInUse) => void;
  disabled?: boolean;
};

export const createClassImage = (option: ClassesInUse) => {
  return (
    <Image
      key={option}
      src={require(`../../../img/classes/${option}.png`)}
      className={"soloClass"}
    />
  );
};

const ClassDropdown = (props:Props) => {
  const { optionsList, onChange } = props;
    return <Dropdown
      onChange={(_e:Object, data:DropdownProps) => onChange(data.value as ClassesInUse)}
      placeholder="Choose Class"
      clearable
      selection
      options={optionsList.map( option => {return { key: option, value: option, image: createClassImage(option) }})}
    />
}

export default ClassDropdown;
