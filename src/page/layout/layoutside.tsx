
import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Flex, Box } from '@chakra-ui/react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Flex direction="row" minH="100vh">
      <Sidebar />
      <Flex flex="1" direction="column">
        <Navbar />
        <Box flex="1" bg="gray.100" p="6">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
