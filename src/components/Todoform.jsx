import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

const TodoForm = () => {
  const [newTask, setNewTask] = useState('')
  const [todoArray, setTodoArray] = useState(() => {
    const storedTasks = localStorage.getItem('Todo-List')
    return storedTasks ? JSON.parse(storedTasks) : []
  })
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    localStorage.setItem('Todo-List', JSON.stringify(todoArray))
  }, [todoArray])

  function handleChange(e) {
    setNewTask(e.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setTodoArray([...todoArray, { title: newTask, completed: false }])
    setNewTask('')
  }

  function handleRemoveTask(index) {
    const newTasks = todoArray.filter((task, i) => i !== index)
    setTodoArray(newTasks)
  }

  function handleToggleChange(index) {
    const newTasks = [...todoArray]
    newTasks[index] = { ...newTasks[index], completed: !newTasks[index].completed }
    setTodoArray(newTasks)
  }

  function handleEditTask(index) {
    setEditingTask(index)
  }

  function handleSaveTask(index) {
    const newTasks = [...todoArray]
    newTasks[index] = { ...newTasks[index], title: document.getElementById(`task-${index}`).value }
    setTodoArray(newTasks)
    setEditingTask(null)
  }

  return (
    <>
      <Box mt='5px'>
        <FormControl display='flex' gap={'2px'}>
          <Box>
            <Input type="text" placeholder="title of task" onChange={handleChange} value={newTask} name='title' />
          </Box>
          <Box>
            <Button onClick={handleSubmit} colorScheme='teal'>Submit</Button>
          </Box>
        </FormControl>
      </Box>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>Sr.no</Th>
              <Th>Completed</Th>
              <Th>Task</Th>
              <Th>Remove Task</Th>
              <Th>Edit Task</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todoArray.map((task, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td style={{ textAlign: "center" }}>
                  {/* Using Chakra UI's Checkbox */}
                  <Checkbox isChecked={task.completed} onChange={() => handleToggleChange(index)} />
                </Td>
                {/* Use Chakra UI's `textDecoration` to style the completed task */}
                <Td textDecoration={task.completed ? 'line-through' : 'none'}>
                  {editingTask === index ? (
                    <Input
                      id={`task-${index}`}
                      type="text"
                      value={task.title}
                      onChange={(e) => {
                        const newTasks = [...todoArray]
                        newTasks[index] = { ...newTasks[index], title: e.target.value }
                        setTodoArray(newTasks)
                      }}
                    />
                  ) : (
                    task.title
                  )}
                </Td>
                <Td>
                  <Button className="delete-button" colorScheme="red" onClick={() => handleRemoveTask(index)}>Delete</Button>
                </Td>
                <Td>
                  {editingTask === index ? (
                    <Button onClick={() => handleSaveTask(index)}>Save</Button>
                  ) : (
                    <Button onClick={() => handleEditTask(index)}>Edit</Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}

export default TodoForm