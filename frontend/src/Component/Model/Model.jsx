import React from 'react'
import './model.css'
function Model({handleDelete,handleModel,heading}) {
  return (
    <div className="model-overlay">
        <div className="model-container">
            <p className='model-message'>{heading}</p>
            <div className="model-action">
                <button className='model-action-cancle' onClick={handleModel}>cancle</button>
                <button className='model-action-btn' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default Model