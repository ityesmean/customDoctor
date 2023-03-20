import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
        background: ${({ theme }) => theme.bgColor};
        color: ${({ theme }) => theme.textColor};
        margin: 0 auto,
    }
`;

export default GlobalStyle;
