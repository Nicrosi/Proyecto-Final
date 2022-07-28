import React, { useEffect } from 'react';
import { useState } from 'react';
import { BiTrash } from "react-icons/bi";
import './CreateGallery.css';
import axios from 'axios';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { ClearGallery, getAllImages, getByName } from '../../../redux/actions';
import { useHistory, useLocation } from 'react-router-dom';

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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#A7D129',
      cancelButtonColor: 'rgb(43, 43, 44);',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(ClearGallery())
        const imagedeleted = axios.delete(`http://localhost:3001/gallery/delete?image_id=${image.id_image}&public_id=${image.public_id}`)
        Promise.all([imagedeleted]).then(() => {
          dispatch(getAllImages())
          Swal.fire(
            'Deleted!',
            'Your image has been deleted.',
            'success'
          )
        });
      }
    })
  }

  const handleChange = (e) => {
    e.preventDefault();
    setTitle({
      ...title, 
      [e.target.name] : e.target.value
    })
  }

  const HandlerCLick = async () => {
    if(!file || !title.title) {
      Swal.fire({
        title: 'There is an error',
        text: "Title and file are both required",
        icon: 'warning',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonColor: '#A7D129',
        cancelButtonColor: '#A7D129',
        confirmButtonText: ' Okey '
      })
    }else{
      const formData = new FormData();
      formData.append('image', file);
      dispatch(ClearGallery())
      setGallery(true)
      setTitle({title: ''})
  
      await axios.post(`http://localhost:3001/gallery/post?title=${title.title}`,formData)
      dispatch(getAllImages())
      setFile(null)
      Swal.fire({
        title: 'Success',
        text: "Image uploaded successfully",
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonColor: '#A7D129',
        cancelButtonColor: '#A7D129',
        confirmButtonText: ' Okey '
      })
    }
    
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
              FirstLine?.length ? (
                
                <div className="row container_images">
                  <div className="column ">
                    {
                      FirstLine.length ? FirstLine.map((img) => (
                        <div key={img.id} className='img_button_container' >
                          <ul>
                            <li>
                              <img className='images_from_db' src={img.imageURL} alt={img.title} />
                              <ul className='prueba' ><li>
                                {
                                  auth.loggedIn && auth.currentUser.is_admin ? 
                                  <div onClick={()=>HandleDelte(img)} className='btn_delete_image' >
                                    <BiTrash className='btn-trash tarea-icono danger' />
                                  </div>
                                   : null
                                }
                              </li></ul>
                            </li>
                          </ul>
                        </div>
                      )) : null
                    }
                  </div>
                  <div className="column">
                    {
                      SecondLine.length ? SecondLine.map((img) => (
                        <div key={img.id} className='img_button_container' >
                          <ul>
                            <li>
                              <img className='images_from_db' src={img.imageURL} alt={img.title} />
                              <ul className='prueba' ><li>
                                {
                                  auth.loggedIn && auth.currentUser.is_admin ? 
                                  <div onClick={()=>HandleDelte(img)} className='btn_delete_image' >
                                    <BiTrash className='btn-trash tarea-icono' />
                                  </div>
                                   : null
                                }
                              </li></ul>
                            </li>
                          </ul>
                        </div>
                      )) : null
                    }
                  </div>
                  <div className="column">
                    {
                      ThirdLine.length ? ThirdLine.map((img) => (
                        <div key={img.id} className='img_button_container' >
                          <ul>
                            <li>
                              <img className='images_from_db' src={img.imageURL} alt={img.title} />
                              <ul className='prueba' ><li>
                                {
                                  auth.loggedIn && auth.currentUser.is_admin ? 
                                  <div onClick={()=>HandleDelte(img)} className='btn_delete_image' >
                                    <BiTrash className=' btn-trash tarea-icono' />
                                  </div>
                                   : null
                                }
                              </li></ul>
                            </li>
                          </ul>
                        </div>
                      )) : null
                    }
                  </div>
                </div>

              ) : (<div></div>)
            }
            {
              ImageLoading  &&
              <div className='container_loading' >
                <div className="spinner-border text-light" style={{width: "12vw", height: "12vw" }} role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            }
              {
                !FirstLine.length && !ImageLoading ?
                  auth.loggedIn && auth.currentUser.is_admin ?
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
                  ) : 
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
                      No images loaded
                    </h1>
                  )
                : (<div></div>)
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