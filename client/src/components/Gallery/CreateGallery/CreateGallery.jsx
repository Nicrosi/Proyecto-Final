import React, { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
import './CreateGallery.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function CreateGallery() {

  const [file, setFile ] = useState(null);
  const [ImagesList, setImagesList ] = useState([]);
  const auth = useSelector((state) => state.auth);



  useEffect(() => {
    axios.get('http://localhost:3001/gallery/get',)
    .then(res => setImagesList(res.data))
    .catch(err => console.log(err))

    return () => {
      axios.delete('http://localhost:3001/gallery/delete')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    }

  },[])

  const HandlerSelect = (e) => {
    setFile(e.target.files[0]);
  }

  const HandleDelte = (image) => {
    const promise = axios.delete(`http://localhost:3001/gallery/delete/${image}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  
    Promise.all([promise]).then(function(values) {
      console.log(values);
      axios.get('http://localhost:3001/gallery/get',)
      .then(res => setImagesList(res.data))
      .catch(err => console.log(err))
    });
    
  }

  const HandlerCLick = () => {
    if(!file) {
      return alert('you must chose a file')
    }

    const formData = new FormData();
    const image = ImagesList.find((image) => image.split('-')[1] === file.name)

    if(!image) {

      formData.append('image', file)
      const promise = axios.post('http://localhost:3001/gallery/post',formData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  
      Promise.all([promise]).then(function() {
        axios.get('http://localhost:3001/gallery/get',)
        .then(res => setImagesList(res.data))
        .catch(err => console.log(err))
      });
    }else {
      alert('The name of the image is already added')
    }
    
    document.getElementById('fileInput').value = null;
    setFile(null)
  }


  return (
    <div className='CONTAINER' >
      {
        auth.loggedIn && auth.currentUser.is_admin ? 
          <div className='container_inputs' >
            <input className='input_images' id='fileInput' placeholder=' Select an Image ' onChange={ HandlerSelect} type='file' />
            <button className='btn_click' onClick={()=>HandlerCLick()} >Click!</button>
          </div>
         : null
      }
      <div className='container_gallery_created' >
          <div className='contaier_img' >
            {
              ImagesList.length ? ImagesList.map((image) => (
<<<<<<< HEAD
                <div className='img_button_container' >
                  <img className='images_from_db' src={`http://localhost:3001/${image.imageURL}`} alt={image.title} />
=======
                <div className='img_button_container' key={image}>
                  <img className='images_from_db' src={`http://localhost:3001/${image}`} alt="galleryImg" />
>>>>>>> 0793d044ec29cc3811c0601e166a0035ebbfd3ad
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
          </div>
      </div>
      
    </div>
  )
}