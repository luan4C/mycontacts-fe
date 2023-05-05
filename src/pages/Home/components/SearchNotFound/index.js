import Proptypes from 'prop-types';
import { Container } from './styles';
import magnifierQuestion from '../../../../assets/images/icons/magnifier-question.svg';

export default function SearchNotFound({ searchTerm }) {
  return (

    <Container>
      <img src={magnifierQuestion} alt="magnifier" />
      <span>
        Nenhum contato encontrado para
        {' '}
        <strong>
          &ldquo;
          {searchTerm}
          &ldquo;
        </strong>
      </span>
    </Container>
  );
}
SearchNotFound.propTypes = {
  searchTerm: Proptypes.string.isRequired,
};
