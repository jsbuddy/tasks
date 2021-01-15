import { Box, Button, Container, Flex, Heading, Input, SimpleGrid, Stack, Text, useToast, Link } from '@chakra-ui/react'
import CompletedTasks from 'components/svgs/CompletedTasks'
import { useAuth } from 'lib/hooks/auth'
import http from 'lib/http'
import { IAuthResponse, ILogin } from 'lib/types'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import NextLink from 'next/link'
import { requireNoAuth } from 'lib/guards/require-no-auth'

const loginMutation = async (values: ILogin): Promise<IAuthResponse> => {
    const { data } = await http.post('/api/user/login', values)
    return data;
}

const Login = () => {
    const [register, { isLoading }] = useMutation<IAuthResponse, any, ILogin>(loginMutation, { throwOnError: true })
    const [values, setValues] = useState<ILogin>({ email: '', password: '' })
    const toast = useToast();
    const { authenticate } = useAuth();
    const router = useRouter();

    const onRegister = async () => {
        const valid = Object.values(values).reduce((valid, v) => {
            if (!v) valid = false;
            return valid;
        }, true);
        if (!valid) return toast({ title: "All fields are required", status: "error" });
        try {
            const data = await register(values);
            authenticate({ user: data!.data, token: data?.token })
            router.replace('/');
        } catch (error) {
            const _default = 'An error occured, please try again';
            if (typeof error.response.data == 'string') toast({ title: error.response.data || _default, status: "error" });
            else toast({ title: error.response.data.message || _default, status: "error" });
        }
    }

    return (
        <>
            <Container maxW="xl" py="10" height="100vh">
                <Flex alignItems="center" minH="100%">
                    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} width="100%">
                        <Flex flexDirection="column" alignItems="center" justifyContent="center" py="10">
                            <CompletedTasks width={350} />
                            <Box height="70px" />
                            <Heading size="lg">Work anywhere easily</Heading>
                            <Text mt="7" textAlign="center" maxW="300px" opacity=".7">Manage your projects easily from anywhere</Text>
                        </Flex>
                        <Flex flexDirection="column" justifyContent="center" maxW="500px">
                            <Heading size="xl" mb="3">Login</Heading>
                            <Text>Login to your account or <NextLink href="/register"><Link color="royalblue">Sign up here</Link></NextLink> if you don't have an account</Text>
                            <Box height="70px" />
                            <form>
                                <Stack spacing={6}>
                                    <Input
                                        type="email"
                                        variant="filled"
                                        placeholder="Email address"
                                        size="lg"
                                        disabled={isLoading}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, email: e.target.value })}
                                        autoComplete="email"
                                    />
                                    <Input
                                        type="password"
                                        variant="filled"
                                        placeholder="Password"
                                        size="lg"
                                        disabled={isLoading}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, password: e.target.value })}
                                        autoComplete="new-password"
                                    />
                                </Stack>
                            </form>
                            <Box height="70px" />
                            <div>
                                <Button onClick={onRegister} isLoading={isLoading} colorScheme="blue" size="lg">Login</Button>
                            </div>
                        </Flex>
                    </SimpleGrid>
                </Flex>
            </Container>
        </>
    )
}

export default requireNoAuth(Login)