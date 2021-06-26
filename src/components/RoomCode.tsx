import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  const origin = window.location.origin;

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(`${origin}/rooms/${props.code}`);
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>

      <span>Sala #{props.code}</span>
    </button>
  );
}
