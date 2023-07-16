export default function ProductForm(props)
{
  const {product, onSubmit, handleSubmit, register} = {...props}
  return(
    <div className={'w-60 h-96 p-2 border-black border-[2px]'}>
      <div className={'h-[20%] p-2 bg-blue-400 text-white overflow-hidden text-xl font-bold'}>
        {product.productName}
      </div>
      <div className={'h-[20%] overflow-hidden'}>
        <div className={'h-[50%] text-xl text-red-400'}>
          {product.productPrice} Đồng/ {product.productUnit}
        </div>
        <div className={'h-[50%] overflow-hidden'}>
          {product.productDescription}
        </div>
      </div>
      <div className={'h-[45%] flex justify-center gap-2'}>
        <img className={''} src={product.productImage} alt={product.productName}/>
      </div>
      <div className={'flex justify-between gap-2 mt-4'}>
        <input className={'w-2/3 border-[1px] border-black'} type={'number'} {...register(product._id, {setValueAs: v=>parseInt(v)})} defaultValue={0} min={0}/>
        <button className={'px-2 py-1 border-[1px] rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300 border-black'} type={'submit'} onClick={handleSubmit(onSubmit)} >Thêm</button>
      </div>
    </div>
  )
}