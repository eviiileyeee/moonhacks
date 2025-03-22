// src/components/TaskAssignment.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskAssignment = () => {
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedMember, setSelectedMember] = useState("");

  useEffect(() => {
    fetchMembers();
    fetchTasks();
  }, []);

  const fetchMembers = async () => {
    const result = await axios.get('/api/members');
    setMembers(result.data);
  };

  const fetchTasks = async () => {
    const result = await axios.get('/api/tasks');
    setTasks(result.data);
  };

  const assignTask = async () => {
    await axios.post('/api/tasks', { description: taskDescription, member: selectedMember });
    setTaskDescription("");
    setSelectedMember("");
    fetchTasks();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Task Assignment</h2>
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Task Description"
        className="border p-2 rounded"
      />
      <select
        value={selectedMember}
        onChange={(e) => setSelectedMember(e.target.value)}
        className="border p-2 rounded ml-2"
      >
        <option value="">Select Member</option>
        {members?.map((member) => (
          <option key={member._id} value={member._id}>{member.name}</option>
        ))}
      </select>
      <button onClick={assignTask} className="bg-blue-500 text-white p-2 rounded ml-2">Assign Task</button>

      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task._id} className="flex justify-between items-center p-2 border-b">
            <span>{task.description} - Assigned to: {task.member.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskAssignment;
