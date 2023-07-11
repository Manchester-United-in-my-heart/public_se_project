import {useForm} from "react-hook-form";
import {useSession} from "next-auth/react";
export default function PaymentModal(props)
{
  const session = useSession()
  const {cart, shopId, shopName, totalPaid, setIsPaymentModalOn, setIsDeleteTriggerOn} = {...props}
  const {register, handleSubmit, watch, setValue}= useForm();
  const onSubmit = async (data) => {
    const billBody = {
      shopId: shopId,
      customerId: session.data.dispatchToken.user._id,
      customerEmail: session.data.dispatchToken.user.email,
      cart: cart,
      totalPaid: totalPaid,
      address: data.address,
      phone: data.phone,
      isFulfilled: false,
      dateCreate: new Date()
    }

    const res = await fetch('/api/bill', {
      method: 'POST',
      body: JSON.stringify(billBody)
    })

    setIsDeleteTriggerOn(true)
    setIsPaymentModalOn(false)
  }

  return (
    <>
      <form>
        <div>
          <p> Shop :  {shopName} </p>
        </div>
        <div>
          <p> Total :  {totalPaid} </p>
        </div>
        <div>
          <label htmlFor={'address'}> Address </label>
          <input type={'text'} id={'address'} {...register('address')} />
        </div>
        <div>
          <label htmlFor={'phone'}> Phone </label>
          <input type={'text'} id={'phone'} {...register('phone')} />
        </div>
      </form>
      <button onClick={handleSubmit(onSubmit)}>Submit</button>

      <div>
        <button onClick={() => setIsPaymentModalOn(false)}>Cancel</button>
      </div>
    </>
  )

}