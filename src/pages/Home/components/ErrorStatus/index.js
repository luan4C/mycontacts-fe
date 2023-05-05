import Proptypes from 'prop-types';
import { Container } from './styles';
import Button from '../../../../components/Button';
import sad from '../../../../assets/images/sad.svg';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="sad" />
      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos</strong>
        <Button onClick={onTryAgain}>Tentar novamente</Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: Proptypes.func.isRequired,
};
