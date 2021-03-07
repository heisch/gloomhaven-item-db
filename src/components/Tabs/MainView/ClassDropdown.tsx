import React from "react";
import { Image, Dropdown, DropdownProps } from "semantic-ui-react";
import { PullDownOptions } from "../../../State/Types";

type Props = {
  className?: string;
  optionsList: PullDownOptions[];
  onChange: (option: PullDownOptions) => void;
  disabled?: boolean;
};

export const createClassImage = (option: PullDownOptions) => {
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
      onChange={(_e:Object, data:DropdownProps) => onChange(data.value as PullDownOptions)}
      placeholder="Choose Class"
      clearable
      selection
      options={optionsList.map( option => {return { key: option, value: option, image: createClassImage(option) }})}
    />
}

export default ClassDropdown;
