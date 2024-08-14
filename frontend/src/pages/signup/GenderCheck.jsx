import React from 'react'

function GenderCheck({onGenderChangeCheckBox, selectedGender}) {
  return (
    <div className='flex mt-2'>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
                <span className='label-text text-white text-base'>Male</span>
                <input 
                type="checkbox" 
                className='checkbox border-slate-900'
                checked={selectedGender === "male"}
                onChange={() => onGenderChangeCheckBox("male")} />
            </label>
        </div>
        <div>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
                <span className='label-text text-white text-base'>Female</span>
                <input 
                type="checkbox" 
                className='checkbox border-slate-900'
                checked={selectedGender === "female"}
                onChange={() => onGenderChangeCheckBox("female")} />
            </label>
        </div>
        </div>
    </div>
  )
}

export default GenderCheck