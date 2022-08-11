import styled, { css } from 'styled-components';

export const Container = styled.div`
    margin-top: 22px;

`;

export const Header = styled.header`

    display: flex;
    align-items: center;
    justify-content: ${({ justifyContent }) => justifyContent};
    margin-top: 24px;
    border-bottom:  2px solid ${({ theme }) => theme.colors.gray[100]};
    padding-bottom: 16px;
    strong {
        color: #222;
        font-size: 24px;
    }

    a {
        color: ${({ theme }) => theme.colors.primary.main};
        text-decoration: none;
        font-weight: bold;
        border: 2px solid ${({ theme }) => theme.colors.primary.main};
        padding: 8px 16px ;
        border-radius: 4px;
        transition: all 0.2s ease-in;

        &:hover {
            background: ${({ theme }) => theme.colors.primary.main};
            color: #FFF
        }
    }
`;

export const ListHeader = styled.div`
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
            ${({ sortOrder }) => sortOrder === 'desc' && css`
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

export const InputSearchContainer = styled.div`

width: 100%;
input {
    width: 100%;
    background: #fff;
    border: none;
    border-radius: 25px;
    height: 50px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
    outline: 0;
    padding: 0 16px;

    &::placeholder{
        color:#bcbcbc;
    }
}
`;

export const ErrorContainer = styled.div`
    margin-top:16px;

    display: flex;

    align-items: center;

    .details {
        margin-left: 24px;

        strong {
            font-size: 22px;
            color: ${({ theme }) => theme.colors.danger.main};
            display: block;
        }

        button {
            margin-top: 8px
        }
    }
`;

export const EmptyListContainer = styled.div`

    margin-top: 16px;
    display:flex;

    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray[200]};
    strong {
        color: ${({ theme }) => theme.colors.primary.main}
    }
    p{
        margin-top: 8px;
        text-align: center;
    }
`;

export const NoContactFoundContainer = styled.div`
    margin-top: 16px;
    display: flex;
    align-items: flex-start;


    span {
        margin-left: 24px;
        color: ${({ theme }) => theme.colors.gray[200]};
        word-break: break-word;
    }
`;
