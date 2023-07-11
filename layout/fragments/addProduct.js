import AddProductForm from "@/components/addProductForm";
export default function AddProductFragment(props)
{
  const {product, addHandler, file, setFile, isUsedFile,setIsUsedFile} = {...props}
  return(
    <div className={''}>
      <div className={'flex justify-center text-2xl font-bold'}>
        Thêm sản phẩm
      </div>
      <div>
        <AddProductForm product={product} addHandler={addHandler} file={file} setFile={setFile} isUsedFile={isUsedFile} setIsUsedFile={setIsUsedFile}/>
      </div>
    </div>)
}