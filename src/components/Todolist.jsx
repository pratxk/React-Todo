import { Box, Button, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

const Todolist = ({ data }) => {

    function handleRemoveTask(index) {
        const newTasks = data.filter((task, i) => i !== index);
        setTasks(newTasks);
    }

    function handleToggleChange(index) {
        const newTasks = [...data];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    }
    return (
        <>
            <Box>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Sr.no</Th>
                            <Th>Completed</Th>
                            <Th>Task</Th>
                            <Th>Remove Task</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((task, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td style={{ textAlign: "center" }}>
                                    <Input type="checkbox" checked={task.completed} onChange={() => handleToggleChange(index)} />
                                </Td>
                                <Td className={task.completed ? 'completed' : ''}>
                                    {task.title}
                                </Td>
                                <Td>
                                    <Button className="delete-button" onClick={() => handleRemoveTask(index)}>Delete</Button>
                                </Td>
                            </Tr>
                        ))}

                    </Tbody>
                </Table>
            </Box>
        </>
    )
}

export default Todolist