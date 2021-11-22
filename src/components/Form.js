import React from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import SignUp from './SignUp';
import SignIn from './SignIn';

export default function Form() {
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  return (
    <Box bgColor={bgColor} p={3} w="400px" boxShadow="lg" borderRadius="lg">
      <Tabs isFitted>
        <TabList>
          <Tab _focus={{ boxShadow: 'none' }}>登录</Tab>
          <Tab _focus={{ boxShadow: 'none' }}>注册</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignIn />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
