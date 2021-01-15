import React from 'react';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import { ReactQueryDevtools } from 'react-query-devtools'
import '../assets/global.css';
import { AuthProvider } from 'lib/hooks/auth';

const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
}

const customTheme = extendTheme({ config })

const App = ({ Component, pageProps }: { Component: React.FunctionComponent, pageProps: any }) => (
    <AuthProvider>
        <ChakraProvider theme={customTheme}>
            <ReactQueryDevtools />
            <CSSReset />
            <Component {...pageProps} />
        </ChakraProvider>
    </AuthProvider>
);

export default App;
