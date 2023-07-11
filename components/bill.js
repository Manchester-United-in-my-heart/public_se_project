export default function Bill(props)
{
  const {cart, customerEmail, address, phone, totalPaid,isFulfilled, fulfillTrigger } = {...props}
  return (
    <div className={'flex justify-between gap-4'}>
      <div>
        Customer :  {customerEmail}
      </div>
      <div>
        Address :  {address}
      </div>
      <div>
        Phone :  {phone}
      </div>
      <div>
        <div> Cart :  {cart.map((item) => (
          <div key={item.productId}>
            <p> {item.productName} </p>
            <p> {item.price} </p>
            <p> {item.quantity} </p>
          </div>
        ))} </div>
      </div>
      <div>Total : {totalPaid}</div>
      <div>
        {isFulfilled ?
          (
            <div>
              <p> Đã hoàn thành </p>
            </div>
          ):
          (
            <div>
              <button onClick={() => fulfillTrigger()}> Hoàn thành ngay </button>
            </div>
          )}
      </div>
    </div>
  )
}