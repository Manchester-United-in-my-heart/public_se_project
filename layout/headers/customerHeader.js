import {TiShoppingCart} from 'react-icons/ti'
export default function CustomerHeader(props){
  const {logoUrl, logoSrc, showCartHandler, signOutHandler} = {...props}

  return(
    <>
      <div className={'w-full flex justify-around items-center'}>
        <a href={logoUrl} className={'px-4'}>
          <img src={logoSrc} alt="logo" className={'w-20 h-20'}/>
        </a>
        <div className={'flex items-center gap-12'}>
          <div className={'px-4 py-2 border-black rounded-2xl border-[1px] hover:bg-green-500 transition-all duration-300'}>
            <button className={'flex gap-4 items-center'} onClick={()=>{showCartHandler(true)}}>
              <span>
                <TiShoppingCart size={32}/>
              </span>
              Giỏ hàng của bạn
            </button>
          </div>
          <div className={'px-4 py-2 border-black rounded-2xl border-[1px] hover:bg-blue-600 transition-all duration-300'}>
            <button onClick={async ()=>{await signOutHandler()}}>Đăng xuất</button>
          </div>
        </div>
      </div>
    </>
  )
}