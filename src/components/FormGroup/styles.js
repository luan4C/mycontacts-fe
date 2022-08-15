import styled from 'styled-components';

export const Container = styled.div`
    & + & {
        margin-top: 16px;
    }
    small {
        margin-top: 8px;
        color: ${({ theme }) => theme.colors.danger.main};
        font-size: 12px;
        display: block;
    }

    .form-item {
        position: relative;
    }

    .loader {
        position: absolute;
        top: 18px;
        right: 16px;
    }
`;
