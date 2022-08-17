import styled, { css } from 'styled-components';

export const Container = styled.div`
    padding: 16px 32px;
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: #fff;
    border-radius: 4px;
    box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
    & + & {
        margin-top: 12px;
    }

    display: flex;
    align-items: center;
    justify-content: center;

    img {
        margin-right: 8px;
    }

    ${({ type }) => type !== 'default'
    && css`
    background-color: ${({ theme }) => theme.colors[type].main};
    `
}
`;
