import React from 'react';
import { Avatar, Container, Flex, Heading, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import ProjectsList from 'components/ProjectsList';
import { requireAuth } from 'lib/guards/require-auth';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAuth } from 'lib/hooks/auth';
import { useRouter } from 'next/router';
import { queryCache } from 'react-query';

const Home = () => {
  const { user, logout } = useAuth();
  const router = useRouter()

  const _logout = () => {
    logout();
    router.replace('/login');
    queryCache.clear();
  }

  return (
    <>
      <Container maxW="lg">
        <Flex justify="space-between" align="center" py="10">
          <Heading as="h5" size="sm" letterSpacing="2px">
            TASKS
          </Heading>
          <Menu>
            <MenuButton>
              <Flex alignItems="center">
                <Avatar name={user.name} />
                <ChevronDownIcon ml="2" />
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={_logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <ProjectsList />
      </Container>
    </>
  );
}

export default requireAuth(Home);
