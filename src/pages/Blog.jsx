import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MdDeleteForever, MdOutlineFavorite } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'

const API_URL = "http://localhost:3000/blogs"

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [favorite, setFavorite] = useState([])
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [editBlog, setEditBlog] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API_URL)
        setBlogs(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])



  async function handleDelete(id) {
    const confirmDelete = confirm('Are you sure you want to delete?')
    if (!confirmDelete) return
    try {
      await axios.delete(`${API_URL}/${id}`)
      setBlogs((prev) => prev.filter((blog) => blog.id !== id))

      const updatedFavs = favorite.filter((fav) => fav.id !== id)
      setFavorite(updatedFavs)
      sessionStorage.setItem('favorite', JSON.stringify(updatedFavs))

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  const isFavorite = (id) => {
    return favorite.some(fav => fav.id === id)
  }


  const makeFav = (blog) => {
    const existing = JSON.parse(sessionStorage.getItem('favorite')) || []

    const isAlreadyFavorite = favorite.some(fav => fav.id === blog.id)

    let updatedFavs;

    if (isAlreadyFavorite) {
      updatedFavs = (existing.filter(fav => fav.id !== blog.id))
    } else {
      updatedFavs = ([...existing, blog])
    }

    setFavorite(updatedFavs)
    sessionStorage.setItem('favorite', JSON.stringify(updatedFavs))
  }


  useEffect(() => {
    const storedFavs = JSON.parse(sessionStorage.getItem('favorite')) || []
    setFavorite(storedFavs)
  }, [blogs])


  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h3 className="text-center font-extrabold text-3xl text-pink-800 mb-6">
          Top Stories
        </h3>

        <div className="flex flex-col md:flex-row gap-6">

          <div className="md:w-full flex flex-col gap-4">
            {blogs.length === 0 && !loading && (
              <p className="text-gray-600 text-center font-medium">No blogs available.</p>
            )}
            {blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className="bg-white shadow-md p-4 rounded-md cursor-pointer hover:bg-fuchsia-50 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-pink-800">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">
                      {blog.description.length > 100
                        ? `${blog.description.slice(0, 100)}...`
                        : blog.description}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-1 text-xl text-gray-600">
                    <MdOutlineFavorite
                      onClick={(e) => {
                        e.stopPropagation()
                        makeFav(blog)
                      }}
                      className={`cursor-pointer  ${isFavorite(blog.id)
                        ? 'text-red-500'
                        : 'text-gray-600'} `}
                    />
                    {/* <FaRegEdit
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      className="cursor-pointer hover:text-pink-800"
                    /> */}
                    <MdDeleteForever
                      onClick={(e) => {
                        handleDelete(blog.id)
                      }}
                      className="cursor-pointer hover:text-red-600"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>


          {blogs.length > 0 && (
            <div className="md:w-2/3 bg-white shadow-md rounded-md p-4 h-fit">
              {selectedBlog ? (
                <div>
                  <h3 className="font-bold text-xl text-pink-800 mb-2">
                    {selectedBlog.title}
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedBlog.description}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Click on a blog card to read the full content here.
                </p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Blog
