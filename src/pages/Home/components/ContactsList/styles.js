import styled, { css } from 'styled-components';

export const Header = styled.div`
    margin-top: 24px;
    margin-bottom: 8px;

    header{

        .sort-button {
            background: transparent;
            border: none;
            display: flex;
            align-items: center;

        }

        span {
            margin-right: 8px;
            font-weight: bold;
            color: ${({ theme }) => theme.colors.primary.main};
        }

        img {
            ${({ sortorder }) => sortorder === 'desc' && css`
                    transform: rotate(180deg);
            `}

            transition: transform 300ms ease-in;
        }
    }

`;

export const Card = styled.div`
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
    padding: 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between ;


    & + & {
        margin-top: 16px;
    }

    .info {
        .contact-name {
            small {
                background: ${({ theme }) => theme.colors.primary.lighter};
                color: ${({ theme }) => theme.colors.primary.main};
                font-weight: bold;
                text-transform: uppercase;
                padding: 4px;
                border-radius: 4px;
                margin-left: 8px;
            }
        }

        span {
            display: block;
            color: ${({ theme }) => theme.colors.gray[200]}
        }
    }

    .actions {
        display: flex;
        align-items: center;
        button {
            background: transparent;
            border: none;
            margin-left: 8px;
        }

    }
`;
