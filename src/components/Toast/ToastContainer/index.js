import { useEffect, useState } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(
    () => {
      function addToast(event) {
        const { detail } = event;
        setMessages(
          (prev) => [...prev,
            { id: Math.random(), type: detail.type, text: detail.text },
          ],
        );
      }
      document.addEventListener('addtoast', addToast);
      return () => {
        document.removeEventListener('addtoast', addToast);
      };
    },
    [],
  );

  return (
    <Container>
      {messages.map((mes) => (
        <ToastMessage
          key={mes.id}
          text={mes.text}
          type={mes.type}
        />
      ))}
    </Container>
  );
}
