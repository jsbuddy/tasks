import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react";
import React, { RefObject } from "react";
import { queryCache, useMutation } from "react-query";
import { IProject } from "lib/types";
import http from "lib/http";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const removeProject = async (id: string) => {
    const { data } = await http.delete(`/api/projects/${id}`);
    return data;
}

const DeleteProjectAlert = ({ project }: { project: IProject }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef();
    const [remove, { isLoading: removing }] = useMutation(removeProject);

    const onRemoveTask = async () => {
        await remove(project._id)
        queryCache.invalidateQueries('projects');
        router.back();
    }

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                variant="outline"
                colorScheme="red"
                aria-label="Delete"
                leftIcon={<DeleteIcon />}
                size="sm"
            >Delete project</Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={(cancelRef.current as unknown as RefObject<HTMLElement>)}
                onClose={onClose}
                isCentered
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