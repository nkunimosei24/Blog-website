import React from 'react'
import axios from "axios";
import AddBlog from './AddBlog'
import { useState } from 'react';



const BlogManager = () => {
 


  return (
    <div>
      <AddBlog handleSubmit={handleSubmit} />

    </div>
  )
}

export default BlogManager