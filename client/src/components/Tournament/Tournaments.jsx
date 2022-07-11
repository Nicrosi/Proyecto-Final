function generate2NMatrix(array) {
  //inscriptos en el torneo en categoria y genero
  if (array.length % 2 !== 0) {
    return "Array should contain an even number";
  }

  if (array.length <= 2) {
    return [array];
  }

  let matrix = [];

  const rows = Math.round(array.length / 2);
  console.log("rows", rows);
  for (let index = 0; index < rows; index++) {
    matrix[index] = [];
    console.log("initial matrix", matrix);
  }
  array.forEach((value, index) => {
    let row = Math.floor(index / 2);
    let column = index % 2;
    console.log("columnas", column);
    matrix[row][column] = value;
  });

  return matrix;
}
function rotateAroundPivot(matrix) {
  const rows = matrix.length;
  const height = rows;
  if (rows < 2) {
    return matrix;
  }
  const neededRotationCount = rows * 2 - 1;
  let tmp;
  let currentIndex = {
    row: 0,
    column: 1,
  };
  for (let i = 0; i < neededRotationCount; i++) {
    const nIndex = nextIndex(currentIndex.row, currentIndex.column, height);

    if (typeof tmp === "undefined") {
      tmp = matrix[nIndex.row][nIndex.column];

      matrix[nIndex.row][nIndex.column] =
        matrix[currentIndex.row][currentIndex.column];

      currentIndex = nIndex;
    } else {
      const nextIndexValue = matrix[nIndex.row][nIndex.column];

      matrix[nIndex.row][nIndex.column] = tmp;

      tmp = nextIndexValue;

      currentIndex = nIndex;
    }
  }
}

function nextIndex(row, column, matrixHeight) {
  if (row >= matrixHeight) {
    return "Row index must be less than matrix height - 1";
  }

  if (row === matrixHeight - 1) {
    if (column === 0) {
      if (matrixHeight === 2) {
        return {
          row: 0,
          column: 1,
        };
      } else {
        return {
          row: row - 1,
          column: 0,
        };
      }
    } else {
      return {
        row: row,
        column: 0,
      };
    }
  } else if (row === 0) {
    if (column === 0) {
      return "Invalid index. Index 0-0 is reserved for the pivot";
    }

    return {
      row: 1,
      column: 1,
    };
  } else if (row === 1 && column === 0) {
    return {
      row: 0,
      column: 1,
    };
  } else {
    if (column === 0) {
      return {
        row: row - 1,
        column: column,
      };
    } else {
      return {
        row: row + 1,
        column: column,
      };
    }
  }
}

function turnIntoRound(matrix) {
  return matrix.map((match) => {
    return {
      teamA: match[0],
      teamB: match[1],
    };
  });
}

function createDraw(array) {
  let matches = [];
  const matchesCount = array.length - 1;
  console.log("matchCount", matchesCount);
  const matrix = generate2NMatrix(array);

  for (let day = 0; day < matchesCount; day++) {
    const matchDay = turnIntoRound(matrix);
    matches.push({
      name: `Round ${day + 1}`,
      value: matchDay,
    });
    rotateAroundPivot(matrix);
  }
  return matches;
}

export function generateRandomDraw(array) {
  let sortedArray = array.sort(() => Math.random() - 0.5);
  console.log("sortedArray", sortedArray);
  const randomDraw = createDraw(sortedArray);
  return randomDraw;
}
