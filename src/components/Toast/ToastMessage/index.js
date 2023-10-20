import PropType from 'prop-types';

import { memo, useEffect } from 'react';
import { Container } from './styles';
import xCircle from '../../../assets/images/icons/x-circle.svg';
import checkCircle from '../../../assets/images/icons/check-circle.svg';

function ToastMessage({
  message, onClose, isLeaving, animatedElementRef,
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
      isLeaving={isLeaving}
      ref={animatedElementRef}
    >
      {message.type === 'danger' && <img src={xCircle} alt="x circle" />}
      {message.type === 'success' && <img src={checkCircle} alt="success" />}

      <strong>
        {message.text}
      </strong>

    </Container>
  );
}
export default memo(ToastMessage);
ToastMessage.propTypes = {
  onClose: PropType.func.isRequired,
  animatedElementRef: PropType.shape().isRequired,
  isLeaving: PropType.bool.isRequired,
  message: PropType.shape({
    id: PropType.number.isRequired,
    text: PropType.string.isRequired,
    type: PropType.oneOf(['default', 'success', 'danger']),
    duration: PropType.number,
  }).isRequired,
};
