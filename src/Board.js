import { useEffect, useState } from 'react';
import Cell from './Cell';

const Board = ({ board, onMove }) => {
  const [currentBoard, setCurrentBoard] = useState(board);

  useEffect(() => {
    setCurrentBoard(board);
  }, [board]);

  const handleCellClick = (row, col) => {
    onMove(row, col);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 60px)',
      gap: '2px',
      backgroundColor: '#654321',
      padding: '10px'
    }}>
      {currentBoard.map((row, rowIndex) => 
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Board;