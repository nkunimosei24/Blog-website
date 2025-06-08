import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import js from '@eslint/js';

const API_URL = 'http://localhost:3000/blogs';

const Homepage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(null);
  const [favorite, setFavorite] = useState([]);

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


  useEffect(() => {
    const storedFavs = JSON.parse(sessionStorage.getItem('favorite')) || [];
    setFavorite(storedFavs)
  }, [])



  return (
    <div className="min-h-screen bg-pink-50 flex flex-col gap-30">
      {loading ? <div>Loading...</div> : <div className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-center font-extrabold text-3xl text-pink-800 mb-6">
          All Blogs
        </h3>

        <div className="overflow-x-auto">
          {blogs.length === 0 && !loading && (
            <p className="text-gray-600 text-center font-medium">No blogs available.</p>
          )}
          <div className="flex gap-4 w-max">

            {blogs.map((blog) => {
              const isShown = show === blog.id;
              const shortText = blog.description.slice(0, 100);

              return (
                <div
                  key={blog.id}
                  className="min-w-[300px] max-w-[300px] bg-white shadow-md p-4 rounded-md transition cursor-pointer hover:bg-fuchsia-50 "
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
        </div>
      </div>}

      <div className=''>
        <h3 className="text-center font-bold text-2xl text-pink-800 mb-4">
          Favorited Blogs
        </h3>

        {favorite.length === 0 ? (
          <p className="text-gray-600 italic text-center">No favorite blogs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorite.map(blog => (
              <div key={blog.id} className="p-4 bg-white rounded shadow-md cursor-pointer hover:bg-fuchsia-50 transition">
                <h3 className="text-lg font-semibold text-pink-700">{blog.title}</h3>
                <p className="text-sm text-gray-700">
                  {blog.description.slice(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Homepage;
