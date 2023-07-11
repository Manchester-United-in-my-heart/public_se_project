import {useForm} from "react-hook-form";

export default function AddModal(props) {
  const {name, email, password, address, phone, showHandler, addHandler} = {...props}

  const {register, handleSubmit, formState: {errors}} = useForm();

  return (
    <div className={'absolute flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.8)]'}>
      <div className={'w-full bg-white mx-40 pt-6 pb-10 border-[5px] border-blue-600 rounded-2xl'}>
        <form className={'flex flex-col gap-4 mx-40'}>
          <div className={'flex justify-between'}>
            <div className={'font-bold text-xl'}>
              <label htmlFor="name">Tên cửa hàng</label>
            </div>
            <div>
              <input className={'border-black border-[1px]'} type="text" id={'name'} defaultValue={name} {...register('name', {required: true})}/>
            </div>
          </div>
          <div className={'flex justify-between'}>
            <div className={'font-bold text-xl'}>
              <label htmlFor="email">Tên đăng nhập</label>
            </div>
            <div>
              <input className={'border-black border-[1px]'} type="text" id={'email'} defaultValue={email} {...register('email', {required: true})}/>
            </div>
          </div>
          <div className={'flex justify-between'}>
            <div className={'font-bold text-xl'}>
              <label htmlFor="password">Mật khẩu</label>
            </div>
            <div>
              <input className={'border-black border-[1px]'} type="text" id={'password'} defaultValue={password} {...register('password', {required: true})}/>
            </div>
          </div>
          <div className={'flex justify-between'}>
            <div className={'font-bold text-xl'}>
              <label htmlFor="address">Địa chỉ</label>
            </div>
            <div>
              <input className={'border-black border-[1px]'} type="text" id={'address'} defaultValue={address} {...register('address', {required: true})}/>
            </div>
          </div>
          <div className={'flex justify-between'}>
            <div className={'font-bold text-xl'}>
              <label htmlFor="phone">Số điện thoại</label>
            </div>
            <div>
              <input className={'border-black border-[1px]'} type="text" id={'phone'} defaultValue={phone} {...register('phone', {required: true})}/>
            </div>
          </div>
        </form>
        <div className={'flex justify-center'}>
          <button
            onClick={handleSubmit(
              async (data) => {
                await addHandler(data.name, data.email, data.password, data.address, data.phone)
              })}>Add
          </button>
        </div>
        <div className={'flex justify-center'}>
          <button onClick={() => {
            showHandler(false)
          }}>Close
          </button>
        </div>
      </div>

    </div>)
}