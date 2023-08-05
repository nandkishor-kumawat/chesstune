/* eslint-disable prefer-destructuring */
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const BOARD_SIZE = width - 30;
export const PIECE_SIZE = BOARD_SIZE / 8;
export const SIZE = BOARD_SIZE / 8;
export const WHITE = "rgb(100, 133, 68)";
export const BLACK = "rgb(230, 233, 198)";
export const ACTIVE_COLOR = "rgba(255, 255, 0, 0.5)";
export const DIMENSION = 8;
export const COLUMN_NAMES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const PIECES = {
  br: require("../assets/piece/br.png"),
  bp: require("../assets/piece/bp.png"),
  bn: require("../assets/piece/bn.png"),
  bb: require("../assets/piece/bb.png"),
  bq: require("../assets/piece/bq.png"),
  bk: require("../assets/piece/bk.png"),
  wr: require("../assets/piece/wr.png"),
  wn: require("../assets/piece/wn.png"),
  wb: require("../assets/piece/wb.png"),
  wq: require("../assets/piece/wq.png"),
  wk: require("../assets/piece/wk.png"),
  wp: require("../assets/piece/wp.png"),
};

export const toPosition = ({ x, y }) => {
  const row = `${8 - x}`;
  const col = String.fromCharCode(97 + y);
  return `${col}${row}`;
};
