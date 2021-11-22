import React from 'react';
import { Box } from '@chakra-ui/react';
// import Home from './Home';
import Form from './Form';
// import Card from './Card';

export default function Main() {
  return (
    <Box
      minW="400px"
      mx="auto"
      mt="100px"
      d="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Form></Form>
    </Box>
  );
}
