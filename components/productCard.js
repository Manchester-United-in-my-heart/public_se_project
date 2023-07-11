export default function ProductCard(props)
{
  return(
    <div className="px-4 py-2 grid grid-cols-12 border-[1px] border-black ">
        <img src={props.productImage} alt="product image" className={"w-48 col-start-1 col-end-4"}/>
        <div className="flex flex-col col-start-4 col-end-10">
          <h1 className="text-xl font-bold">Tên sản phẩm: {props.productName}</h1>
          <p className="text-lg">Giá: {props.productPrice} VND/{props.productUnit}</p>
          <p className="text-lg">Mô tả: {props.productDescription}</p>
        </div>
        <div className={'col-start-10 col-end-12 mt-2'}>
          <a className={'px-4 py-2 border-black border-[1px] rounded-2xl hover:bg-blue-600 hover:text-white duration-300 transition-all'} href={props.productLink}>Chi tiết</a>
        </div>
    </div>
  )
}