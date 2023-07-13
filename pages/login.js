import {getSession,signIn} from "next-auth/react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {useContext} from "react";
import NotificationContext from "@/store/notification-context";

export default function ()
{

  const notificationCtx = useContext(NotificationContext)

  const {register,handleSubmit} = useForm()
  const router = useRouter()
  const onSubmit = async (data) =>
  {
    notificationCtx.showNotification({isLoading: true, isError: false, errorMessage: ''})
    const status =  await signIn('credentials',
        {
          redirect: false,
          email: data.email,
          password: data.password,
          role: data.role,
          callbackUrl: "http://localhost:3000"
        })

    if (!status.ok)
    {
      console.log(status.error)
      notificationCtx.showNotification(
        {
          isLoading: false,
          isSuccess: false,
          successMessage: '',
          isError: true,
          errorMessage: status.error})
    } else
    {
      notificationCtx.showNotification(
        {
          isLoading: false,
          isSuccess: true,
          successMessage: 'Đăng nhập thành công, đang chuyển hướng...',
          isError: false,
          errorMessage: ''})
      await router.push(status.url)
      notificationCtx.hideNotification()
    }
  }

 return (
   <div className={'flex flex-col items-center mt-40 gap-4'}>
     <div className={'text-2xl'}>
        Đăng nhập
     </div>
     <form className={'w-3/12 flex flex-col gap-4 '} onSubmit={handleSubmit(onSubmit)}>
       <div className={'flex w-full gap-4 justify-between'}>
         <label htmlFor={'username'}> Tên tài khoản:</label>
         <input id={'username'} type={'text'} className={'border-[1px] border-black'} {...register('email')}/>
       </div>
       <div className={'flex w-full gap-4 justify-between'}>
         <label htmlFor={'password'}>Mật khẩu:</label>
         <input id={'password'} type={'password'} className={'border-[1px] border-black'} {...register('password')}/>
       </div>
       <div className={'flex gap-4 justify-between'}>
         <label htmlFor={'role'}>Bạn là:</label>
         <select className={'px-4'} id={'role'} {...register('role')}>
           <option value={'customer'}>Khách hàng</option>
           <option value={'admin'}>Quản trị viên</option>
           <option value={'shop'}>Chủ shop</option>
         </select>
       </div>
     </form>
     <div>
        <button className={'border-2 border-black px-4 py-2 rounded-full hover:bg-blue-400 hover:text-white duration-300 transition-all'} onClick={handleSubmit(onSubmit)}>Đăng nhập</button>
     </div>

     <a className={'hover:text-blue-600 transition-all duration-300'} href={'/register'}> Bạn chưa có tài khoản ? Đăng ký ngay!</a>
   </div>
 )
}

export async function getServerSideProps({req}){
  const session = await getSession({req})

  if (session) {
    return {
      redirect:{
        destination: 'http://localhost:3000',
        permanent: true
      }
    }
  }

  return {
    props: {}
  }

}