import ProductCard from "@/components/productCard";
export default function ProductFragment(props)
{
  const {productList, addUrl} = {...props}
  return(
    <div className={'flex flex-col gap-4 mx-32'}>
      <div className={'text-2xl font-bold flex justify-center'}>
        Danh sách sản phẩm
      </div>
      {productList && productList.map(product => (
        <div key={product._id} className={''}>
          <ProductCard productImage={product.productImage} productName={product.productName} productDescription={product.productDescription} productPrice={product.productPrice} productUnit={product.productUnit} productLink={`/product/${product._id}`}/>
        </div>))}
      <div className={'flex justify-center mb-4'}>
        <a className={'px-6 py-3 border-black border-[1px] rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300'} href={addUrl}> Thêm sản phẩm </a>
      </div>
    </div>
  )
}