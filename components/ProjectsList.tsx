import { useQuery } from "react-query";
import { Text, Box, Flex, Spinner, Progress, Tag, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { IProject } from "lib/types";
import http from "lib/http";
import { useRouter } from "next/router";

const fetchProjects = async () => {
    const { data } = await http.get('/api/projects');
    return data.data;
};

const ProjectsList = () => {
    const router = useRouter()
    const { data, isLoading: loading } = useQuery('projects', fetchProjects);

    if (loading) return (
        <Flex justify="center" align="center" py="10" my="10">
            <Spinner color="red.500" />
        </Flex>
    )

    if (data) return (
        <>
            <SimpleGrid my="10" columns={[1, 3]} gap={6}>
                {
                    data.map((project: IProject) => {
                        const { pendingTasksCount, completedTasksCount } = project;
                        const totalTasks = pendingTasksCount + completedTasksCount
                        const progress = totalTasks ? Math.round((completedTasksCount / totalTasks) * 100) : 0;
                        let color = 'grey.700';
                        if (progress > 0 && progress < 39) color = 'red'
                        if (progress > 39 && progress < 99) color = 'orange'
                        if (progress === 100) color = 'green'
                        return (
                            <Box
                                textAlign="left"
                                as="button"
                                borderWidth="0"
                                rounded="5px"
                                backgroundColor="gray.700"
                                key={project._id}
                                px="5"
                                pt="6"
                                pb="8"
                                onClick={() => { router.push(`/project/${project._id}`) }}
                            >
                                <Text fontWeight="bold" fontSize="md">{project.name}</Text>
                                <Flex justifyContent="space-between" alignItems="center">
                                    <Text color="darkgrey" fontSize="sm">{project.deadline || "No deadline"}</Text>
                                    <Tag size="sm">{completedTasksCount}/{totalTasks}</Tag>
                                </Flex>
                                <Progress value={progress} colorScheme={color} rounded="10px" size="sm" mt="10" />
                            </Box>
                        )
                    })
                }
            </SimpleGrid>
        </>
    )

    return <></>
}

export default ProjectsList;