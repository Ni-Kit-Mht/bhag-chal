import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import db from './firebase';
import { initializeRoom } from './init-firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const WaitingRoom = () => {
  const [roomId, setRoomId] = useState('');
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const createRoom = async () => {
      try {
        const newRoomId = Math.random().toString(36).substr(2, 9);
        setRoomId(newRoomId);
        await initializeRoom(newRoomId);
        
        const roomRef = doc(db, 'rooms', newRoomId);
        const unsubscribe = onSnapshot(roomRef, (snapshot) => {
          const data = snapshot.data();
          if (!data) return;
          
          if (data.players.length === 2) {
            navigate(`/game/${newRoomId}`);
          }
          setPlayers(data.players);
        });

        return () => unsubscribe();
      } catch (err) {
        setError('Failed to create room. Please try again.');
        console.error('Room creation error:', err);
      }
    };

    createRoom();
  }, [navigate]);

  return (
    <div className="waiting-room">
      <h1>Waiting Room</h1>
      {error && <p className="error">{error}</p>}
      <p>Share this link: {window.location.origin}/game/{roomId}</p>
      <div className="player-status">
        Players joined: {players.length}/2
        {players.length < 2 && <div className="loader" />}
      </div>
    </div>
  );
};

export default WaitingRoom;