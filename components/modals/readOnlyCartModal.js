export default function ReadOnlyCartModal(props)
{

  const {cartModalProps,showHandler} = {...props}

  return(
    <div className={'absolute top-0 left-0 bg-[rgba(0,0,0,0.9)] w-screen h-screen'}>
      <div className={'mt-10 mx-20 bg-white'}>
        <div className={'flex justify-center text-2xl font-bold mb-10'}>
          Danh sách mua
        </div>
        <div className={'flex flex-col gap-4 overflow-hidden mx-10'}>
          {cartModalProps.map(cart => (
            <div key={cart._id}>
              <div className={'flex flex-col p-2 border-[1px] border-black'}>
                <div>
                  Tên sản phẩm:  {cart.productName}
                </div>
                <div>
                  Số lượng:  {cart.quantity}
                </div>
                <div>
                  Giá:  {cart.price}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={'flex justify-center'}>
          <button className={'px-2 py-2 hover:bg-blue-600 hover:text-white border-[1px] border-blue-400 rounded-2xl transition-all duration-300'} onClick={()=>{showHandler()}}>Đóng</button>
        </div>
      </div>
    </div>
  )
}