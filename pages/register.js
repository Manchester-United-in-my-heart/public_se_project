import {useForm} from 'react-hook-form'
import NotificationContext from "@/store/notification-context";
import {useContext} from "react";
import {useRouter} from "next/router";
export default function (props)

{
    const notificationCtx = useContext(NotificationContext)
    const router = useRouter()
    const {register, handleSubmit, watch,formState:{errors}, setValue}= useForm({mode: "onBlur"});
    const onSubmit = async (data) => {
      if (data.password !== data.repassword) {
        console.log('password not match')
        return
      }

      notificationCtx.showNotification({isLoading: true, isError: false, errorMessage: ''})
      const res = await fetch('http://localhost:3000/api/customer', {
        method: 'POST',
        body: JSON.stringify(
          {
            email: data.email,
            password: data.password
          }
        )
      })
      const result = await res.json()

      if (result.mess == 'same email existed')
      {
        notificationCtx.showNotification({isLoading: false, isSuccess: false, successMessage: '', isError: true, errorMessage: 'Tên đăng nhập đã tồn tại'})
      } else {
        notificationCtx.showNotification
        ({isLoading: false, isSuccess: true, successMessage: 'Đăng ký thành công, đang chuyển hướng...', isError: false, errorMessage: ''})
        await router.push('/')
        notificationCtx.hideNotification()
      }
    }

    return (
      <>
        <div className={'flex flex-col items-center text-2xl'}>
          Xin chào, đây là trang đăng ký.
        </div>
        <div className={'flex flex-col items-center'}>
          Vui lòng điền thông tin vào form bên dưới để đăng ký tài khoản
        </div>
        <div className={'flex flex-col items-center mt-10'}>
          <form className={'flex w-max flex-col gap-4'}>
            <div className={'flex gap-4 justify-between'}>
              <label htmlFor={'email'}>
                Tên tài khoản (email):
              </label>
              <input className={'border-[1px] border-black'} id={'email'} type={'email'} {...register('email', {validate: {
                  maxLength: (v) =>
                    v.length <= 50 || "The email should have at most 50 characters",
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Email address must be a valid address",
                }})}/>
              {/*{errors.email?.message && (*/}
              {/*  <small>{errors.email.message}</small>*/}
              {/*)}*/}
            </div>
            <div className={'flex gap-4 justify-between'}>
              <label htmlFor={'password'}>
                Mật khẩu
              </label>
              <input className={'border-[1px] border-black'} id={'password'} type={'password'} {...register('password')}/>
            </div>
            <div>
            <div className={'flex gap-4 justify-between'}>
              <label htmlFor={'repassword'}>
                Nhập lại mật khẩu:
              </label>
              <input className={'border-[1px] border-black'} id={'repassword'} type={'password'} {...register('repassword')}/>
            </div>
            </div>
          </form>
          <button className={'border-2 px-4 py-2 rounded-full mt-4 hover:bg-blue-400 duration-300 transition-all'} onClick={handleSubmit(onSubmit)}>Submit</button>
        </div>
      </>
    )
}