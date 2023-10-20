import PropTypes from 'prop-types';
import { Overlay } from './styles';
import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';
import useAnimatedUnMount from '../../hooks/useAnimatedUnmount';

export default function Loader({ isLoading }) {
  const { shouldRender, animatedElementRef } = useAnimatedUnMount(isLoading);
  if (!shouldRender) {
    return null;
  }
  let container = document.getElementById('loader-root');
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'loader-root');
    document.body.appendChild(container);
  }

  return (
    <ReactPortal portalId="loader-root">
      <Overlay isLeaving={isLoading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>

  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
