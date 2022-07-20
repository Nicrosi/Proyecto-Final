import React, { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
import './CreateGallery.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImage, getAllImages, postImage } from '../../../redux/actions';

export default function CreateGallery() {

  const dispatch = useDispatch();
  const ImagesList = useSelector((state) => state.rootReducer.gallery);
  const [file, setFile ] = useState(null);
  const auth = useSelector((state) => state.auth);

  

  useEffect(() => {
    dispatch(getAllImages())
  },[dispatch])

  const HandlerSelect = (e) => {
    setFile(e.target.files[0]);
  }

  const HandleDelte = async (image) => {
    const imagedeleted = axios.delete(`http://localhost:3001/gallery/delete?image_id=${image.id}&public_id=${image.public_id}`)
    Promise.all([imagedeleted]).then(() => {
      dispatch(getAllImages())
    });
  }

  const HandlerCLick = async () => {
    if(!file) {
      return alert('you must chose a file')
    }
    
    const formData = new FormData();
    formData.append('image', file);

    await axios.post('http://localhost:3001/gallery/post',formData)
    dispatch(getAllImages())
    
    document.getElementById('floatingInput2').value = null;
    setFile(null)
  }


  return (
    <div className='CONTAINER' >
      {
        auth.loggedIn && auth.currentUser.is_admin ? 
          <div className='container_inputs' >
            <input
                type='file'
                name="password"
                placeholder="Select an Image"
                id="floatingInput2"
                onChange={ HandlerSelect} 
                className={ "form-control" }
              />
            <button className='btn_click' onClick={()=>HandlerCLick()} >Click!</button>
          </div>
         : null
      }
      <div className='container_gallery_created' >
          <div 
            className={
              auth.currentUser.is_admin ? 
              'contaier_img' :
              auth.loggedIn && !auth.currentUser.is_admin ?
              'contaier_img padding' : 'contaier_img padding'
            }
          >
            {
              ImagesList.length ? ImagesList.map((image) => (
                <div key={image.id} className='img_button_container' >
                  <img className='images_from_db' src={image.imageURL} alt={image.title} />
                  {
                    auth.loggedIn && auth.currentUser.is_admin ? 
                    <div onClick={()=>HandleDelte(image)} className='btn_delete_image' >
                      <AiOutlineCloseCircle className='tarea-icono' />
                    </div>
                     : null
                  }
                  
                </div>
              ))
              
              : ( 
                  <h1
                    style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: "3rem",
                      position: "absolute",
                      top: "100px",
                      color: "#A7D129",
                    }}
                  >
                    Add images from your galery
                  </h1>
                )
                
              }
            {/* {
              ImagesList.length ? (
                
            <div class="row">
              <div class="column">
                {
                  firstLine.length && firstLine.map((image) => (
                    <div key={image.id} className='img_button_container' >
                      <img src={image.imageURL} alt={image.title}/>
                      {
                        auth.loggedIn && auth.currentUser.is_admin ? 
                          <div onClick={()=>HandleDelte(image)} className='btn_delete_image' >
                            <AiOutlineCloseCircle className='tarea-icono' />
                          </div>
                         : null
                      }
                    </div>
                  ))
                }
              </div>
              <div class="column">
                {
                  secondLine.length && secondLine.map((image) => (
                    <div key={image.id} className='img_button_container' >
                      <img src={image.imageURL} alt={image.title}/>
                      {
                        auth.loggedIn && auth.currentUser.is_admin ? 
                          <div onClick={()=>HandleDelte(image)} className='btn_delete_image' >
                            <AiOutlineCloseCircle className='tarea-icono' />
                          </div>
                         : null
                      }
                    </div>
                  ))
                }
              </div>
              <div class="column">
                {
                  thirdLine.length && thirdLine.map((image) => (
                    <div key={image.id} className='img_button_container' >
                      <img src={image.imageURL} alt={image.title}/>
                      {
                        auth.loggedIn && auth.currentUser.is_admin ? 
                          <div onClick={()=>HandleDelte(image)} className='btn_delete_image' >
                            <AiOutlineCloseCircle className='tarea-icono' />
                          </div>
                         : null
                      }
                    </div>
                  ))
                }
              </div>
            
             </div>
                ) : (<div></div>)
          } */}
          </div>
      </div>
    </div>
  )
}