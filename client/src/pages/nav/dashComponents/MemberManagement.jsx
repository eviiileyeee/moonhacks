// src/components/MemberManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const result = await axios.get('/api/members'); // Make sure the backend API is set up properly
    setMembers(result.data);
  };

  const addMember = async () => {
    await axios.post('/api/members', { name: newMember });
    setNewMember("");
    fetchMembers();
  };

  const removeMember = async (id) => {
    await axios.delete(`/api/members/${id}`);
    fetchMembers();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Member Management</h2>
      <input
        type="text"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        placeholder="Add new member"
        className="border p-2 rounded"
      />
      <button onClick={addMember} className="bg-blue-500 text-white p-2 rounded ml-2">Add Member</button>

      <ul className="mt-4">
        {members?.map((member) => (
          <li key={member?._id} className="flex justify-between items-center p-2 border-b">
            <span>{member?.name}</span>
            <button onClick={() => removeMember(member?._id)} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberManagement;
