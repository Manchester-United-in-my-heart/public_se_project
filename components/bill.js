export default function Bill(props)
{
  const {cart, customerEmail, address, phone, totalPaid,isFulfilled, fulfillTrigger, setIsCartModalOn, setCartModalProps } = {...props}
  return (
    <div className={'flex flex-col justify-between gap-4 p-4 border-[2px] border-black'}>
      {isFulfilled?
        (
          <div className={'p-4 bg-green-500 font-bold text-white'}>
            Đã hoàn thành
          </div>
        ):
        (
          <div className={'p-4 bg-red-500 font-bold text-white'}>
            Chưa hoàn thành
          </div>
        )
      }
      <div className={'flex flex-col p-2 border-[1px] border-black'}>
        <div>
          Khách hàng:  {customerEmail}
        </div>
        <div>
          Địa chỉ:  {address}
        </div>
        <div>
          Số điện thoại :  {phone}
        </div>
        <div>
          <button onClick={()=>{setCartModalProps(cart); setIsCartModalOn(true)}}>Xem danh sách</button>
        </div>
        <div>Tổng thanh toán : {totalPaid}</div>
        <div>
          {isFulfilled ?
            (
              <div className={'px-2 py-2'}>
                <p> Đã hoàn thành </p>
              </div>
            ):
            (
              <div>
                <button className={'px-2 py-2 hover:bg-blue-600 hover:text-white border-[1px] border-blue-400 rounded-2xl transition-all duration-300'} onClick={() => fulfillTrigger()}> Đánh dấu đã hoàn thành </button>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}