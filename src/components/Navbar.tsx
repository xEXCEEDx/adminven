// src/components/Navbar.tsx
import React from 'react';
import { Flex, Box, Text } from "@chakra-ui/react";

const Navbar: React.FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1.5rem"
      bg="gray.800"
      color="white"
    >
      <Box>
        <Text fontSize="xl" fontWeight="bold">
   
        </Text>
      </Box>
    </Flex>
  );
};

export default Navbar;
