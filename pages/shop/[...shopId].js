import {getSession} from "next-auth/react";
import {set, useForm} from 'react-hook-form'
import {useEffect, useState} from "react";
export default function (props)
{
  console.log('props', props)
  const {register, handleSubmit, watch, setValue}= useForm();

  const [currentCart, setCurrentCart] = useState([...props.cart.cartList])

  const onSubmit = async (data) =>
    {
      console.log(data)
      // set all the values to 0
      props.productList.map((product) =>
        {
          setValue(product._id,0)
        }
      )

      // update current cart
      for (const product in data)
        {
          const productId = product
          const quantity = data[product]

          const productDetails = props.productList.find((product) => product._id === productId)

          if(quantity > 0)
          {
            const productIndex = currentCart.findIndex((product) => product.productId === productId)
            if(productIndex === -1)
            {
              setCurrentCart([...currentCart, {shopId: productDetails.shopId,productId:productId, quantity:quantity, price: productDetails.productPrice}])
            } else
            {
              const newCart = [...currentCart]
              newCart[productIndex].quantity += quantity
              setCurrentCart(newCart)
            }
          }
        }


    };

  useEffect(async () =>
  {
    console.log(currentCart)
    // update cart in database
    await fetch(`http://localhost:3000/api/customer?cartId=${props.cart._id}`,{
      method: 'PATCH',
      body: JSON.stringify({
        cartList: currentCart
      })
    })
  }, [currentCart])

  return(
    <form>
      {
        props.productList.map((product) =>
            <div className={'flex gap-3'} key={product._id}>
              <h1>{product.productName}</h1>
              <p>{product.productDescription}</p>
              <p>{product.productPrice}/{product.productUnit}</p>
              <img className={'w-[50%]'} src={product.productImage} alt={product.productName}/>
              <label htmlFor={product._id}>Quantity</label>
              <input id={product._id} type={'number'} defaultValue={0} placeholder={'Quantity'} {...register(product._id, {setValueAs: v=>parseInt(v)})}/>
              <button type={'submit'} onClick={handleSubmit(onSubmit)}>Add to Cart</button>
            </div>
        )
      }
    </form>
  )
}

export async function getServerSideProps({req,params})
{
  const session = await getSession({req})

  const shopId = params.shopId[0]

  const shopRes = await fetch(`http://localhost:3000/api/shop?shopId=${shopId}`)

  const productList = await shopRes.json()

  const cartRes  = await fetch(`http://localhost:3000/api/customer?cartId=${session.dispatchToken.user._id}`)

  const cart = await cartRes.json()

  console.log('api get', cart)

  return {
    props: {
      session:session,
      shopId:shopId,
      productList: productList.productList,
      cart: cart.cart
    }
  }
}