import { useQuery } from "react-query";
import { Accordion, AccordionItem, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import Project from "./Project";
import { IProject } from "lib/types";
import http from "lib/http";

const fetchProjects = async () => {
    const { data } = await http.get('/api/projects');
    return data.data;
};

const ProjectsList = () => {
    const { data, isLoading: loading } = useQuery('projects', fetchProjects);

    if (loading) return (
        <Flex justify="center" align="center" py="10">
            <Spinner color="red.500" />
        </Flex>
    )

    if (data) return (
        <>
            <Accordion my="10">
                {
                    data.map((project: IProject) => (
                        <AccordionItem
                            borderColor="rgba(255, 255, 255, .1)"
                            borderWidth="1px"
                            borderStyle="solid"
                            rounded="5px"
                            mb="4"
                            backgroundColor="gray.900"
                            key={project._id}
                        >
                            <Project project={project} />
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </>
    )

    return <></>
}

export default ProjectsList;