import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, IconButton } from "@chakra-ui/react";
import React, { RefObject } from "react";
import { queryCache, useMutation } from "react-query";
import { IProject } from "lib/types";
import http from "lib/http";
import { DeleteIcon } from "@chakra-ui/icons";

const removeProject = async (id: string) => {
    const { data } = await http.delete(`/api/projects/${id}`);
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
                colorScheme="red"
                aria-label="Delete"
                icon={<DeleteIcon />}
                size="xs"
                mr="2"
            />

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={(cancelRef.current as unknown as RefObject<HTMLElement>)}
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
                        <Button ref={cancelRef.current} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={onRemoveTask} ml={3} isLoading={removing}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default DeleteProjectAlert;