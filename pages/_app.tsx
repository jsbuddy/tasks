import React from 'react';
import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core';
import { ReactQueryDevtools } from 'react-query-devtools'
import '../assets/global.css';

const App = ({ Component, pageProps }: { Component: React.FunctionComponent, pageProps: any }) => (
    <ThemeProvider>
        <ReactQueryDevtools />
        <ColorModeProvider value="dark">
            <CSSReset />
            <Component {...pageProps} />
        </ColorModeProvider>
    </ThemeProvider>
);

export default App;
