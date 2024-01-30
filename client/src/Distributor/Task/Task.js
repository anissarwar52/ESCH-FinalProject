import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar/DisSidebar';
import Navbar from '../Components/navbar/Navbar';
import { app } from '../../firebaseconfig';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import Modal from 'react-modal';
import TaskMap from './TaskMap';
import './Task.css'

export default function Task() {
  const db = getFirestore(app);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [shops, setShops] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedShopLocation, setSelectedShopLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUserData = async (task) => {
    try {
      console.log('Fetching user data for UID:', task.user);

      const userQuery = query(collection(db, 'users'), where('UID', '==', task.user));
      const userCollection = await getDocs(userQuery);

      console.log('USER DOC: ', userCollection);

      if (userCollection.docs.length === 0) {
        console.log('No user found for UID:', task.user);
        return { ...task, userData: null };
      }

      const userData = userCollection.docs[0].data();
      console.log('DATA: ', userData);

      return { ...task, userData };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return { ...task, userData: null };
    }
  };

  const fetchTasksWithUserData = async () => {
    try {
      const tasksCollection = await getDocs(collection(db, 'Tasks'));
      const tasksData = tasksCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const tasksWithUserData = [];
      for (const task of tasksData) {
        const taskWithUserData = await fetchUserData(task);
        tasksWithUserData.push(taskWithUserData);
      }

      console.log('tasksWithUserData:', tasksWithUserData);
      setTasks(tasksWithUserData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTasksWithUserData();
  }, [db]);

  const fetchShopsForTask = async (taskId) => {
    try {
      const shopsQuery = query(collection(db, 'Shops'), where('taskId', '==', taskId));
      const shopsCollection = await getDocs(shopsQuery);

      const shopsData = shopsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      if (shopsData.length === 0) {
        const allShopsCollection = await getDocs(collection(db, 'Shops'));
        const allShopsData = allShopsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setShops(allShopsData.filter((shop) => shop.taskId === taskId));
      } else {
        setShops(shopsData);
      }

      setModalIsOpen(true);
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openMapForShop = (shop) => {
    const { latitude, longitude } = shop.location;
    setSelectedShopLocation({ latitude, longitude });
    setModalIsOpen(true);
  };

  const handleCloseMap = () => {
    setSelectedShopLocation(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    const assignedTo = task.userData?.name || '';
    return assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <h2 style={headingStyle}>Tasks</h2>
          <input
            type="text"
            placeholder="Search by Assigned To"
            value={searchQuery}
            onChange={handleSearchChange}
            style={searchBarStyle}
          />
          <ul style={listStyle}>
            {filteredTasks.map((task) => (
              <li key={task.id} onClick={() => fetchShopsForTask(task.id)} style={taskItemStyle}>
                {task.userData ? (
                  <div style={taskInfoStyle}>
                    <div>
                      <strong>Task:</strong> {task.Task}
                    </div>
                    <div>
                      <strong>Assigned To:</strong> {task.userData?.name}
                    </div>
                    <div>
                      <strong>Time:</strong> {new Date(task.TimeStamp.toDate()).toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <div>Loading...</div>
                )}
              </li>
            ))}
          </ul>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Shops Modal"
            style={modalStyle}
            overlayStyle={overlayStyle}
          >
            <h2 style={modalHeadingStyle}>Shops {selectedTask?.Task}</h2>
            <ul style={modalListStyle}>
              {shops.map((shop) => (
                <li key={shop.id} style={modalListItemStyle}>
                  {shop.name} - {shop.address}
                  <button className='viewMapBtn' onClick={() => openMapForShop(shop)}>View Map</button>
                  {selectedShopLocation && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="bg-white p-4 rounded shadow-md">
                        <button className='viewMapBtn2' style={{marginLeft:'300px'}} onClick={handleCloseMap}>
                          Close Map
                        </button>
                        <TaskMap officer={selectedShopLocation} />
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <button style={closeButtonStyle} onClick={closeModal}>
              Close
            </button>
          </Modal>
        </div>
      </div>
    </>
  );
}

const headingStyle = {
  marginTop: '20px',
  marginLeft: '20px',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '15px',
};

const searchBarStyle = {
  marginLeft: '5px',
  padding: '8px',
  marginBottom: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
};

const taskInfoStyle = {
  marginBottom: '10px',
  padding: '10px',
  backgroundColor: '#e0e0e0',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const taskItemStyle = {
  cursor: 'pointer',
  padding: '10px',
  marginBottom: '10px',
  backgroundColor: '#f0f0f0',
  borderRadius: '5px',
};

const modalStyle = {
  content: {
    width: '50%',
    margin: 'auto',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

const overlayStyle = {
  background: 'rgba(0, 0, 0, 0.5)',
};

const modalHeadingStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#333',
};

const modalListStyle = {
  listStyleType: 'none',
  padding: 0,
};

const modalListItemStyle = {
  marginBottom: '15px',
  padding: '10px',
  backgroundColor: '#f8f8f8',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const closeButtonStyle = {
  backgroundColor: 'rgb(219, 52, 52)',
  color: '#fff',
  padding: '12px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  marginTop: '20px',
};
