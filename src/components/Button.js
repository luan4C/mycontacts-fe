import styled from 'styled-components';

export default styled.button`
    width: 100%;
    border: none;
    height: 52px;
    background-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    transition: background 0.2s ease-in;

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
`;
