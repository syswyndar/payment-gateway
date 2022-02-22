import "./styles/CardStyle.css";
import BalanceCard from "../components/BalanceCard";
import Swal from "sweetalert2";
import { useEffect } from "react";

const WalletPage = () => {
  useEffect(() => {
    
  }, []);

 
  const handleClick = async () => {
    const { value: amount } = await Swal.fire({
      title: "Top Up Amount",
      input: "text",
      width: 800,
      height: 1000,
      inputLabel: "Minimum Rp 10.000",
      position: "center",
      allowEnterKey: true,
    });

    // if (amount) {
    //   if (isNaN(+amount)) {
    //     errorAlert("Please input number");
    //   } else {
    //     dispatch(doTopUp(amount))
    //       .then((data) => {
    //         console.log(data);
    //         window.snap.pay(data.token);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }
    // }
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <BalanceCard/>
      <div>
        <button class="btn btn-accent mt-10" onClick={handleClick}>
          Top Up
        </button>
      </div>
    </div>
  );
};

export default WalletPage;
