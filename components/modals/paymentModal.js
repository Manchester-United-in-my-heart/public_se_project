import {useForm} from "react-hook-form";
import {useSession} from "next-auth/react";
import {ImCancelCircle} from 'react-icons/im'
import {useContext} from "react";
import NotificationContext from "@/store/notification-context";
export default function PaymentModal(props)
{
  const notificationContext = useContext(NotificationContext)
  const session = useSession()
  const {cart, shopId, shopName, totalPaid, setIsPaymentModalOn, setIsDeleteTriggerOn} = {...props}
  const {register, handleSubmit, watch, setValue}= useForm();
  const onSubmit = async (data) => {

    notificationContext.showNotification(
      {
        isLoading: true,
        isSuccessful: false,
        successMessage: '',
        isError: false,
        errorMessage: '',
      }
    )

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
    notificationContext.showNotification(
      {
        isLoading: false,
        isSuccessful: true,
        successMessage: 'Đặt hàng thành công, chúng tôi sẽ liên hệ với bạn sớm nhất có thể để xác nhận đơn hàng. Cảm ơn bạn đã mua hàng tại shop!',
        isError: false,
        errorMessage: '',
      }
    )
    location.reload()
  }

  return (
    <div className={'absolute top-0 left-0 z-10 w-full h-full bg-black bg-opacity-80'}>
      <div className={'absolute border-blue-800 border-[4px] rounded-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-20 bg-white'}>
        <div className={'text-2xl text-center mb-4'}>Thông tin đặt hàng</div>
        <form className={'flex flex-col gap-4'}>
          <div className={'flex justify-between'}>
            <div className={'text-xl text-green-400'}>Tên cửa hàng: </div>
            <div className={'text-xl'}>{shopName} </div>
          </div>
          <div className={'flex justify-between'}>
            <div className={'text-xl text-yellow-400'}>Tổng thanh toán: </div>
            <div className={'text-xl'}>{totalPaid} (Đồng) </div>
          </div>
          <div className={'flex justify-between'}>
            <label htmlFor={'address'}> Địa chỉ: </label>
            <input className={'border-black border-[1px]'} type={'text'} id={'address'} {...register('address')} />
          </div>
          <div className={'flex justify-between'}>
            <label htmlFor={'phone'}> Số điện thoại: </label>
            <input className={'border-black border-[1px]'} type={'text'} id={'phone'} {...register('phone')} />
          </div>
        </form>
        <div className={'flex justify-center my-2'}>
          <button className={'px-2 py-1 border-black border-[2px] rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 mt-2'} onClick={handleSubmit(onSubmit)}>Đặt hàng</button>
        </div>
        <div className={'flex justify-center my-2'}>
          <button className={'flex gap-4 items-center px-2 py-1 border-black border-[2px] rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 mt-2'} onClick={() => setIsPaymentModalOn(false)}>Thoát <span><ImCancelCircle size={30}/> </span></button>
        </div>
      </div>
    </div>
  )

}