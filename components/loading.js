import {FiAlertTriangle} from 'react-icons/fi'
 import {MdDone} from "react-icons/md";
import NotificationContext from "@/store/notification-context";
import {useContext} from "react";
export default function Loading(props)
{

  const notificationCtx = useContext(NotificationContext)


  const {isLoading, isSuccess, successMessage, isError, errorMessage} = {...props}
  return (
    <>
      {isLoading ? (
        <div className="fixed bg-black opacity-80 top-0 left-0 z-50 w-screen h-screen flex items-center justify-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          Loading...
        </div>
      ):
        isSuccess ? (
            <div className="fixed bg-black opacity-80 top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
              <div className={''}>
                <MdDone size={50} className={'text-green-600'}/>
              </div>
              <div className={'text-white text-2xl'}>{successMessage}</div>
              <div className={'p-4 text-white'}>
                <button onClick={() => {notificationCtx.hideNotification()}}>OK</button>
              </div>
            </div>
          )
        :
        isError ? (
        <div className="fixed bg-black opacity-80 top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
          <div className={''}>
            <FiAlertTriangle size={50} className={'text-red-600'}/>
          </div>
          <div className={'text-yellow-500 text-2xl'}>{errorMessage}</div>
          <div className={'p-4 text-white'}>
            <button onClick={() => {notificationCtx.hideNotification()}}>OK</button>
          </div>
        </div>
        ):
        <></>
      }
    </>
  )

}