import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";

export default function EditProductForm(props)
{
  const {product, saveChangeHandler, deleteHandler, file, setFile, isUsedFile,setIsUsedFile} = {...props}
  const {handleSubmit, register, watch} = useForm()


  useEffect( () =>
    {
      setIsUsedFile(watch('option'))
    }
    , [watch('option')])
  useEffect( () =>
    {
      setFile(watch('file')[0])
    }
    , [watch('file')])

  return(
    <div className={'mx-32 border-[2px] border-black px-8 py-2'}>
      <form className={'flex flex-col gap-2'}>
        <div className={'flex justify-between'}>
          <div>
            <label className={'font-bold'} htmlFor="name">Tên sản phẩm:</label>
          </div>
          <div>
            <input className={'border-[2px]'} type="text" id={'email'} defaultValue={product.productName} {...register('productName', {required: true})}/>
          </div>
        </div>
        <div className={'flex justify-between'}>
          <div>
            <label className={'font-bold'} htmlFor="description">Mô tả:</label>
          </div>
          <div>
            <input className={'border-[2px]'} type="text" id={'description'} defaultValue={product.productDescription} {...register('productDescription', {required: true})}/>
          </div>
        </div>
        <div className={'flex justify-between'}>
          <div>
            <label className={'font-bold'} htmlFor="price">Giá:</label>
          </div>
          <div>
            <input className={'border-[2px]'} type="text" id={'price'} defaultValue={product.productPrice} {...register('productPrice', {required: true})}/>
          </div>
        </div>
        <div className={'flex justify-between'}>
          <div>
            <label className={'font-bold'} htmlFor="unit">Đơn vị tính:</label>
          </div>
          <div>
            <input className={'border-[2px]'} type="text" id={'unit'} defaultValue={product.productUnit} {...register('productUnit', {required: true})}/>
          </div>
        </div>
        <div className={'flex justify-between'}>
          <div>
            <label className={'font-bold'} htmlFor="option">Tải ảnh lên ?</label>
          </div>
          <div>
            <input className={'border-[2px]'} type="checkbox" id={'option'} {...register('option')}/>
          </div>
        </div>
        {isUsedFile ?
          <div className={'flex justify-between'}>
            <div>
              <label className={'font-bold'} htmlFor="uploadfile">Tải lên</label>
            </div>
            <div>
              <input className={'border-[2px]'} id={'uploadfile'} type={'file'} {...register('file')}/>
            </div>
          </div>:
          <div className={'flex justify-between'}>
            <div>
              <label className={'font-bold'} htmlFor="link">Đường dẫn:</label>
            </div>
            <div>
              <input className={'border-[2px]'} id={'link'} defaultValue={product.productImage} {...register('link')}/>
            </div>
          </div>
        }
      </form>
      <div className={'flex justify-center mt-2'}>
        <button className={'px-4 py-2 border-black border-[2px] rounded-full hover:bg-blue-600 hover:text-white duration-300 transition-all'} onClick={handleSubmit(saveChangeHandler)}>Lưu thay đổi</button>
      </div>
      <div className={'flex justify-center mt-2'}>
        <button className={'px-4 py-2 border-black border-[2px] rounded-full hover:bg-red-600 hover:text-white duration-300 transition-all'} onClick={handleSubmit(deleteHandler)}>Xóa sản phẩm</button>
      </div>
    </div>
  )

}