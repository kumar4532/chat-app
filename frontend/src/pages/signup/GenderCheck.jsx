import React from 'react'

function GenderCheck() {
  return (
    <div className='flex mt-2'>
        <div className='form-control'>
            <label className='label gap-2 cursor-pointer'>
                <span className='label-text text-black text-base'>Male</span>
                <input type="checkbox" className='checkbox border-slate-900' />
            </label>
        </div>
        <div>
        <div className='form-control'>
            <label className='label gap-2 cursor-pointer'>
                <span className='label-text text-black text-base'>Female</span>
                <input type="checkbox" className='checkbox border-slate-900' />
            </label>
        </div>
        </div>
    </div>
  )
}

export default GenderCheck