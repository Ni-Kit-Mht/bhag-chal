import db from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export const initializeRoom = async (roomId) => {
  const initialBoard = Array(5).fill().map(() => Array(5).fill(null));
  // Set initial positions
  initialBoard[0][2] = 'bhag'; // Top center
  initialBoard[4][0] = 'bhakra';
  initialBoard[4][1] = 'bhakra';
  initialBoard[4][3] = 'bhakra';
  initialBoard[4][4] = 'bhakra';

  await setDoc(doc(db, 'rooms', roomId), {
    players: [],
    board: initialBoard,
    currentPlayer: 0, // Bhag moves first
    createdAt: new Date().toISOString()
  });
};