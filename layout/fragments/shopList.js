import ShopCard from "@/components/shopCard";

export default function ShopFragment(props)
{
  const {shopList} = {...props}

  return(
    <>
      <div className={'flex justify-center text-2xl font-bold mb-10'}>
        Danh sách cửa hàng
      </div>
      <div className={'flex gap-4 flex-wrap mb-10'}>
        {shopList.map(shop => (
          <a href={`shop/${shop._id}`} key={shop._id}>
            <ShopCard shopName={shop.name} shopAddress={shop.address} shopPhone={shop.phone} />
          </a>
        ))}
      </div>
    </>
  )
}