import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 22px;
`;

export const Header = styled.header`

    display: flex;
    align-items: center;
    justify-content: space-between;


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

export const ListContainer = styled.div`
    margin-top: 24px;

    header{
        margin-bottom: 8px;
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
    }

`;

export const Card = styled.div`
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
    padding: 16px;
    border-radius: 4px;
`;
