import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Button, useDisclosure, Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { queryCache, useMutation } from "react-query";
import http from "lib/http";
import { AddIcon } from "@chakra-ui/icons";
import { ICreateProject } from "lib/types";

const createProject = async (values: ICreateProject) => {
    const { data } = await http.post('/api/projects', values);
    return data.data;
}

const AddProjectModal = () => {
    const [values, setValues] = useState<ICreateProject>({ name: '', deadline: '' });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [create, { isLoading }] = useMutation(createProject)

    const onAddProject = async () => {
        await create({ ...values });
        queryCache.invalidateQueries('projects');
        onClose();
    }

    return (
        <>
            <Box
                textAlign="center"
                as="button"
                rounded="5px"
                border="2px dashed rgba(255, 255, 255, .1)"
                px="5"
                pt="6"
                pb="8"
                onClick={onOpen}
            >
                <AddIcon color="grey" />
                <Text color="grey" fontWeight="600" fontSize="md" mt="1">New project</Text>
            </Box>
            <Modal onClose={onClose} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent pb={5}>
                    <ModalHeader>New Project</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pt="10">
                        <FormControl>
                            <FormLabel htmlFor="name">Project name</FormLabel>
                            <Input
                                type="text"
                                id="name"
                                value={values.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, name: e.target.value })}
                            />
                        </FormControl>
                        <FormControl mt="3">
                            <FormLabel htmlFor="name">Deadline</FormLabel>
                            <Input
                                type="date"
                                placeholder="Deadline"
                                value={values.deadline}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, deadline: e.target.value })}
                            />
                        </FormControl>
                        <Button isDisabled={values.name.length < 2} isLoading={isLoading} colorScheme="blue" onClick={onAddProject} mt="10">Create Project</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddProjectModal;