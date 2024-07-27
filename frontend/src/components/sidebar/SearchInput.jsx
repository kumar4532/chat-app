import React from 'react'
import { CiSearch } from "react-icons/ci";

function SearchInput() {
  return (
    <div>
        <form className='flex items-center gap-2'>
            <input type="text" placeholder='Search...' className='input input-bordered rounded-full'/>
            <button type='submit' className='btn btn-circle bg-gray-800 text-white'><CiSearch  className='w-7 h-7 outline-none' /></button>
        </form>
    </div>
  )
}

export default SearchInput