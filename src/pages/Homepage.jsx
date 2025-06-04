import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const API_URL = 'http://localhost:3000/blogs';

const Homepage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API_URL);
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const toggleShow = (id) => {
    setShow((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {loading ? <div>Loading...</div> : <div className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-center font-extrabold text-3xl text-pink-800 mb-6">
          All Blogs
        </h3>

        <div className="overflow-x-auto">
          <div className="flex gap-4 w-max">
            {blogs.map((blog) => {
              const isShown = show === blog.id;
              const shortText = blog.description.slice(0, 100);

              return (
                <div
                  key={blog.id}
                  className="min-w-[300px] max-w-[300px] bg-white shadow-md p-4 rounded-md transition"
                >
                  <h3 className="font-semibold text-lg text-pink-800">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-700 mt-1">
                    {isShown ? blog.description : `${shortText}...`}
                  </p>

                  <button
                    onClick={() => toggleShow(blog.id)}
                    className="text-blue-700 underline mt-2 text-sm"
                  >
                    {isShown ? 'Show Less' : 'Show More'}
                  </button>
                </div>
              );
            })}
          </div>

          <div className='mt-10'>
            <h3 className="text-center font-bold text-2xl text-pink-800 mb-4">
                Favorited Blogs
              </h3>
          </div>
        </div>
      </div>}
  
      
    </div>
  );
};

export default Homepage;
