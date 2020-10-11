import React from "react"
import moment from "moment"
import { Box, Flex, Checkbox, Badge, Text, Spinner, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/core"
import { ITask, IUpdateTask } from "lib/types"
import { queryCache, useMutation } from "react-query"
import http from "lib/http"

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
            borderColor="rgba(255, 255, 255, .1)"
            borderWidth="1px"
            borderStyle="solid"
            rounded="5px"
            mt="2"
            p="4"
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
                        <Badge variant="subtle" variantColor="green" px="2">
                            Completed
                            <Icon name="check" ml="2"></Icon>
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
                        <Badge variant="subtle" variantColor="red" ml="2">
                            Urgent
                        </Badge>
                    }
                    {
                        task.priority === 3 &&
                        <Badge variant="subtle" variantColor="yellow" ml="2">
                            High
                        </Badge>
                    }
                    {
                        task.priority === 2 &&
                        <Badge variant="subtle" variantColor="blue" ml="2">
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
                        <MenuButton ml="2">
                            <IconButton variant="outline" aria-label="menu" size="xs" icon="chevron-down" />
                        </MenuButton>
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
