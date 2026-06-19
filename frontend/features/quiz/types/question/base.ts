import { PointsMode } from "../points-mode";

export type BaseQuestion = {
  id: string;
  title: string;
  points: PointsMode;
  timeLimitMs: number;
  image: null | string;
};