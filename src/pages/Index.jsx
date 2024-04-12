import { useState } from "react";
import { Box, Button, Input, List, ListItem, IconButton, Text, Checkbox, VStack, Heading } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      }),
    );
  };

  return (
    <VStack p={8}>
      <Heading mb={6}>Todo App</Heading>
      <Box>
        <Input placeholder="Add a new task" value={inputValue} onChange={(e) => setInputValue(e.target.value)} size="lg" mr={2} />
        <Button onClick={handleAddTask} colorScheme="blue" px={8}>
          <FaPlus />
        </Button>
      </Box>
      <List spacing={3} mt={6} w="100%">
        {tasks.map((task) => (
          <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
            <Checkbox isChecked={task.isCompleted} onChange={() => handleToggleComplete(task.id)}>
              <Text as={task.isCompleted ? "del" : ""}>{task.text}</Text>
            </Checkbox>
            <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} colorScheme="red" aria-label="Delete task" />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Index;
