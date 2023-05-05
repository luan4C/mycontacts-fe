import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { Container } from './styles';

export default function Header({ hasError, qtyOfContacts, qtyOfFilteredContacts }) {
  // eslint-disable-next-line no-nested-ternary
  const alignment = hasError ? 'flex-end' : (qtyOfContacts > 0 ? 'space-between' : 'center');

  return (

    <Container
      justifyContent={alignment}
    >
      { (!hasError && qtyOfContacts > 0)
        && (
        <strong>
          {qtyOfFilteredContacts}
          {qtyOfFilteredContacts === 1 ? ' contato' : ' contatos'}
        </strong>
        )}

      <Link to="/new">Novo contato</Link>
    </Container>
  );
}

Header.propTypes = {

  hasError: Proptypes.bool.isRequired,
  qtyOfContacts: Proptypes.number.isRequired,
  qtyOfFilteredContacts: Proptypes.number.isRequired,
};
