import React from 'react';
import { Container, Flex, Heading } from '@chakra-ui/react';
import AddProjectModal from 'components/AddProjectModal';
import ProjectsList from 'components/ProjectsList';

export default function Home() {
  return (
    <>
      <Container maxW="lg" py="10">
        <Flex justify="space-between" align="center">
          <Heading as="h5" size="sm" letterSpacing="2px">
            TASKS
          </Heading>
          <AddProjectModal />
        </Flex>
        <ProjectsList />
      </Container>
    </>
  );
}
