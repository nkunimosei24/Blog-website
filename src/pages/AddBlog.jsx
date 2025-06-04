import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const API_URL = "http://localhost:3000/blogs";

const AddBlog = () => {
  const [form, setForm] = useState({
    title: '',
    description: ''
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = form;
    if (title.trim() === "" || description.trim() === "") return;

    try {
      const response = await axios.post(API_URL, form);
      setForm({ title: '', description: '' });
      navigate('/blog');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-100 via-pink-100 to-pink-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 sm:p-10"
      >
        <h4 className="text-center text-3xl sm:text-4xl font-bold text-pink-800 mb-8">
          Add a Blog
        </h4>

        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Enter blog title"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50 text-gray-800"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Enter blog description"
            rows="5"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50 text-gray-800"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white font-semibold text-lg py-3 rounded-md hover:bg-pink-700 transition"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
