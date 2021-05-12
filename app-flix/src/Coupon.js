import './Coupon.css';


function Coupon() {
   return (
      <div className="coupon" style={{ backgroundImage: "url('./assets/images/bg-promotion.svg')" }}>

         <h1>APROVEITE AGORA</h1>
         <div className="coupon_txt">
            <img src="./assets/images/coupon-circle-icon.svg" alt="" />
            <p>CUPOM: HTMLNAOELINGUAGEM</p>
         </div>

         <h2>FINALIZA EM:</h2>
         <div className="coupon_timer">
            <img src="./assets/images/time-icon.svg" alt="" />
            <p>00:04:52</p>
         </div>

         <img className="money" src="./assets/images/money.png" alt="money" />

      </div>
   );
}

export default Coupon;