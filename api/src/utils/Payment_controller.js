const {
    SK_KEY
  } = process.env;
  const stripe = require('stripe')(SK_KEY);

const createPayment = async ([product, token]) => {

    
   
        const charges = await stripe.charges.create({
          source: token.id,
          amount: product.price * 100,
          currency: 'usd',
          receipt_email: token.email,
          description: product.name,
      })
    return charges     
}


module.exports = { createPayment };
