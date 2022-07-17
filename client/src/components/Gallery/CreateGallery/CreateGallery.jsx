import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AiOutlineCloseCircle } from "react-icons/ai";
import './CreateGallery.css';
import axios from 'axios';

export default function CreateGallery() {

  const [file, setFile ] = useState(null);
  const [ImagesList, setImagesList ] = useState([]);
  const [Change, setChange ] = useState(false);
  const [ImageId, setImageId ] = useState('');
  const History = useHistory();


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
    setChange(false)
    
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

  const HandleImageId = (img) => {
    const image = ImagesList.find((image) => image === img );
    setImageId(image)
    setChange(true)
  }

  const HandleSetChange = () => {
    setChange(false)
  }

  return (
    <div className='CONTAINER' >
      <div className='container_inputs' >
        <input className='input_images' id='fileInput' placeholder=' Select an Image ' onChange={ HandlerSelect} type='file' />
        <button className='btn_click' onClick={()=>HandlerCLick()} >Click!</button>
      </div>
      <div className='container_gallery_created' >
          <div className='contaier_img' >
            {
              ImagesList.length ? ImagesList.map((image) => (
                <div onClick={()=>HandleImageId(image)} className='img_button_container' >
                  <img className='images_from_db' src={`http://localhost:3001/${image}`} />
                  <div onClick={()=>HandleDelte(image)} className='btn_delete_image' >
                    <AiOutlineCloseCircle className='tarea-icono' />
                  </div>
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
        {/* <div onClick={()=>HandleSetChange()} className={ !Change ? 'block_container' : 'containe_img_id' } >
          <div className={'image_id'} >
            <img className='images_from_db_id' src={`http://localhost:3001/${ImageId}`} />
            <div onClick={()=>HandleDelte(ImageId)} className='btn_delete_image' >
               <AiOutlineCloseCircle className='tarea-icono-id' />
             </div>
          </div>
        </div> */}
      
    </div>
  )
}