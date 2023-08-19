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
  br: require("../../assets/pieces/br.png"),
  bp: require("../../assets/pieces/bp.png"),
  bn: require("../../assets/pieces/bn.png"),
  bb: require("../../assets/pieces/bb.png"),
  bq: require("../../assets/pieces/bq.png"),
  bk: require("../../assets/pieces/bk.png"),
  wr: require("../../assets/pieces/wr.png"),
  wn: require("../../assets/pieces/wn.png"),
  wb: require("../../assets/pieces/wb.png"),
  wq: require("../../assets/pieces/wq.png"),
  wk: require("../../assets/pieces/wk.png"),
  wp: require("../../assets/pieces/wp.png"),
};

export const Sounds = {
  move: require("../../assets/sounds/move.webm"),
  capture: require("../../assets/sounds/capture.webm"),
  check: require("../../assets/sounds/check.webm"),
}