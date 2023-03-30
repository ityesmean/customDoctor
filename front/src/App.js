import React from 'react';
import { useRecoilValue } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import router from './Router';
import GlobalStyle from './theme/GlobalStyle';
import { darkTheme, lightTheme } from './theme/theme';
import { isDarkModeAtom } from './atoms';

function App() {
  const isDarkMode = useRecoilValue(isDarkModeAtom);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
