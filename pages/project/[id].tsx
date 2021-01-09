import { useRouter } from 'next/router'
import http from "lib/http";
import { useQuery } from 'react-query';
import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import Project from "../../components/Project";

const fetchProjects = async (_: string, id: string) => {
    const { data } = await http.get(`/api/projects/${id}`);
    return data.data;
};

const Default = () => {
    const router = useRouter()
    const { id } = router.query
    const { data, isLoading: loading } = useQuery(['projects', id], fetchProjects);
    console.log({ loading, data });

    if (loading) return (
        <Flex justify="center" align="center" py="10" my="10">
            <Spinner color="red.500" />
        </Flex>
    )

    if (data) {
        return (
            <Project project={data} />
        )
    }

    return ''

}

export default Default