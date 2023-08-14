/* eslint-disable prefer-destructuring */
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const BOARD_SIZE = width - 30;
export const PIECE_SIZE = BOARD_SIZE / 8;
export const WHITE = "rgb(100, 133, 68)";
export const BLACK = "rgb(230, 233, 198)";
export const ACTIVE_COLOR = "rgba(255, 255, 0, 0.5)";
export const DIMENSION = 8;
export const COLUMN_NAMES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const PIECE_IMAGES = {
  br: require("./pieces/br.png"),
  bp: require("./pieces/bp.png"),
  bn: require("./pieces/bn.png"),
  bb: require("./pieces/bb.png"),
  bq: require("./pieces/bq.png"),
  bk: require("./pieces/bk.png"),
  wr: require("./pieces/wr.png"),
  wn: require("./pieces/wn.png"),
  wb: require("./pieces/wb.png"),
  wq: require("./pieces/wq.png"),
  wk: require("./pieces/wk.png"),
  wp: require("./pieces/wp.png"),
};