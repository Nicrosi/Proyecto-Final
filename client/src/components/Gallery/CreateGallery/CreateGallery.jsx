import React, { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
import './CreateGallery.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ClearGallery, deleteImage, getAllImages, postImage } from '../../../redux/actions';

export default function CreateGallery() {

  const dispatch = useDispatch();
  // const ImagesList = useSelector((state) => state.rootReducer.gallery);
  const FirstLine = useSelector((state) => state.rootReducer.FirstLine);
  const SecondLine = useSelector((state) => state.rootReducer.SecondLine);
  const ThirdLine = useSelector((state) => state.rootReducer.ThirdLine);
  const ImageLoading = useSelector((state) => state.rootReducer.ImageLoading);
  
  const [ file, setFile ] = useState(null);
  const [ title, setTitle ] = useState({
    title: ''
  });
  const [Gallery, setGallery ] = useState(true);
  const auth = useSelector((state) => state.auth);

  

  // console.log(FirstLine);
  // console.log(SecondLine);
  // console.log(ThirdLine);
  useEffect(() => {
    dispatch(getAllImages())
  },[dispatch])

  const HandlerSelect = (e) => {
    setFile(e.target.files[0]);
  }

  const HandlerStateGallery = (e) => {
    e.preventDefault();
    setGallery(true)
  }

  const HandlerStateUpload = (e) => {
    e.preventDefault();
    setGallery(false)
  }

  const HandleDelte = async (image) => {
    dispatch(ClearGallery())
    const imagedeleted = axios.delete(`http://localhost:3001/gallery/delete?image_id=${image.id}&public_id=${image.public_id}`)
    Promise.all([imagedeleted]).then(() => {
      dispatch(getAllImages())
    });
  }

  const handleChange = (e) => {
    e.preventDefault();
    setTitle({
      ...title, 
      [e.target.name] : e.target.value
    })
  }

  const HandlerCLick = async () => {
    if(!file) {
      return alert('you must chose a file')
    }
    console.log(title.title);
    
    const formData = new FormData();
    formData.append('image', file);
    dispatch(ClearGallery())
    setGallery(true)

    await axios.post(`http://localhost:3001/gallery/post?title=${title.title}`,formData)
    dispatch(getAllImages())
    
    // document.getElementById('floatingInput2').value = null;
    setFile(null)
  }


  return (
    <div className='CONTAINER' >
      {
        auth.loggedIn && auth.currentUser.is_admin ? 
          <div className='container_inputs' >
            {
              Gallery ? 
              <h1 onClick={(e)=>HandlerStateGallery(e)} style={{fontFamily: "'Bebas Neue', cursive", fontSize: "3vw", top: "100px", cursor: "pointer", color: "#A7D129",}}>
                Gallery
              </h1> :
              <h1 onClick={(e)=>HandlerStateGallery(e)} style={{fontFamily: "'Bebas Neue', cursive", fontSize: "3vw", top: "100px", cursor: "pointer", color: "rgb( 255 255 255 / 80%)",}}>
                Gallery
              </h1> 
            }
            {
              !Gallery ? 
              <h1 onClick={(e)=>HandlerStateUpload(e)} style={{fontFamily: "'Bebas Neue', cursive", fontSize: "3vw", top: "100px", cursor: "pointer", color: "#A7D129",}}>
                Upload Images
              </h1> :
              <h1 onClick={(e)=>HandlerStateUpload(e)} style={{fontFamily: "'Bebas Neue', cursive", fontSize: "3vw", top: "100px", cursor: "pointer", color: "rgb( 255 255 255 / 80%)",}}>
                Upload Images
              </h1> 
            }
          </div>
         : null
      }
      <div className='container_gallery_created' >
        {
          Gallery ?
          <div 
            className={
              auth.currentUser.is_admin ? 
              'contaier_img' :
              auth.loggedIn && !auth.currentUser.is_admin ?
              'contaier_img padding' : 'contaier_img padding'
            }
          >
            
            {
              FirstLine?.length && (
                
                <div class="row">
                  <div class="column">
                    {
                      FirstLine.length && FirstLine.map((img) => (
                        <div key={img.id} className='img_button_container' >
                          <img className='images_from_db' src={img.imageURL} alt={img.title} />
                          {
                            auth.loggedIn && auth.currentUser.is_admin ? 
                            <div onClick={()=>HandleDelte(img)} className='btn_delete_image' >
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
                      SecondLine.length && SecondLine.map((img) => (
                        <div key={img.id} className='img_button_container' >
                          <img className='images_from_db' src={img.imageURL} alt={img.title} />
                          {
                            auth.loggedIn && auth.currentUser.is_admin ? 
                            <div onClick={()=>HandleDelte(img)} className='btn_delete_image' >
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
                      ThirdLine.length && ThirdLine.map((img) => (
                        <div key={img.id} className='img_button_container' >
                          <img className='images_from_db' src={img.imageURL} alt={img.title} />
                          {
                            auth.loggedIn && auth.currentUser.is_admin ? 
                            <div onClick={()=>HandleDelte(img)} className='btn_delete_image' >
                              <AiOutlineCloseCircle className='tarea-icono' />
                            </div>
                             : null
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>

              ) 
            }
            {
              ImageLoading  &&
              <div className='container_loading' >
                <div className="spinner-border text-light" style={{width: "12vw", height: "12vw" }} role="status">
                  <span class="sr-only"></span>
                </div>
              </div>
            }
              {
                !FirstLine.length && !ImageLoading ?
                ( 
                  <h1
                    style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: "3rem",
                      position: "absolute",
                      top: "100px",
                      color: "#A7D129",
                    }}
                  >
                    Add images from your gallery
                  </h1>
                ) : (<div></div>)
              }
                
              
            
          </div>
          :
          <div 
            className={
              auth.currentUser.is_admin ? 
              'contaier_img' :
              auth.loggedIn && !auth.currentUser.is_admin ?
              'contaier_img padding' : 'contaier_img padding'
            }
          >
            <div className="Upload_image_container" >
              <div className="form-floating col-md">
                <input
                  type="text"
                  name="title"
                  value={title.title}
                  onChange={(e)=>handleChange(e)}
                  placeholder="Enter a title"
                  id="floatingInput1"
                  className={"form-control"}
                />
                <label htmlFor="floatingInput1">Enter a title</label>
              </div>
              <br/>
              <input
                type='file'
                name="password"
                placeholder="Select an Image"
                id="floatingInput2"
                onChange={ HandlerSelect} 
                className={ "form-control" }
              />
              <br/>
              <div className="btn_upload" >
                <button
                  onClick={()=>HandlerCLick()} 
                  className="btn btn-success"
                  style={{ backgroundColor: "#A7D129" }}
                >
                  Update Image
                </button>
              </div>
            </div> 
          </div>
          
      }
      </div> 
    </div>
  )
}