import {useForm} from "react-hook-form";

export default function EditModal(props) {
  const {name, email, password, address, phone, id, showHandler, deleteHandler, editHandler, notificationContext} = {...props}

  const {register, handleSubmit, formState: {errors}} = useForm();

  return (
    <div className={'absolute flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.8)]'}>
      <div className={'w-full mx-40 pt-6 pb-10 border-[5px] rounded-2xl border-blue-400 bg-white opacity-100 text-black'}>
        <div className={'w-full'}>
          <form className={'flex flex-col gap-4 mx-40'}>
            <div className={'flex justify-between'}>
              <div className={'font-bold text-xl'}>
                <label htmlFor="name">Tên cửa hàng</label>
              </div>
              <div>
                <input className={'text-black'} type="text" id={'name'} defaultValue={name} {...register('name')}/>
              </div>
            </div>
            <div className={'flex justify-between'}>
              <div className={'font-bold text-xl'}>
                <label htmlFor="email">Tên đăng nhập</label>
              </div>
              <div>
                <input className={'text-black'} type="text" id={'email'} defaultValue={email} {...register('email')}/>
              </div>
            </div>
            <div className={'flex justify-between'}>
              <div className={'font-bold text-xl'}>
                <label htmlFor="password">Mật khẩu</label>
              </div>
              <div>
                <input className={'text-black'} type="text" id={'password'} defaultValue={password} {...register('password')}/>
              </div>
            </div>
            <div className={'flex justify-between'}>
              <div className={'font-bold text-xl'}>
                <label htmlFor="address">Địa chỉ</label>
              </div>
              <div>
                <input className={'text-black'} type="text" id={'address'} defaultValue={address} {...register('address')}/>
              </div>
            </div>
            <div className={'flex justify-between'}>
              <div className={'font-bold text-xl'}>
                <label htmlFor="phone">Số điện thoại</label>
              </div>
              <div>
                <input className={'text-black'} type="text" id={'phone'} defaultValue={phone} {...register('phone')}/>
              </div>
            </div>
          </form>

          <div className={'flex justify-center py-2'}>
            <button className={'px-4 py-2 border-[1px] border-black rounded-2xl hover:bg-green-600 hover:text-white transition-all duration-300 '}
                    onClick={handleSubmit(async (data) => {
                      notificationContext.showNotification(
                        {
                          isLoading: true,
                          isSuccess: false,
                          successMessage: '',
                          isError: false,
                          errorMessage: '',
                        }
                      )
                      await editHandler(id, data.name, data.email, data.password, data.address, data.phone);
                      notificationContext.showNotification(
                        {
                          isLoading: false,
                          isSuccess: true,
                          successMessage: 'Cập nhật thành công',
                          isError: false,
                          errorMessage: '',
                        }
                      )
                    })}> Lưu thay đổi
            </button>
          </div>
          <div className={'flex justify-center py-2'}>
            <button className={'px-4 py-2 border-[1px] border-black rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300'} onClick={handleSubmit(async (data) => {
              notificationContext.showNotification(
                {
                  isLoading: true,
                  isSuccess: false,
                  successMessage: '',
                  isError: false,
                  errorMessage: '',
                }
              )
              await deleteHandler(id);
              notificationContext.showNotification(
                {
                  isLoading: false,
                  isSuccess: true,
                  successMessage: 'Xóa thành công',
                  isError: false,
                  errorMessage: '',
                }
              )
            })}> Xóa cửa hàng
            </button>
          </div>
          <div className={'flex justify-center py-2'}>
            <button className={'px-4 py-2 border-[1px] border-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300'}  onClick={() => {
              showHandler(false)
            }}>Close
            </button>
          </div>
        </div>

      </div>
    </div>
)
}