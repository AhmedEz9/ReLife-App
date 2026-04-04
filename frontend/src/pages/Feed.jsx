import { useState, useEffect } from 'react';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This fetches all the posts from your new backend route as soon as the page loads!
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

  if (isLoading) {
    return <div className="text-center mt-10 font-bold text-gray-500 text-xl animate-pulse">Loading feed...</div>;
  }

  return (
    <div className="max-w-5xl w-full mx-auto p-4">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">♻️ Community Feed</h2>
      
      {posts.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-md text-center text-gray-500">
          No items have been recycled yet. Be the first to upload something!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              {/* The Image */}
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-56 object-cover"
              />
              
              {/* The Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{post.description || "No description provided."}</p>
                
                {/* The Footer with User Info */}
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