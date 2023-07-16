import ProductForm from "@/components/productForm";

export default function ProductSelectFragment(props) {
  const {shopName, productList, register, handleSubmit, onSubmit} = {...props}
  return (
    <>
      <div className={'flex justify-center text-2xl font-bold mb-10'}>
        Xin mời ghé thăm {shopName}
      </div>
      <form>
        <div className={'flex gap-4 flex-wrap'}>
          {
            productList.map((product) =>
              <ProductForm key={product._id} product={product} register={register} handleSubmit={handleSubmit}
                           onSubmit={onSubmit}/>)
          }
        </div>
      </form>
    </>
  )
}