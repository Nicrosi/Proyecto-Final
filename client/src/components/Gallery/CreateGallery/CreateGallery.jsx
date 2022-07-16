import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CreateGallery.css';

export default function CreateGallery() {

  const [file, setFile ] = useState(null);
  const [Images, setImages ] = useState([]);
  const [ImagesList, setImagesList ] = useState([]);
  const History = useHistory();


  useEffect(() => {
    fetch('http://localhost:3001/images/get',)
    .then(res => res.json())
    .then(res => setImagesList(res))
    .catch(err => console.log(err))
    return () => {

      fetch('http://localhost:3001/images/prueba/delete')
      .then(res => res.text())
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }

  },[file])


  const HandlerSelect = (e) => {
    setFile(e.target.files[0]);
    Images.push(e.target.files[0])
    console.log(e.target.files[0]);
  }

  const HandleDelte = (image) => {
    console.log(image);
    fetch(`http://localhost:3001/images/delete/${image}`, {
      method: 'DELETE'
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.log(err))

    fetch('http://localhost:3001/images/get',)
    .then(res => res.json())
    .then(res => setImagesList(res))
    .catch(err => console.log(err))
  }

  const HandlerCLick = () => {
    if(!file) {
      return alert('you must chose a file')
    }

    const formData = new FormData();
   
    formData.append('image', file)
    fetch('http://localhost:3001/images/post', {
      method: 'POST',
      body: formData
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.log(err))

    
    
    fetch('http://localhost:3001/images/get',)
    .then(res => res.json())
    .then(res => setImagesList(res))
    .catch(err => console.log(err))
    
    document.getElementById('fileInput').value = null;
    setFile(null)
  }

  return (
    <div className='CONTAINER' >
      <div className='container_inputs' >
        <input id='fileInput' placeholder=' Select an Image ' onChange={ HandlerSelect} type='file' />
        <button onClick={()=>HandlerCLick()} >Click!</button>
      </div>
      <div className='container_gallery_created' >
        <div className='contaier_img' >
          {
            ImagesList.length && ImagesList.map((image) => (
              <div className='img_button_container' >
                <img className='images_from_db' src={`http://localhost:3001/${image}`} />
                <button onClick={()=>HandleDelte(image)} className='btn_delete_image' >X</button>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}