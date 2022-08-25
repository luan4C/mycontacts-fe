import PropType from 'prop-types';

import { useEffect } from 'react';
import { Container } from './styles';
import xCircle from '../../../assets/images/icons/x-circle.svg';
import checkCircle from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({
  message, onClose,
}) {
  useEffect(() => {
    const timeoutId = setTimeout(() => onClose(message.id), message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onClose]);
  function handleCloseClick() {
    onClose(message.id);
  }
  return (
    <Container
      tabIndex={0}
      role="button"
      type={message.type}
      onClick={handleCloseClick}
    >
      {message.type === 'danger' && <img src={xCircle} alt="x circle" />}
      {message.type === 'success' && <img src={checkCircle} alt="success" />}

      <strong>
        {message.text}
      </strong>

    </Container>
  );
}

ToastMessage.propTypes = {
  onClose: PropType.func.isRequired,
  message: PropType.shape({
    id: PropType.number.isRequired,
    text: PropType.string.isRequired,
    type: PropType.oneOf(['default', 'success', 'danger']),
    duration: PropType.number,
  }).isRequired,
};
