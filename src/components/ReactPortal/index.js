import PropTypes from 'prop-types';
import ReactDom from 'react-dom';

export default function ReactPortal({ portalId, children }) {
  let container = document.getElementById(portalId);
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', portalId);
    document.body.appendChild(container);
  }
  return (
    ReactDom.createPortal(
      children,
      container,
    )
  );
}

ReactPortal.propTypes = {
  portalId: PropTypes.string,
  children: PropTypes.node.isRequired,
};
ReactPortal.defaultProps = {
  portalId: 'portal-root',
};
