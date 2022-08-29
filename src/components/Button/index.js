import PropTypes from 'prop-types';
import { StyledButton } from './styles';
import Spinner from '../Spinner';

export default function Button({
  children, isLoading, disabled, type, danger, onClick,
}) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading} danger={danger} onClick={onClick}>
      { isLoading
        ? <Spinner size={16} /> : children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  isLoading: false,
  disabled: false,
  type: 'button',
  danger: false,
  onClick: null,
};
