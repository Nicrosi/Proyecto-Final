import React, {useState}from 'react';
import { useDispatch } from 'react-redux';
import { postInscription } from "../../redux/actions";
import Stripecheckout from 'react-stripe-checkout';
import Card from 'react-bootstrap/Card'

export default function SubtCard({id_subt, name, price, id_tournament, id_user, email}) {
  const user = id_user
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [product, setProduct] = useState({
    name: name,
    price: price,
    email: email,
    id_tournament: id_tournament
  })


  const makePayment = token => {
    const body = {
      token,
      user,
      product
    }
    dispatch(postInscription(body));
  }
  return (
    <React.Fragment>      
      <Card bg='light' style={{ width: '20rem' }} className='mb-2'>
        <Card.Body className='d-flex justify-content-between'>
          <div>{product.name}</div>
          <div>US$ {product.price}</div>
          <Stripecheckout 
            stripeKey="pk_test_51LLBogC5JnQCZsvqgXxqWC00Ui3tQXiMSljwFGFv28WhZ69g54hmBGjb9XKE1mjZTsipyzW49f7CQ8G1qS6lWL9H00MY1ocH5Z"
            token={makePayment}          
            name={`Buy ${product.name}`}
            amount={product.price * 100}
            email={product.email}>
            <button className='btn btn-primary'>Buy</button>
          </Stripecheckout>                   
        </Card.Body>
      </Card>
    </React.Fragment>    
  )
}