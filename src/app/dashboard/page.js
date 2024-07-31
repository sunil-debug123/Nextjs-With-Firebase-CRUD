'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/auth';
import { getFirestore, collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import ProtectedRoute from '@/components/ProtectedRoute';
import SuccessModal from '@/components/SuccessModal';
import ErrorModal from '@/components/ErrorModal';
import Loader from '@/components/Loader';

const db = getFirestore();

function DashboardPage() {
  const router = useRouter();
  const { signOut, authUser } = useAuth();
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null); // State to manage which todo is being edited
  const [editText, setEditText] = useState(''); // State to manage the text of the todo being edited
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // State for managing loading status

  useEffect(() => {
    const user = authUser;
    if (user) {
      setLoading(true); // Start loading when fetching data
      const unsubscribe = onSnapshot(
        query(collection(db, 'todos'), where('userId', '==', user.uid)),
        (snapshot) => {
          const todosList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setTodos(todosList);
          setLoading(false); // Stop loading once data is fetched
        },
        (error) => {
          setLoading(false); // Stop loading on error
          setErrorMessage('Fetching todos error');
          setErrorModalOpen(true);
        }
      );

      return () => {
        unsubscribe();
        setLoading(false); // Stop loading on unmount
      };
    }
  }, [authUser]);


  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      router.push('/login');
    } catch (error) {
      setErrorMessage('Sign out error');
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async () => {
    if (todo.trim() === '') return;
    try {
      setLoading(true);
      const user = authUser;
      if (user) {
        await addDoc(collection(db, 'todos'), { text: todo, userId: user.uid });
        setTodo('');
        setSuccessMessage('To-do added successfully!');
        setSuccessModalOpen(true);
      } else {
        setErrorMessage('User not authenticated');
        setErrorModalOpen(true);
      }
    } catch (error) {
      setErrorMessage('Add todo error');
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'todos', id));
      setSuccessMessage('To-do deleted successfully!');
      setSuccessModalOpen(true);
    } catch (error) {
      setErrorMessage('Delete todo error');
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSaveEdit = async () => {
    if (editText.trim() === '') return;
    try {
      setLoading(true);
      await updateDoc(doc(db, 'todos', editId), { text: editText });
      setEditId(null); // Clear the edit state
      setEditText('');
      setSuccessMessage('To-do updated successfully!');
      setSuccessModalOpen(true);
    } catch (error) {
      setErrorMessage('Update todo error');
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    setSuccessMessage('');
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
    setErrorMessage('');
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      {loading && <Loader />} {/* Display loader during operations */}

      <button
        onClick={handleSignOut}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
      >
        Sign Out
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Crud App</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">To-Do List</h2>
        <div className="flex mb-4">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="border border-gray-300 rounded-md p-2 flex-grow"
            placeholder="Add a new to-do"
            required
          />
          <button
            onClick={handleAddTodo}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
          >
            Add
          </button>
        </div>
        {editId && (
          <div className="flex mb-4">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="border border-gray-300 rounded-md p-2 flex-grow"
              placeholder="Edit to-do"
            />
            <button
              onClick={handleSaveEdit}
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400"
            >
              Save
            </button>
          </div>
        )}
        <table className="w-full bg-white rounded-lg shadow-md border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 text-left">To-Do</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(({ id, text }) => (
              <tr key={id}>
                <td className="p-2 border-t">{text}</td>
                <td className="p-2 border-t text-right">
                  <button
                    onClick={() => handleStartEdit(id, text)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(id)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SuccessModal isOpen={successModalOpen} message={successMessage} onClose={handleCloseSuccessModal} />
      <ErrorModal isOpen={errorModalOpen} message={errorMessage} onClose={handleCloseErrorModal} />
    </div>
  );
}

export default ProtectedRoute(DashboardPage);