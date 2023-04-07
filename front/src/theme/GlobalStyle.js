import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import '../style/font.css';

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
        background: ${({ theme }) => theme.bgColor};
        color: ${({ theme }) => theme.textColor};
        margin: 0 auto;
        font-family: "mainFont";
    }
`;

export default GlobalStyle;
