import React from 'react';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import { ReactQueryDevtools } from 'react-query-devtools'
import '../assets/global.css';

const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
}

const customTheme = extendTheme({ config })

const App = ({ Component, pageProps }: { Component: React.FunctionComponent, pageProps: any }) => (
    <ChakraProvider theme={customTheme}>
        <ReactQueryDevtools />
        <CSSReset />
        <Component {...pageProps} />
    </ChakraProvider>
);

export default App;
