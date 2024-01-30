import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../Sidebar/DisSidebar';
import { app } from '../../../firebaseconfig';
import { getFirestore, collection, addDoc, serverTimestamp, query, getDocs, where, Timestamp } from 'firebase/firestore';

const Sales = () => {
  const [users, setUsers] = useState([]);
  const [newTasks, setNewTasks] = useState({}); // Use an object to store tasks for each user
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const usersCollection = await getDocs(query(collection(db, 'users')));
          const usersData = usersCollection.docs.map((doc) => ({ ...doc.data(), UID: doc.data().UID }));
          setUsers(usersData);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      

    fetchUsers();
  }, [db]);

  const handleAddTask = async (userId) => {
    try {
      const taskForUser = newTasks[userId] || '';
  
      if (taskForUser.trim() !== '') {
        const taskData = {
          Task: taskForUser,
          user: userId,
          TimeStamp: serverTimestamp(),
          status: 'ongoing'
        };
  
        await addDoc(collection(db, 'Tasks'), taskData);
        console.log('Task added successfully!');
        setNewTasks({ ...newTasks, [userId]: '' }); // Clear the text box after adding the task
        alert('Task submitted successfully!');
      } else {
        alert('Task cannot be empty.');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  const listItemStyle = {
    marginTop: '20px',
    padding: '20px',
    border: '22px solid rgb(211, 211, 211);',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    width: '335px', 
    marginRight: '50px',
    backgroundColor: 'rgb(244, 244, 244)', // Background color
    boxShadow: "2px 4px 10px 1px rgba(68, 54, 54, 0.47)"
  };
  
  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  };
  
  const buttonStyle = {
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '45px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
    marginTop: '10px',
  };
  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          
          <div class='Sales-heading'
          style={{
            boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
            margin: "20px",
            padding: "10px",
            display: "flex"
          }}    
          >
          <h2 style={{color: "lightgray", fontSize: "20px"}}>Sales Team</h2>
          </div>

          <ul className='sales-card-container' style={{display:'flex', marginTop: "28px"}}>
            {users.map((user, index) => (
              <li key={index} style={listItemStyle}>
                <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
                <input
                  type="text"
                  value={newTasks[user.UID] || ''}
                  onChange={(e) => setNewTasks({ ...newTasks, [user.UID]: e.target.value })}
                  placeholder="Enter Task"
                  style={inputStyle}
                />
                <button onClick={() => handleAddTask(user.UID)} style={buttonStyle}>
                  Add Task
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sales;
