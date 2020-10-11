import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, IconButton } from "@chakra-ui/core";
import React from "react";
import axios from "axios";
import { queryCache, useMutation } from "react-query";
import { IProject } from "lib/types";

const removeProject = async (id: string) => {
    const { data } = await axios.delete(`http://localhost:3001/api/projects/${id}`);
    return data;
}

const DeleteProjectAlert = ({ project }: { project: IProject }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef();
    const [remove, { isLoading: removing }] = useMutation(removeProject);

    const onRemoveTask = async () => {
        await remove(project._id)
        queryCache.invalidateQueries('projects');
    }

    return (
        <>
            <IconButton
                onClick={() => setIsOpen(true)}
                variant="outline"
                variantColor="red"
                aria-label="Delete"
                icon="delete"
                size="xs"
                mr="2"
            />

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Project
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variantColor="red" onClick={onRemoveTask} ml={3} isLoading={removing}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default DeleteProjectAlert;