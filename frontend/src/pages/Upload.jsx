import { useState } from 'react';

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isError, setIsError] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setIsError(true);
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData 
      });

      const data = await response.json();

      if (response.ok) {
        setIsError(false);
        setMessage('Item uploaded successfully!');
        setImageUrl(data.post.imageUrl); // Updated to match Prisma response
      } else {
        setIsError(true);
        setMessage(data.error || 'Upload failed.');
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage('Server error. Is the backend running?');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white max-w-lg w-full relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500 mb-2 drop-shadow-sm">
            Recycle an Item
          </h2>
          <p className="text-gray-500 font-medium">Upload a picture of what you want to share.</p>
        </div>
        
        {message && (
          <div className={`p-4 mb-6 rounded-xl text-sm font-bold text-center shadow-sm ${isError ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-6">
          <div className="bg-white/50 p-6 rounded-2xl border border-gray-100 shadow-inner">
            <label className="block text-gray-700 text-sm font-bold mb-3 ml-1">Select an Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-green-50 file:to-emerald-50 file:text-green-700 hover:file:bg-green-100 transition-all cursor-pointer"
            />
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-lg">
            Share with Community
          </button>
        </form>

        {imageUrl && (
          <div className="mt-8 animate-fade-in-up">
            <p className="text-center text-sm font-bold text-green-600 mb-3 uppercase tracking-wider">Success! Live Preview:</p>
            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">
              <img src={imageUrl} alt="Uploaded preview" className="w-full object-cover max-h-64" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;