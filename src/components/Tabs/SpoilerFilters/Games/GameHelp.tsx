import React from "react";
import { useRecoilValue } from "recoil";
import { Form, List } from "semantic-ui-react";
import { gameInfo, GameInfo } from "../../../../games/GameInfo";
import { AllGames } from "../../../../games/GameType";
import { useGameSort } from "../../../../games/useGameSort";
import { gameTypeState } from "../../../../State";

const constructHelpEntry = (
  title: string,
  gameType: AllGames,
  { addItemsToGames, gameClasses, soloGameType }: GameInfo
) => {
  const soloGameTitle = soloGameType ? gameInfo[soloGameType].title : undefined;
  return (
    <List.Item key={`${title}-${gameType}`}>
      <strong>{title}</strong>
      <List.List>
        {gameClasses().length > 0 && (
          <List.Item>Add classes to party management</List.Item>
        )}
        {addItemsToGames && addItemsToGames.includes(gameType) && (
          <List.Item>Add Items for use</List.Item>
        )}
        {soloGameTitle && (
          <List.Item>{`Add solo scenario items for ${soloGameTitle}`}</List.Item>
        )}
      </List.List>
    </List.Item>
  );
};

export const GameHelp = () => {
  const currentGameType = useRecoilValue(gameTypeState);
  const { withoutCurrent } = useGameSort();

  return (
    <Form.Group>
      <List bulleted>
        <List.Header>Which Games/Expansions are you playing with?</List.Header>
        {withoutCurrent.map((gameType) => {
          const gi = gameInfo[gameType];
          const { title, gamesToFilterOn } = gi;
          if (
            !gamesToFilterOn ||
            (gamesToFilterOn && !gamesToFilterOn.includes(currentGameType))
          ) {
            return constructHelpEntry(title, gameType, gi);
          }
          return null;
        })}
      </List>
    </Form.Group>
  );
};
