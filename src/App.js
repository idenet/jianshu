import React from 'react';
import { ChakraProvider, theme, Box } from '@chakra-ui/react';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box w="100vw" h="100vh">
        <Header />
        <Main />
      </Box>
    </ChakraProvider>
  );
}

export default App;
