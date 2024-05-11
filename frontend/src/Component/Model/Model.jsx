import React from 'react'
import './model.css'
function Model({handleDelete,handleModel,heading,forProductEdit,img}) {
  return (
    <div className="model-overlay">
        <div className="model-container">
            {img?
            <div className='product-img-container'>
            <img src={`http://localhost:8000/media/${img}`} alt="" />
            <div className="model-img-action">
                <button className='model-action-close' onClick={handleModel}>close</button>
            </div>
            </div>
            :
            <>
            <p className='model-message'>{heading}</p>
            <div className="model-action">
                <button className='model-action-cancle' onClick={handleModel}>cancle</button>
                <button className='model-action-btn' onClick={handleDelete}>Delete</button>
            </div>
            </>
            }
        </div>
    </div>
  )
}

export default Model