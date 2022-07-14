const {
    SK_KEY
  } = process.env;
  const stripe = require('stripe')(SK_KEY);

const createPayment = async ([product, token]) => {
  try{
 let charges = await stripe.charges.create({
          source: token.id,
          amount: product.price * 100,
          currency: 'usd',
          receipt_email: token.email,
          description: product.name,
      })
    return charges   
  }catch(error){
    return charges = error.code.charAt(0).toUpperCase() + error.code.slice(1).replace('_', ' ');
  }       

        
}


module.exports = { createPayment };
