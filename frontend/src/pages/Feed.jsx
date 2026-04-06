import { useState, useEffect } from 'react';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); 

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
      const response = await fetch(`http://localhost:5000/api/upload/${postId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        alert("Failed to delete the post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Server error while deleting.");
    }
  };

  // Filter the posts based on the search query
    const filteredPosts = posts.filter((post) => {
    const matchTitle = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDesc = post.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTitle || matchDesc;
  });

  if (isLoading) {
    return <div className="text-center mt-10 font-bold text-gray-500 text-xl animate-pulse">Loading feed...</div>;
  }

  return (
    <div className="max-w-5xl w-full mx-auto p-4">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">♻️ Community Feed</h2>
      
      {/* The Search Bar UI */}
      <div className="mb-8 flex justify-center">
        <input 
          type="text" 
          placeholder="Search for items (e.g., 'Bicycle', 'Wood')..." 
          className="w-full max-w-lg p-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-md text-center text-gray-500">
          {posts.length === 0 
            ? "No items have been recycled yet. Be the first to upload something!" 
            : "No items match your search. Try a different word!"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Map over filteredPosts now, NOT posts! */}
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 relative">
              
              <button 
                onClick={() => handleDelete(post.id)}
                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition duration-200"
                title="Delete Post"
              >
                🗑️
              </button>

              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-56 object-cover"
              />
              
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{post.description || "No description provided."}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                  <span>By: <span className="font-semibold text-green-600">{post.user?.username || "Unknown User"}</span></span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
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