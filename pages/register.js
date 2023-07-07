import {useForm} from 'react-hook-form'
import Loading from "@/components/loading";
import NotificationContext from "@/store/notification-context";
import {useContext} from "react";
export default function (props)

{
    const notificationCtx = useContext(NotificationContext)

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
        notificationCtx.showNotification({isLoading: false, isError: true, errorMessage: 'same email existed'})
      } else {
        notificationCtx.hideNotification()
      }
    }

    return (
      <>
        <form>
          <div>
            <label htmlFor={'email'}>
             Email
            </label>
            <input id={'email'} type={'email'} {...register('email', {validate: {
                maxLength: (v) =>
                  v.length <= 50 || "The email should have at most 50 characters",
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  "Email address must be a valid address",
              }})}/>
            {errors.email?.message && (
              <small>{errors.email.message}</small>
            )}
          </div>
          <div>
            <label htmlFor={'password'}>
              Password
            </label>
            <input id={'password'} type={'password'} {...register('password')}/>
          </div>
          <div>
          <div>
            <label htmlFor={'repassword'}>
              Retype Password
            </label>
            <input id={'repassword'} type={'password'} {...register('repassword')}/>
          </div>
          </div>
        </form>
        <button onClick={handleSubmit(onSubmit)}>Submit</button>
      </>
    )
}