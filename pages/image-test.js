import PaymentModal from "@/components/modals/paymentModal";

export default function (){
  return(
    <PaymentModal shopName={'Bui Kham'} shopId={'123'} totalPaid={100000} setIsPaymentModalOn={false}/>
  )
}