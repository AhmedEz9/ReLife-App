import { useState, useEffect } from 'react';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Grab the currently logged-in user from local storage
  const currentUserStr = localStorage.getItem('user');
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

  // The list of categories for our filter buttons
  const categories = ['All', 'Furniture', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Other'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/upload');
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("You must be logged in to do this.");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/upload/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` } 
      });
      
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete the post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Server error while deleting.");
    }
  };

  // Filter posts based on search query and selected category
  const filteredPosts = posts.filter((post) => {
    const matchTitle = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDesc = post.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const textMatch = matchTitle || matchDesc;
    
    // If 'All' is selected, category matches automatically. Otherwise, check if it matches the button.
    const categoryMatch = selectedCategory === 'All' || post.category === selectedCategory;
    
    return textMatch && categoryMatch;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mb-4"></div>
        <div className="font-bold text-gray-500 text-xl animate-pulse">Loading community feed...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl w-full mx-auto p-4 pb-12">
      
      {/* Header Section */}
      <div className="text-center mb-8 mt-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500 mb-4 drop-shadow-sm">
          Community Feed
        </h2>
        <p className="text-gray-600 font-medium text-lg">Give items a second life. Browse what your community is sharing.</p>
      </div>
      
      {/* Floating Search Bar */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-xl">🔍</span>
          </div>
          <input 
            type="text" 
            placeholder="Search for items (e.g., 'Bicycle', 'Wood')..." 
            className="w-full pl-12 p-4 rounded-full border-2 border-white/50 bg-white/80 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-4 focus:ring-green-400/50 focus:border-green-400 transition-all text-gray-700 font-medium text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="mb-12 flex justify-center">
        <div className="flex space-x-3 overflow-x-auto py-2 px-4 max-w-full scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-5 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${
                selectedCategory === category 
                  ? 'bg-green-500 text-white border-transparent shadow-md transform scale-105' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-green-50 hover:text-green-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white/60 backdrop-blur-md p-12 rounded-3xl shadow-lg border border-white text-center">
          <p className="text-2xl text-gray-600 font-semibold mb-2">Oops!</p>
          <p className="text-gray-500">
            {posts.length === 0 
              ? "No items have been recycled yet. Be the first to upload something!" 
              : `No items found in "${selectedCategory}". Try a different category or search!`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative group flex flex-col">
              
              {/* Delete Button - Only shows if logged-in user owns this post */}
              {currentUser && currentUser.username === post.user?.username && (
                <button 
                  onClick={() => handleDelete(post.id)}
                  className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm hover:bg-red-600 text-white p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-20"
                  title="Delete Post"
                >
                  🗑️
                </button>
              )}

              <div className="relative h-64 overflow-hidden shrink-0">
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-md">
                  {post.category || 'Other'}
                </div>

                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-4">{post.description || "No description provided."}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold shadow-inner shrink-0">
                      {post.user?.username ? post.user.username.charAt(0).toUpperCase() : "?"}
                    </div>
                    <span className="font-semibold text-gray-700 truncate max-w-[100px]">{post.user?.username || "Unknown"}</span>
                  </div>
                  <span className="text-gray-400 font-medium shrink-0">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Feed;