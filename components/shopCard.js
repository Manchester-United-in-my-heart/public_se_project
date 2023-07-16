export default function ShopCard(props)
{
  const {shopName, shopAddress, shopPhone} = {...props}
  return(
    <div className={'pt-4 pl-2 pr-2 pb-1 border-black bg-blue-400'}>
      <div className={'text-2xl text-gray-200 font-bold'}>
        {shopName}
      </div>
      <div className={'pl-2 py-4 flex flex-col justify-center items-start bg-white'}>
        <div className={'text-xl'}>
          Địa chỉ: {shopAddress}
        </div>
        <div className={'text-xl'}>
          Số điện thoại: {shopPhone}
        </div>
      </div>
    </div>

  )
}
