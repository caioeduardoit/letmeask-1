import { Link, useHistory } from 'react-router-dom';
import { useState, FormEvent } from 'react';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

export function NewRoom() {
  const history = useHistory();
  const { user } = useAuth();
  const [newRoomName, setNewRoomName] = useState('');

  async function handleCreatRoom(e: FormEvent) {
    e.preventDefault();

    if(newRoomName.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoomName,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div className='page-auth'>
      <aside>
        <img src={illustrationImg} alt='Ilustração simbolizando perguntas e respostas' />
        <div className="app-copy">
          <strong>Crie salas de Q&amp;A ao-vivo</strong>
          <p>Tire as dúvidas da sua audiência em tempo-real</p>
        </div>
      </aside>

      <main>
        <div className='main-content'>
          <img src={logoImg} alt='Letmeask' />

          <h2>Criar uma nova sala</h2>

          <form onSubmit={(e) => handleCreatRoom(e)}>
            <input
              type='text'
              placeholder='Nome da sala'
              onChange={e => setNewRoomName(e.target.value)}
              value={newRoomName}
            />

            <Button type='submit'>
              Criar sala
            </Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to='/'>Clique aqui</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}