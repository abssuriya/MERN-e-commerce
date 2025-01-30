import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const parms=useParams()
    console.log("catagory",parms)
  return (
    <div>CategoryProduct</div>
  )
}

export default CategoryProduct