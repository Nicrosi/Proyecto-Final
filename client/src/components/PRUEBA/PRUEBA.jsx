import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './PRUEBA.css';

export default function PRUEBA() {

  const [file, setFile ] = useState(null);
  const [ImagesList, setImagesList ] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/images/prueba',)
    .then(res => res.json())
    .then(res => setImagesList(res))
    .catch(err => console.log(err))
    return () => {

      fetch('http://localhost:3001/images/prueba/delete')
      .then(res => res.text())
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }

    // return () => {
    //   dispatch(ClearDogDetail())
    // }
  },[])


  const HandlerSelect = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  const HandlerCLick = () => {
    if(!file) {
      return alert('you must chose a file')
    }

    const formData = new FormData();
    formData.append('image', file)

    fetch('http://localhost:3001/images/prueba', {
      method: 'POST',
      body: formData
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.log(err))

    document.getElementById('fileInput').value = null;

    setFile(null)

  }

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <input id='fileInput' onChange={ HandlerSelect} type='file' />
      <button onClick={()=>HandlerCLick()} >Click!</button>
      <rd/>
      <div className='container_images' >
        {
          ImagesList.length && ImagesList.map((image) => (
            <img className='images_from_db' src={`http://localhost:3001/${image}`} />
          ))
        }
      </div>
     <Link to='/formulario' >
        <button>Go Back!</button>
     </Link> 
    </div>
  )
}