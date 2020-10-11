import { Flex, Input, Select, Button, useToast } from "@chakra-ui/core"
import http from "lib/http"
import { ICreateTask } from "lib/types"
import React, { useState } from "react"
import { queryCache, useMutation } from "react-query"

interface IAddTaskProps {
    project: any,
    onClose: Function
}

const createTask = async (payload: ICreateTask) => {
    const { data } = await http.post('http://localhost:3001/api/tasks', payload);
    return data;
}

const AddTask = ({ project, onClose }: IAddTaskProps) => {
    const [create, { isLoading }] = useMutation(createTask);
    const toast = useToast();
    const [values, setValues] = useState<ICreateTask>({ name: '', due: '', priority: 1 })

    const onAdd = async () => {
        const valid = Object.values(values).reduce((valid, v) => {
            if (!v) valid = false;
            return valid;
        }, true)
        if (valid) {
            await create({ ...values, project: project._id });
            queryCache.invalidateQueries(['tasks', { project: project._id }]);
            setValues({ name: '', due: '', priority: 1 })
            onClose(true);
        }
        else toast({ title: "All fields are required", status: "error" })
    }

    return (
        <Flex>
            <Input
                placeholder="Task name"
                size="sm"
                value={values.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, name: e.target.value })}
            />
            <Select
                placeholder="Priority"
                ml="2"
                size="sm"
                value={values.priority}
                onChange={(e) => setValues({ ...values, priority: +e.target.value })}
            >
                <option value="1">Low</option>
                <option value="2">Normal</option>
                <option value="3">High</option>
                <option value="4">Urgent</option>
            </Select>
            <Input
                type="date"
                placeholder="Due date"
                ml="2"
                size="sm"
                value={values.due}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, due: e.target.value })}
            />
            <Button onClick={onAdd} isLoading={isLoading} variant="outline" variantColor="blue" ml="2" px="5" size="sm">Add</Button>
            <Button onClick={() => onClose()} isDisabled={isLoading} variant="outline" variantColor="red" ml="2" px="8" size="sm">Cancel</Button>
        </Flex>
    )
}

export default AddTask