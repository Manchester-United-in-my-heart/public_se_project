import {useForm} from "react-hook-form";
import PaymentModal from "@/components/paymentModal";
import {useEffect, useState} from "react";
export default function CartModal(props) {

  const {register, handleSubmit, watch, setValue}= useForm();

  const {cartId ,cartList, shopList, setIsCartModalOn} = {...props}

  const [isPaymentModalOn, setIsPaymentModalOn] = useState(false)

  const [isDeleteTriggerOn, setIsDeleteTriggerOn] = useState(false)

  const [idDeletedShop, setIdDeletedShop] = useState('')

  const [paymentModalProps, setPaymentModalProps] = useState({
    shopName: '',
    shopId: '',
    totalPaid: 0,
    cart: [],
    setIsPaymentModalOn: setIsPaymentModalOn,
    setIsDeleteTriggerOn: setIsDeleteTriggerOn
  })

  const newCartList = []

  // this below function is violated to MVC

  for (const shopCart in cartList) {
    const shop = shopList.filter(shop => shop._id === shopCart)
    newCartList.push({shopId: shopCart, shopName: shop[0].name, cartList: cartList[shopCart]})
  }

  const [cart, setCart] = useState(newCartList)
  const purchaseHandler = async (data, shopId) => {
    setIdDeletedShop(shopId)
    const cartList = []
    // filter all product that matches shopId
    for (const shop in cart) {
      if (cart[shop].shopId === shopId) {
        for (const item in cart[shop].cartList) {
          cartList.push(
            {
              ...cart[shop].cartList[item],
              quantity: data[cart[shop].cartList[item].productId]
            }
          )
        }
      }
    }

    let cloneCart = [...cart]

    for (const shop in cloneCart) {
      if (cloneCart[shop].shopId === shopId) {
        cloneCart[shop].cartList = cartList
      }
    }

    setCart(cloneCart)

    const totalPaid = cartList.reduce((total, item) => total + item.price * item.quantity, 0)


    setPaymentModalProps({
      ...paymentModalProps,
      shopName: cartList[0].shopName,
      cart: cartList,
      shopId: shopId,
      totalPaid: totalPaid
    })
    setIsPaymentModalOn(true)

  }
  if (isDeleteTriggerOn === true)
  {
    console.log('delete trigger on')
    let cloneCart = [...cart]
    cloneCart = cloneCart.filter(shop => shop.shopId !== idDeletedShop)
    setCart(cloneCart)
    setIsDeleteTriggerOn(false)
    // location.reload()
  }
  const deleteHandler = (productId) => {
    const cloneCart = [...cart]
    for (const shop in cloneCart) {
      for (const item in cloneCart[shop].cartList) {
        if (cloneCart[shop].cartList[item].productId === productId) {
          cloneCart[shop].cartList.splice(item, 1)
        }
      }
    }
    setCart(cloneCart)
    console.log(cart)
  }

  console.log(cart === newCartList)
  useEffect( () =>
  {
    if (cart === newCartList) return
    const preparedCart = {}
    for (const shop in cart) {
      preparedCart[cart[shop].shopId] = cart[shop].cartList
    }
    const body = {
      cartId: cartId,
      cartList: preparedCart
    }
    const process = async () =>
    {
      await fetch(`http://localhost:3000/api/customer?cartId=${cartId}`,{
        method: 'PATCH',
        body: JSON.stringify(body)
      })
    }
    process()
  }, [cart, isDeleteTriggerOn])
  return (
    <>
      {isPaymentModalOn && <PaymentModal {...paymentModalProps}/>}
    <div className={'border-4'}>
      <form>
        {cart.map(shop => (
          <div id={shop.shopId}>
            <p className={'text-xl'}>{shop.shopName}</p>
            <div>
              {shop.cartList.map((item) => (
                <>
                  <div id={item.productId}>
                    <p>Name:{item.productName}</p>
                    <input type={'number'} defaultValue={item.quantity} {...register(item.productId, {setValueAs: v=>parseInt(v)})}/>
                    <p>Price:{item.price}</p>
                  </div>
                  <div>
                    <button onClick={handleSubmit(() =>{deleteHandler(item.productId)})}>Delete</button>
                  </div>
                </>
                )

              )}
            </div>
            <div>
              <button onClick={handleSubmit(async(data)=>{await purchaseHandler(data, shop.shopId )})}>Purchase</button>
            </div>
          </div>
        ))}
      </form>
      <div>
        <button onClick={()=>{setIsCartModalOn(false)}}>Close</button>
      </div>
    </div>
    </>
  )
}