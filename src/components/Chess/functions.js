const HTTP_BASE_URL = 'https://en.lichess.org';

export const getPuzzleData = async (type) => {
  const subUrl = type === 'training' ? `training/new?_${Date.now()}` : 'training/daily';
  const res = await fetch(`${HTTP_BASE_URL}/${subUrl}`, {
    headers: {
      Accept: 'application/vnd.lichess.v2+json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })
  const data = await res.json();
  return data;
}

export const toPosition = ({ x, y }) => {
  const row = `${8 - x}`;
  const col = String.fromCharCode(97 + y);
  return `${col}${row}`;
};


export function createBoardData(game, newFen) {
  if (newFen) {
    game.load(newFen);
  }
  const boardData = game.board();
  const squares = [];
  const history = game.history({ verbose: true });
  const lastMove = history[history.length - 1] || {};
  const inCheck = game.inCheck();
  const turn = game.turn();

  boardData.forEach((row, rowIndex) => {
    row.forEach((square, columnIndex) => {
      const position = toPosition({ x: rowIndex, y: columnIndex })
      const type = square ? square.type : '';
      const color = square ? square.color : '';

      squares.push({
        ...square,
        position,
        rowIndex,
        columnIndex,
        selected: false,
        canMoveHere: false,
        lastMove: position === lastMove.to || position === lastMove.from,
        inCheck: inCheck && turn === color && type === 'k',
      });
    });
  });

  return squares;
}

export const emptyBoard = () => {
  const squares = []
  new Array(8).fill(0).map((_, rowIndex) => {
    new Array(8).fill(0).map((_, columnIndex) => {
      squares.push({
        position: toPosition({ x: rowIndex, y: columnIndex }),
        rowIndex,
        columnIndex,
        selected: false,
        canMoveHere: true,
        lastMove: null,
        inCheck: false,
      })
    })
  })
  return squares
}