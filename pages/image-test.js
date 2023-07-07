import PaymentModal from "@/components/paymentModal";

export default function (){
  return(
    <PaymentModal shopName={'Bui Kham'} shopId={'123'} totalPaid={100000} setIsPaymentModalOn={false}/>
  )
}