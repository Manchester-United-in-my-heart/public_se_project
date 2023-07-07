export default function Bill(props)
{
  const {cart, customerEmail, address, phone, totalPaid} = {...props}
  return (
    <>
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
    </>
  )
}