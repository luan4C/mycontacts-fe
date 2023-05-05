import Proptypes from 'prop-types';
import { Container } from './styles';

export default function InputSearch({ value, onChange, placeholder }) {
  return (
    <Container>
      <input type="text" value={value} onChange={onChange} placeholder={placeholder} />
    </Container>
  );
}

InputSearch.propTypes = {
  value: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  placeholder: Proptypes.string,
};

InputSearch.defaultProps = {
  placeholder: 'Search',
};
