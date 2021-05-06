import Heading, { HeadingSize } from '../atomic/typography';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { host } from '../../../utils/GlobalConstants';
import { TickIcon } from '../Icons';

export default function MagicLinkSendingSuccess({ listener }) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {
    const socket = io('http://localhost:3000/');
    socket.on('connect', () => {
      console.log(socket);
    });
    socket.emit('joinRoom', listener);
    socket.on('joinRoom', (msg) => {
      console.log(msg);
    });
    socket.on('linkstatus', (message) => {
      console.log(message);
    });
  }, []);

  return (
    <div className="text-center mt-10">
      <TickIcon size={20} color="#75C85E" className="m-auto" />

      <div className="text-gray-600 text-xl mt-3 mb-2">Login Email Sent</div>
      <div className="text-gray-500 text-sm">
        Head to your inbox to continue with the authorization!
      </div>
    </div>
  );
}
