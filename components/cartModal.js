import {useForm} from "react-hook-form";

export default function CartModal(props) {

  const {register, handleSubmit, watch, setValue}= useForm();

  const {cartList, shopList, setIsCartModalOn, purchaseHandler} = {...props}

  const newCartList = []

  for (const shopCart in cartList) {
    const shop = shopList.filter(shop => shop._id === shopCart)
    newCartList.push({shopId: shopCart, shopName: shop[0].name, cartList: cartList[shopCart]})
  }
  console.log(newCartList)
  return (
    <div className={'border-4'}>
      <form>
        {newCartList.map(shop => (
          <div id={shop.shopId}>
            <p className={'text-xl'}>{shop.shopName}</p>
            <div>
              {shop.cartList.map((item) =>
                <div id={item.productId}>
                  <p>Name:{item.productName}</p>
                  <input type={'number'} defaultValue={item.quantity} {...register(item.productId, {setValueAs: v=>parseInt(v)})}/>
                  <p>Price:{item.price}</p>
                </div>
              )}
            </div>
            <div>
              <button onClick={handleSubmit((data)=>{console.log(data)})}>Purchase</button>
            </div>
          </div>
        ))}
      </form>
      <div>
        <button onClick={()=>{setIsCartModalOn(false)}}>Close</button>
      </div>
    </div>
  )
}