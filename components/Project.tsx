import { AddIcon } from "@chakra-ui/icons";
import { AccordionButton, Box, AccordionIcon, AccordionPanel, Button, Flex, Collapse } from "@chakra-ui/react";
import http from "lib/http";
import { IProject, ITask } from "lib/types";
import React, { useState } from "react";
import { useQuery } from "react-query";
import AddTask from "./AddTask";
import DeleteProjectAlert from "./DeleteProjectAlert";
import Task from "./Task";

const fetchTasks = async (_: string, { project }: { project: string }) => {
    const { data } = await http.get(`/api/projects/${project}/tasks`);
    return data.data;
}

const Project = ({ project }: { project: IProject }) => {
    const [showAdd, setShowAdd] = useState(false);
    const { data } = useQuery(['tasks', { project: project._id }], fetchTasks);

    return (
        <>
            <AccordionButton rounded="5px" py="4" className="no-shadow">
                <Box flex="1" textAlign="left">
                    {project.name}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
                <Flex justify="space-between">
                    <Button onClick={() => setShowAdd(v => !v)} variant="outline" colorScheme="blue" size="xs" px="3" leftIcon={<AddIcon />}>Add Task</Button>
                    <Box>
                        <DeleteProjectAlert project={project} />
                    </Box>
                </Flex>
                <Collapse in={showAdd}>
                    <Box pt="4">
                        <AddTask project={project} onClose={() => setShowAdd(false)} />
                    </Box>
                </Collapse>
                {
                    data && data.length > 0 &&
                    <Box mt="5">
                        {
                            data.map((task: ITask) => <Task key={task._id} task={task} />)
                        }
                    </Box>
                }
            </AccordionPanel>
        </>
    )
}

export default Project;