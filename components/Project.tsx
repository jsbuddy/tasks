import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Collapse, Text, Tab, TabList, TabPanel, TabPanels, Tabs, Container, Badge } from "@chakra-ui/react";
import http from "lib/http";
import { IProject, ITask } from "lib/types";
import { useRouter } from "next/router";
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
    const router = useRouter();
    const [showAdd, setShowAdd] = useState(false);
    const { data } = useQuery(['tasks', { project: project._id }], fetchTasks);

    if (!data) return <></>

    const pending: [] = data.filter((t: ITask) => !t.completed);
    const completed: [] = data.filter((t: ITask) => t.completed);

    return (
        <Tabs>
            <Box
                pt="10"
                backgroundColor="rgba(0, 0, 0, .2)"
                borderBottom="1px solid rgba(255, 255, 255, .05)"
            >
                <Container maxW="lg">
                    <Flex justify="space-between" mb="10">
                        <Button onClick={() => router.back()} aria-label="Search database" leftIcon={<ArrowBackIcon />} size="sm" >Projects</Button>
                        <Box>
                            <DeleteProjectAlert project={project} />
                        </Box>
                    </Flex>
                    <Text fontSize="2xl" fontWeight="600" maxWidth="500px">
                        {project.name}
                    </Text>

                    <TabList mt="10" border="0" mb="1">
                        <Tab px="0" fontWeight="500" mr="6">Pending <Badge ml="2" variant="subtle">{pending.length}</Badge></Tab>
                        <Tab px="0" fontWeight="500" mr="6">Completed <Badge ml="2" variant="subtle">{completed.length}</Badge></Tab>
                    </TabList>
                </Container>
            </Box>

            <Container maxW="lg">
                <TabPanels>
                    <TabPanel px="0" py="8">
                        <Button onClick={() => setShowAdd(v => !v)} variant="outline" colorScheme="blue" size="sm" leftIcon={<AddIcon />}>Add Task</Button>
                        <Collapse in={showAdd}>
                            <Box my="5" mt="8">
                                <AddTask project={project} onClose={() => setShowAdd(false)} />
                            </Box>
                        </Collapse>
                        {
                            data && data.length > 0 &&
                            <Box mt="5">
                                {
                                    pending.map((task: ITask) => <Task key={task._id} task={task} />)
                                }
                            </Box>
                        }
                    </TabPanel>
                    <TabPanel px="0" py="8">
                        {
                            data && data.length > 0 &&
                            <Box mt="5">
                                {
                                    completed.map((task: ITask) => <Task key={task._id} task={task} />)
                                }
                            </Box>
                        }
                    </TabPanel>
                </TabPanels>
            </Container>
        </Tabs>
    )
}

export default Project;