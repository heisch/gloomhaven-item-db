import { GameType } from "../games";

export type GameTypeAction<T> = {
    value: T;
    gameType: GameType;
}
