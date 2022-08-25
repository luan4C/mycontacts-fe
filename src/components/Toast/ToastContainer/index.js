import { useCallback, useEffect, useState } from 'react';
import { toastEventManager } from '../../../services/utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);
  const removeToast = useCallback((messageId) => {
    setMessages((prev) => prev.filter((message) => message.id !== messageId));
  }, []);
  useEffect(
    () => {
      function addToast({ type, text, duration }) {
        setMessages(
          (prev) => [...prev,
            {
              id: Math.random(), type, text, duration,
            },
          ],
        );
      }
      toastEventManager.on('addtoast', addToast);
      return () => {
        toastEventManager.removeLister('addtoast', addToast);
      };
    },
    [],
  );
  return (
    <Container>
      {messages.map((mes) => (
        <ToastMessage
          key={mes.id}
          message={mes}
          onClose={removeToast}
        />
      ))}
    </Container>
  );
}
