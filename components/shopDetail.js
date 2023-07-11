export default function ShopDetail(props) {
  const {id, name, email, password, address, phone, editModalHandler} = {...props}

  return (
    <>
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
        <button className={'px-4 py-2 border-[1px] rounded-2xl border-black hover:bg-blue-600 transition-all duration-300'} onClick={() => {editModalHandler({id, name, email, password, address, phone})}}>Edit</button>
      </div>
    </>
  )
}