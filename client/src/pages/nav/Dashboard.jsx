// src/components/Dashboard.jsx
import React from 'react';
import MemberManagement from './dashComponents/MemberManagement';
import TaskAssignment from './dashComponents/TaskAssignment';


const Dashboard = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <MemberManagement />
      </div>
      <div className="flex-1">
        <TaskAssignment />
      </div>
    </div>
  );
};

export default Dashboard;
