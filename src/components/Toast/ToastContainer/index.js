import { useEffect } from 'react';
import { toastEventManager } from '../../../services/utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';
import useAnimatedList from '../../../hooks/useAnimatedList';

export default function ToastContainer() {
  const {
    setItems, handleRemove, renderList,
  } = useAnimatedList();

  useEffect(
    () => {
      function addToast({ type, text, duration }) {
        setItems(
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
    [setItems],
  );

  return (
    <Container>
      {renderList((mes, { isLeaving, animatedElementRef }) => (
        <ToastMessage
          key={mes.id}
          message={mes}
          onClose={handleRemove}
          isLeaving={isLeaving}
          animatedElementRef={animatedElementRef}
        />
      ))}
    </Container>
  );
}
