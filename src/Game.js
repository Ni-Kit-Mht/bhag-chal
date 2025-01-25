import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Board from './Board';

const Game = () => {
  const { roomId } = useParams();
  const [gameState, setGameState] = useState(null);
  const [playerId, setPlayerId] = useState(0);

  useEffect(() => {
    const roomRef = doc(db, 'rooms', roomId);
    const unsubscribe = onSnapshot(roomRef, (snapshot) => {
      const data = snapshot.data();
      setGameState(data);
      
      if (!data.players.includes(playerId)) {
        setPlayerId(data.players.length);
      }

      if (data.players.length < 2) {
        window.location.href = '/';
      }
    });

    return () => unsubscribe();
  }, [roomId, playerId]);

  const handleMove = async (row, col) => {
    // Add your move validation logic here
    const newBoard = [...gameState.board];
    newBoard[row][col] = gameState.currentPlayer === 0 ? 'bhag' : 'bhakra';
    
    await updateDoc(doc(db, 'rooms', roomId), {
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 0 ? 1 : 0
    });
  };

  if (!gameState) return <div>Loading...</div>;

  return (
    <div>
      <h1>Game Room: {roomId}</h1>
      <p>You are player {playerId + 1}</p>
      <Board board={gameState.board} onMove={handleMove} />
    </div>
  );
};

export default Game;