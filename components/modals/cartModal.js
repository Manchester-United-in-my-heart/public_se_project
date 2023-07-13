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
  }

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
      <div className={'absolute top-0 left-0 w-full h-full bg-black bg-opacity-80'}>
        <div className={'absolute border-blue-800 border-[4px] rounded-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-20 bg-white'}>
          <form>
          {cart.map(shop => (
                <div className={'px-4 py-2 border-green-300 border-[2px] mb-2'} id={shop.shopId}>
                  <p className={'text-xl'}>{shop.shopName}</p>
                  <div>
                    {shop.cartList.map((item) => (
                      <div className={'px-4 py-2 border-black border-[1px] mt-2'}>
                        <div id={item.productId}>
                          <div className={'flex justify-between'}>
                            <div>Tên sản phẩm: </div>
                            <div>{item.productName}</div>
                          </div>
                          <div className={'flex justify-between gap-4'}>
                            <label htmlFor={'quantity'}>Số lượng</label>
                            <input className={'border-[1px] border-blue-400 px-4'} id={'quantity'} type={'number'} defaultValue={item.quantity} {...register(item.productId, {setValueAs: v=>parseInt(v)})}/>
                          </div>
                          <div className={'flex justify-between'}>
                            <div>Đơn giá:</div>
                            <div>{item.price}</div>
                          </div>
                        </div>
                        <div className={'flex justify-end'}>
                          <button className={'px-2 py-1 border-black border-[2px] rounded-full hover:bg-red-600 hover:text-white transition-all duration-300'} onClick={handleSubmit(() =>{deleteHandler(item.productId)})}>Delete</button>
                        </div>
                      </div>
                      )
                    )}
                  </div>
                  <div className={'flex justify-center'}>
                    <button className={'px-2 py-1 border-black border-[2px] rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 mt-2'} onClick={handleSubmit(async(data)=>{await purchaseHandler(data, shop.shopId )})}> Đặt mua </button>
                  </div>
                </div>
              ))}
            </form>
            <div className={'flex justify-center'}>
              <button className={'px-2 py-1 border-black border-[2px] rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300 mt-2'} onClick={()=>{setIsCartModalOn(false)}}> Đóng </button>
            </div>
        </div>
      </div>
    </>
  )
}