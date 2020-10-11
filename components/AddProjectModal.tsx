import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Button, useDisclosure } from "@chakra-ui/core";
import React, { useState } from "react";
import axios from "axios";
import { queryCache, useMutation } from "react-query";

const createProject = async ({ name }: { name: string }) => {
    const { data } = await axios.post('http://localhost:3001/api/projects', { name });
    return data.data;
}

const AddProjectModal = () => {
    const [name, setName] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [create, { isLoading }] = useMutation(createProject)

    const onAddProject = async () => {
        await create({ name });
        queryCache.invalidateQueries('projects');
        setName('');
        onClose();
    }

    return (
        <>
            <Button leftIcon="add" variantColor="blue" variant="outline" onClick={onOpen}>New Project</Button>
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
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            />
                        </FormControl>
                        <Button isDisabled={name.length < 2} isLoading={isLoading} variantColor="blue" onClick={onAddProject} mt="10">Create Project</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddProjectModal;