export default function ShopDetail(props) {
  const {id, name, email, password, address, phone, editModalHandler} = {...props}

  return (
    <div className={'flex justify-center gap-x-2'}>
      <div>
        {name}
      </div>
      <div>
        {email}
      </div>
      <div>
        {password}
      </div>
      <div>
        {address}
      </div>
      <div>
        {phone}
      </div>
      <div>
        <button onClick={() => {editModalHandler({id, name, email, password, address, phone})}}>Edit</button>
      </div>
    </div>
  )
}