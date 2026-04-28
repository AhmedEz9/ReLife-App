import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Furniture'); 
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation: Ensure title and image are provided
    if (!image || !title) {
      setIsError(true);
      setMessage('Please provide at least a title and an image.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Get user data from local storage
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      // If no user is found, default to ID 1 (or handle the error)
      const userId = user ? user.id : 1; 

      // 2. Package the text, category, and file together using FormData
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category); 
      formData.append('description', description);
      formData.append('userId', userId);
      formData.append('image', image);

      // 3. Send it to the backend!
      const response = await fetch('https://relife-backend.onrender.com/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` 
        },
        body: formData 
      });

      const data = await response.json();

      if (response.ok) {
        setIsError(false);
        setMessage('Item shared successfully! Redirecting...');
        setTimeout(() => navigate('/feed'), 1500);
      } else {
        setIsError(true);
        setMessage(data.error || 'Failed to upload item.');
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage('Server error. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full relative">
      {/* Decorative background glow */}
      <div className="fixed top-20 right-10 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 z-0 pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 z-0 pointer-events-none"></div>

      <div className="relative z-10 bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">Share an Item</h2>
        <p className="text-gray-500 text-center mb-8 font-medium">Give your unwanted items a second life.</p>
        
        {message && (
          <div className={`p-4 mb-6 rounded-xl text-sm font-bold text-center shadow-sm ${isError ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title Field */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Item Title *</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 pl-4 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all text-gray-700"
              placeholder="e.g., Vintage Wooden Chair"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 pl-4 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all text-gray-700 appearance-none"
              required
            >
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full p-3 pl-4 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all text-gray-700 resize-none"
              placeholder="Describe the condition, dimensions, and pickup details..."
            />
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Item Image *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex justify-center bg-white/50 hover:bg-gray-50 transition-colors">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-all"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-4 flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              'Upload Item'
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Upload;