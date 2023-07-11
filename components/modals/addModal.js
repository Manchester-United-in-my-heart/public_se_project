import {useForm} from "react-hook-form";

export default function AddModal(props) {
  const {name, email, password, address, phone, showHandler, addHandler} = {...props}

  const {register, handleSubmit, formState: {errors}} = useForm();

  return (
    <div className={'absolute flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.8)]'}>
      <div className={'w-full bg-white mx-40 pt-6 pb-10'}>
        <form>
          <div className={'flex justify-around'}>
            <div>
              <label htmlFor="name">Name</label>
            </div>
            <div>
              <input type="text" id={'name'} defaultValue={name} {...register('name', {required: true})}/>
            </div>
          </div>
          <div className={'flex justify-around'}>
            <div>
              <label htmlFor="email">Email</label>
            </div>
            <div>
              <input type="text" id={'email'} defaultValue={email} {...register('email', {required: true})}/>
            </div>
          </div>
          <div className={'flex justify-around'}>
            <div>
              <label htmlFor="password">Password</label>
            </div>
            <div>
              <input type="text" id={'password'} defaultValue={password} {...register('password', {required: true})}/>
            </div>
          </div>
          <div className={'flex justify-around'}>
            <div>
              <label htmlFor="address">Address</label>
            </div>
            <div>
              <input type="text" id={'address'} defaultValue={address} {...register('address', {required: true})}/>
            </div>
          </div>
          <div className={'flex justify-around'}>
            <div>
              <label htmlFor="phone">Phone</label>
            </div>
            <div>
              <input type="text" id={'phone'} defaultValue={phone} {...register('phone', {required: true})}/>
            </div>
          </div>
        </form>
        <div>
          <button
            onClick={handleSubmit(
              async (data) => {
                await addHandler(data.name, data.email, data.password, data.address, data.phone)
              })}>Add
          </button>
        </div>
        <div>
          <button onClick={() => {
            showHandler(false)
          }}>Close
          </button>
        </div>
      </div>

    </div>)
}