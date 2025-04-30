import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

const client = new Client({
  webSocketFactory: () => new SockJS('http://localhost:8089/ws'),
  debug: (str) => console.log(str),
});

client.onConnect = () => {
  console.log('Connected');
  client.subscribe('/queue/messages', (message) => {
    console.log('Received:', message.body);
  });
  client.publish({
    destination: '/app/private',
    body: JSON.stringify({
      content: 'Test message',
      sender: { id: 1 },
      receiver: { id: 2 },
    }),
  });
};

client.onStompError = (frame) => {
  console.error('STOMP error:', frame);
};

client.activate();
