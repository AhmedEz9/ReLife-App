import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [myItems, setMyItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // State variables for Editing
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Fetch the user's real profile data and their items
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); 
          return;
        }

        const userRes = await fetch('http://localhost:5000/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const userData = await userRes.json();
        setUser(userData);

        const postsRes = await fetch('http://localhost:5000/api/upload/my-posts', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!postsRes.ok) throw new Error('Failed to fetch posts');
        const postsData = await postsRes.json();
        setMyItems(postsData);

      } catch (err) {
        console.error("Error fetching profile:", err);
        setError('Failed to load profile data. Please try logging in again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  // LOGOUT!
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');  
    navigate('/login');               
  };

  // DELETE ITEM!
  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) return alert("You must be logged in to do this.");
      
      const response = await fetch(`http://localhost:5000/api/upload/${itemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` } 
      });

      if (response.ok) {
        setMyItems(prevItems => prevItems.filter(item => item.id !== itemId));
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete item.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Server error while deleting.");
    }
  };

  // --- EDIT FUNCTIONS ---
  // When the user clicks the edit icon
  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description || '');
  };

  // When the user cancels editing
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  // When the user clicks save
  const handleSaveEdit = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert("You must be logged in to do this.");

      const response = await fetch(`http://localhost:5000/api/upload/${itemId}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: editTitle, description: editDescription })
      });

      if (response.ok) {
        // Update the item in React state so the UI updates instantly
        setMyItems(prevItems => prevItems.map(item => 
          item.id === itemId ? { ...item, title: editTitle, description: editDescription } : item
        ));
        setEditingId(null); 
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update item.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Server error while updating.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full relative">
      <div className="fixed top-20 right-10 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 z-0 pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 z-0 pointer-events-none"></div>

      <div className="relative z-10 space-y-8 animate-fade-in-up">
        
        {/* Profile Header Card */}
        {user && (
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-extrabold shadow-lg border-4 border-white uppercase">
              {user.username.charAt(0)}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-gray-800">{user.username}</h2>
              <p className="text-gray-500 font-medium">{user.email}</p>
              <div className="mt-3 inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-bold rounded-full border border-green-200">
                Active Recycler
              </div>
            </div>
            <div className="md:ml-auto mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
               <Link to="/upload" className="px-6 py-3 bg-white text-emerald-600 border border-emerald-200 font-bold rounded-xl shadow-sm hover:bg-emerald-50 transition-all text-center">
                  + Share New Item
               </Link>
               <button onClick={handleLogout} className="px-6 py-3 bg-red-50 text-red-600 border border-red-100 font-bold rounded-xl shadow-sm hover:bg-red-100 transition-all">
                  Logout
               </button>
            </div>
          </div>
        )}

        {/* My Items Section */}
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">My Uploaded Items</h3>
          
          {error && <p className="text-red-500 font-medium mb-4">{error}</p>}
          
          {myItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">You haven't shared any items yet.</p>
              <Link to="/upload" className="text-emerald-600 font-bold hover:underline">Start recycling now</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myItems.map(item => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col">
                  
                  <div className="h-48 overflow-hidden relative shrink-0">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    
                    {/* Check if this item is the one being edited */}
                    {editingId === item.id ? (
                      <div className="space-y-3 mb-4">
                        <input 
                          type="text" 
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 font-bold text-gray-800"
                        />
                        <textarea 
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-600 resize-none h-20"
                          placeholder="Description..."
                        />
                        <div className="flex space-x-2">
                          <button onClick={() => handleSaveEdit(item.id)} className="flex-1 bg-green-500 text-white py-1.5 rounded-lg font-bold hover:bg-green-600 transition">Save</button>
                          <button onClick={handleCancelEdit} className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded-lg font-bold hover:bg-gray-300 transition">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4">
                          <h4 className="font-bold text-gray-800 truncate mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-500 line-clamp-2">{item.description || "No description."}</p>
                        </div>
                        
                        <div className="flex justify-end space-x-2 border-t border-gray-100 pt-3 mt-auto">
                          {/* Edit Button */}
                          <button 
                            onClick={() => handleEditClick(item)}
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors" 
                            title="Edit Item"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          
                          {/* Delete Button */}
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors" 
                            title="Delete Item"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;