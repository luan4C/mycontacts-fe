import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
    from {
        /* initial styles */
        opacity: 0;
    }

    to {
        /* end styles*/
        opacity: 1;
    }
`;
const fadeOut = keyframes`
    from {
        /* initial styles */
        opacity: 1;
    }

    to {
        /* end styles*/
        opacity: 0;
    }
`;

export const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(246,245,252,0.7);
    display:flex;
    align-items: center;
    justify-content: center;
    animation: ${fadeIn} 0.3s;
    ${({ isleaving }) => isleaving && css`animation: ${fadeOut} 0.2s forwards`}
`;
