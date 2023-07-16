import {getSession} from "next-auth/react";
import {useForm} from 'react-hook-form'
import {useContext, useEffect, useState} from "react";
import NotificationContext from "@/store/notification-context";
import ProductSelectFragment from "@/layout/fragments/productSelect";
export default function (props)
{
  const {register, handleSubmit, watch, setValue}= useForm();
  const notificationContext = useContext(NotificationContext)
  const [currentCart, setCurrentCart] = useState({...props.cart.cartList})
  const [initialCart, setInitialCart] = useState({...props.cart.cartList})
  const onSubmit = async (data) =>
    {
      console.log(data)
      props.productList.map((product) =>
        {
          setValue(product._id,0)
        }
      )

      for (const product in data)
      {
        const productId = product
        const quantity = data[product]
        const productDetails = props.productList.find((product) => product._id === productId)
        if (quantity >0)
        {
          if (!Object.hasOwn(currentCart, props.shopId))
          {
            console.log('not added yet')
            const newCart = {...currentCart}
            newCart[props.shopId] = [{productId: productId,productName: productDetails.productName, quantity: quantity, price: productDetails.productPrice}]
            setCurrentCart(newCart)
          }
          else {
            const productIndex = currentCart[props.shopId].findIndex((product) => product.productId === productId)

            if (productIndex === -1) {
              const newCart = {...currentCart}
              newCart[props.shopId] = [ ...newCart[props.shopId], {
                productId: productId,
                productName: productDetails.productName,
                quantity: quantity,
                price: productDetails.productPrice
              }]
              setCurrentCart(newCart)
            } else {
              const newCart = {...currentCart}
              newCart[props.shopId][productIndex].quantity += quantity
              setCurrentCart(newCart)
            }
          }
        }
      }

    };

  useEffect(
    () => {
      if (Object.keys(currentCart).length !== Object.keys(initialCart).length) {
        const process = async () => {
          await fetch(`http://localhost:3000/api/customer?cartId=${props.cart.cartId}`, {
            method: 'PATCH',
            body: JSON.stringify({
              cartList: currentCart
            })
          })
        }

        notificationContext.showNotification(
          {
            isLoading: true,
            isSuccess: false,
            successMessage: '',
            isError: false,
            errorMessage: '',
          }
        )
        process().then(
          () => {
            notificationContext.showNotification(
              {
                isLoading: false,
                isSuccess: true,
                successMessage: 'Đã thêm vào giỏ hàng',
                isError: false,
                errorMessage: '',
              }
            )
          }
        )
      }
    }
    , [currentCart])

  return(
    <ProductSelectFragment shopName={props.shopName} productList={props.productList} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
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

  return {
    props: {
      session:session,
      shopId:shopId,
      productList: productList.productList,
      cart: cart.cart,
      shopName: productList.shopName
    }
  }
}