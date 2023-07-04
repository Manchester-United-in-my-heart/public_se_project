import {useForm} from "react-hook-form";

export default function EditModal(props) {
  const {name, email, password, address, phone, id, showHandler, deleteHandler, editHandler} = {...props}

  const {register, handleSubmit, formState: {errors}} = useForm();

  return (
    <div className={'flex justify-center'}>
      <div className={'w-1/2'}>
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
          <button onClick={handleSubmit(async (data) => {
            await editHandler(id, data.name, data.email, data.password, data.address, data.phone);
          })}>Edit
          </button>
        </div>
        <div>
          <button onClick={handleSubmit(async (data) => {
            await deleteHandler(id);
          })}>Delete
          </button>
        </div>
      </div>
      <div>
        <button onClick={() => {
          showHandler(false)
        }}>Close
        </button>
      </div>
    </div>
)
}