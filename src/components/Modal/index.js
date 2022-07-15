import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Button from '../Button';
import { Container, Overlay, Footer } from './styles';

export default function Modal({ danger }) {
  // React portal
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Titulo Modal</h1>
        <p>Corpo modal</p>

        <Footer>
          <button type="button" className="cancel-button">Cancelar</button>
          <Button danger={danger} type="button">Delete</Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
