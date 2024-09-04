import React, { useState } from 'react'
import GenderCheck from './GenderCheck';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

function SignUp() {

  const [inputs, setInputs] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

  const {loading, signup} = useSignup();

  const handleGenderCheck = (gender) => {
    setInputs({...inputs, gender})
  }
  
  const handleSubmit = async(e) => {  
    e.preventDefault();
    await signup(inputs);
  }
  
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>SignUp
              <span className='text-blue-300'> Yooo!!!</span>
            </h1>

            <form onSubmit={handleSubmit}>
              <div>
                <label className='label p-2' htmlFor="">
                  <span className='text-base label-text text-white'>Full Name</span>
                </label>
                <input 
                type="text" 
                placeholder='Enter Full Name' 
                className='w-full input input-bordered h-10' 
                value={inputs.fullname}
                onChange={(e) => setInputs({...inputs, fullname: e.target.value})} />
              </div>

              <div>
                <label className='label p-2' htmlFor="">
                  <span className='text-base label-text text-white'>Username</span>
                </label>
                <input 
                type="text" 
                placeholder='Enter Username' 
                className='w-full input input-bordered h-10'
                value={inputs.username}
                onChange={(e) => setInputs({...inputs, username: e.target.value})} />
              </div>

              <div>
                <label className='label p-2' htmlFor="">
                  <span className='text-base label-text text-white'>Password</span>
                </label>
                <input 
                type="password" 
                placeholder='Enter Password' 
                className='w-full input input-bordered h-10'
                value={inputs.password}
                onChange={(e) => setInputs({...inputs, password: e.target.value})} />
              </div>

              <div>
                <label className='label p-2' htmlFor="">
                  <span className='text-base label-text text-white'>Confirm Password</span>
                </label>
                <input 
                type="password" 
                placeholder='Confirm Password' 
                className='w-full input input-bordered h-10'
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})} />
              </div>

              <GenderCheck onGenderChangeCheckBox={handleGenderCheck} selectedGender={inputs.gender} />

              <Link to="/login" className='text-sm hover:text-white mt-2 inline-block'>Already have an account?</Link>

              <div>
                <button className='btn btn-block btn-sm mt-2' disabled={loading}>
                  {
                    loading ? <span className='loading loading-spinner'></span> : "Sign Up"
                  }
                </button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp;