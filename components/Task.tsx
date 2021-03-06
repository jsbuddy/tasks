import React from "react"
import moment from "moment"
import { Box, Flex, Checkbox, Badge, Text, Spinner, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { ITask, IUpdateTask } from "lib/types"
import { queryCache, useMutation } from "react-query"
import http from "lib/http"
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons"

const updateTask = async ({ id, values }: { id: string, values: IUpdateTask }) => {
    const { data } = await http.patch(`/api/tasks/${id}`, values);
    return data;
}

const removeTask = async (id: string) => {
    const { data } = await http.delete(`/api/tasks/${id}`);
    return data;
}

const Task = ({ task }: { task: ITask }) => {
    const [update, { isLoading: updating }] = useMutation(updateTask);
    const [remove, { isLoading: removing }] = useMutation(removeTask);

    const onUpdateTask = async (values: IUpdateTask) => {
        await update({ id: task._id, values })
        queryCache.invalidateQueries(['tasks', { project: task.project }]);
    }

    const onRemoveTask = async () => {
        await remove(task._id)
        queryCache.invalidateQueries(['tasks', { project: task.project }]);
    }

    return (
        <Box
            rounded="6px"
            backgroundColor="gray.700"
            mt="4"
            px="5"
            py="6"
            key={task._id}
        >
            <Flex align="center" justify="space-between">
                <Flex align="center">
                    <Checkbox
                        mr="3"
                        isChecked={task.completed}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateTask({ completed: e.target.checked })}
                    />
                    <Text fontSize="sm">{task.name}</Text>
                    {
                        (updating || removing) && <Spinner size="xs" ml="2" />
                    }
                </Flex>

                {
                    task.completed ?
                        <Badge variant="subtle" colorScheme="green" px="2">
                            Completed
                            <CheckIcon ml="2" />
                        </Badge> :
                        <Flex align="center">
                            <Text fontSize="xs">Due:</Text>
                            <Badge variant="subtle" ml="2">
                                {moment(new Date(task.due)).from(new Date())}
                            </Badge>
                        </Flex>
                }

                <Flex align="center">
                    <Text fontSize="xs" ml="auto">Priority:</Text>
                    {
                        task.priority === 4 &&
                        <Badge variant="subtle" colorScheme="red" ml="2">
                            Urgent
                        </Badge>
                    }
                    {
                        task.priority === 3 &&
                        <Badge variant="subtle" colorScheme="yellow" ml="2">
                            High
                        </Badge>
                    }
                    {
                        task.priority === 2 &&
                        <Badge variant="subtle" colorScheme="blue" ml="2">
                            Normal
                        </Badge>
                    }
                    {
                        task.priority === 1 &&
                        <Badge variant="subtle" ml="2">
                            Low
                        </Badge>
                    }
                    <Menu>
                        <MenuButton ml="2" as={IconButton} variant="outline" aria-label="menu" size="xs" icon={<ChevronDownIcon />} />
                        <MenuList placement="bottom-end">
                            <MenuItem onClick={onRemoveTask} color="red">Remove</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box >
    )
}

export default Task
