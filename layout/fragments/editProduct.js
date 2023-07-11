import EditProductForm from "@/components/editProductForm";
export default function EditProductFragment(props)
{
  const {product, saveChangeHandler, deleteHandler, file, setFile, isUsedFile,setIsUsedFile} = {...props}

  return(
    <div className={''}>
      <div className={'flex justify-center text-2xl font-bold'}>
        Cập nhật thông tin sản phẩm {product.productName}
      </div>
      <div>
        <EditProductForm product={product} saveChangeHandler={saveChangeHandler} deleteHandler={deleteHandler} file={file} setFile={setFile} isUsedFile={isUsedFile} setIsUsedFile={setIsUsedFile}/>
      </div>
    </div>
  )
}