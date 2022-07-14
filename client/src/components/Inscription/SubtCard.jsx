import React, {useState}from 'react';
import { useDispatch } from 'react-redux';
import { postInscription } from "../../redux/actions";
import Stripecheckout from 'react-stripe-checkout';

export default function SubtCard({id_subt, name, price, id_tournament}) {
  const id_user = 1
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [product, setProduct] = useState({
    name: name,
    price: price,
    id_tournament: id_tournament
  })


  const makePayment = token => {
    const body = {
      token,
      id_user,
      product
    }
    dispatch(postInscription(body));
  }
  return (
    <React.Fragment>
        <div key={id_subt}>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.id_tournament}</div>


         <Stripecheckout 
         stripeKey="pk_test_51LLBogC5JnQCZsvqgXxqWC00Ui3tQXiMSljwFGFv28WhZ69g54hmBGjb9XKE1mjZTsipyzW49f7CQ8G1qS6lWL9H00MY1ocH5Z"
         token={makePayment} 
         name={`Buy${product.name}`}
         amount={product.price * 100}>
        <button>Buy</button>
          </Stripecheckout> 
        </div>
    </React.Fragment>    
  )
}