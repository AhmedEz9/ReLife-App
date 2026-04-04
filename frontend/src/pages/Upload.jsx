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

    // When sending files, we use FormData instead of JSON!
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
        setMessage('File uploaded successfully!');
        setImageUrl(data.url); 
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
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Upload Media</h2>
      
      {message && (
        <div className={`p-3 mb-4 rounded-lg text-sm font-semibold text-center ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-gray-600 text-sm font-semibold mb-2">Select an Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Upload File
        </button>
      </form>

      {/* If we have an image URL, show the picture! */}
      {imageUrl && (
        <div className="mt-6">
          <p className="text-center text-sm text-gray-500 mb-2">Preview:</p>
          <img src={imageUrl} alt="Uploaded preview" className="w-full rounded-lg shadow-md" />
        </div>
      )}
    </div>
  );
}

export default Upload;