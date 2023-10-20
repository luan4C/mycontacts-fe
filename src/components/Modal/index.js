import PropTypes from 'prop-types';
import Button from '../Button';
import ReactPortal from '../ReactPortal';
import { Container, Overlay, Footer } from './styles';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

export default function Modal({
  danger, title, children, cancelLabel, confirmLabel, onCancel, onConfirm, visible,
  isLoading,
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);
  if (shouldRender) {
    return (
    // React portal
      <ReactPortal portalId="modal-root">
        <Overlay ref={animatedElementRef} isLeaving={!visible}>
          <Container danger={danger} isLeaving={!visible}>
            <h1>{title}</h1>
            <div className="modal-body">
              {children}
            </div>

            <Footer>
              <button onClick={onCancel} type="button" className="cancel-button" disable={isLoading}>{cancelLabel}</button>
              <Button isLoading={isLoading} onClick={onConfirm} danger={danger} type="button">{confirmLabel}</Button>
            </Footer>
          </Container>
        </Overlay>
      </ReactPortal>
    );
  }
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
  isLoading: false,
};
