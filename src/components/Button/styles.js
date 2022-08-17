import styled, { css } from 'styled-components';

export const StyledButton = styled.button`

    border: none;
    height: 52px;
    background-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
    border-radius: 4px;
    font-size: 16px;
    padding: 0 16px;
    font-weight: bold;
    color: #fff;
    transition: background 0.2s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover{
        background-color: ${({ theme }) => theme.colors.primary.light};;
    }
    &:active{
        background-color: ${({ theme }) => theme.colors.primary.dark};;
    }
    &[disabled] {
        background-color: #ccc;
        cursor: default;
    }

    ${({ theme, danger }) => danger && css`
        background: ${theme.colors.danger.main};

        &:hover{
        background-color: ${theme.colors.danger.light};;
    }
    &:active{
        background-color: ${theme.colors.danger.dark};;
    }
    `}

`;
