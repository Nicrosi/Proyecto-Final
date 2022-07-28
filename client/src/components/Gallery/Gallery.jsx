import { useEffect, } from "react";
import { Container } from "react-bootstrap";
import './Gallery.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllImages } from "../../redux/actions";


export default function Gallery() {

  const dispatch = useDispatch();
  const ImagesList = useSelector((state) => state.rootReducer.gallery);

  useEffect(() => {
    dispatch(getAllImages())
  },[dispatch])

  return (
    <>
    {
      ImagesList.length ?
      (
        // <section
        //   id="multimediaLP"
        //   className="d-flex flex-column align-items-center pt-4 bg-dark"
        //   style={{ minHeight: "100vh" }}
        // >
        <div className='container_background_img' >
        <div className='container_background_color' >

          <Container fluid>
            <div className="container_galery_images" >
              <>
                {
                    ImagesList.length ? (
                      
                    <div className="row container_images">
                      <div className="column">
                        <div className='img_button_container' >
                          {ImagesList.length >= 1 ? (<img className='gallery_image' src={ImagesList[0].imageURL} alt={ImagesList[0].title}/>) : (<div></div>)}
                          {ImagesList.length >= 4 ? (<img className='gallery_image' src={ImagesList[3].imageURL} alt={ImagesList[3].title}/>) : (<div></div>)}
                          {ImagesList.length >= 7 ? (<img className='gallery_image' src={ImagesList[6].imageURL} alt={ImagesList[6].title}/>) : (<div></div>)}
                        </div>
                      </div>
                      <div className="column">
                        <div className='img_button_container' >
                          {ImagesList.length >= 2 ? (<img className='gallery_image' src={ImagesList[1].imageURL} alt={ImagesList[1].title}/>) : (<div></div>)}
                          {ImagesList.length >= 5 ? (<img className='gallery_image' src={ImagesList[4].imageURL} alt={ImagesList[4].title}/>) : (<div></div>)}
                          {ImagesList.length >= 8 ? (<img className='gallery_image' src={ImagesList[7].imageURL} alt={ImagesList[7].title}/>) : (<div></div>)}
                        </div>
                      </div>
                      <div className="column">
                        <div className='img_button_container' >
                          {ImagesList.length >= 3 ? (<img className='gallery_image' src={ImagesList[2].imageURL} alt={ImagesList[2].title}/>) : (<div></div>)}
                          {ImagesList.length >= 6 ? (<img className='gallery_image' src={ImagesList[5].imageURL} alt={ImagesList[5].title}/>) : (<div></div>)}
                          {ImagesList.length >= 9 ? (<img className='gallery_image' src={ImagesList[8].imageURL} alt={ImagesList[8].title}/>) : (<div></div>)}
                        </div>
                      </div>
                    </div>
                  ) : (<div></div>)
                }
              </>
            </div> 
            <Link to='/Gallery'>
              <button
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "3rem",
                  marginLeft: "43vw",
                  color: "#A7D129",
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "transparent"
                }}
              >
                Watch more
              </button>
            </Link>
          </Container>
        </div>
        </div>
        // </section>
      )
      :
      (<div></div>)
    }
    </>
  );
}
