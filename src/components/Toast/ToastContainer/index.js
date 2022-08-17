import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  return (
    <Container>
      <ToastMessage text="default toast" />
      <ToastMessage text="error toast" type="danger" />
      <ToastMessage text="success toast" type="success" />
    </Container>
  );
}
