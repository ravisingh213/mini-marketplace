import React, { useEffect, useState } from "react";
import axios from "axios";

function VendorDashboard() {
  const [loading, setLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [status, setStatus] = useState("");
  const [wallet, setWallet] = useState(0);

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get("http://localhost:5000/vendor/6992d8f68a94e97ae5aa3edd");
      const walletRes = await axios.get("http://localhost:5000/vendor/wallet/699333ac795ee96cd5a5d585");

      setWallet(walletRes.data.balance);
      setStatus(res.data.status);
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  };

  const startOnboarding = async () => {
    setBtnLoading(true)
    try {
      const response = await axios.post("http://localhost:5000/vendor/onboard", {
        userId: "6992d8f68a94e97ae5aa3edd"
      });
      console.log(response)
      setStatus(response?.data?.vendor?.status)
    } catch (error) {
      console.error(error)
    } finally {
      setBtnLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Vendor Dashboard</h2>
      {
        loading ? <div>Loading.............</div> : <>
          <p>Status: {status}</p>
          <p>Wallet Balance: ₹{wallet}</p>
          {status === "not_connected" ? (
            <button onClick={startOnboarding} disabled={btnLoading}>{btnLoading ? "Onboarding..." : "Start Onboarding"}</button>
          ) : status === "pending" && <button onClick={startOnboarding} disabled={btnLoading}>{btnLoading ? "Onboarding..." : "Resume Onboarding"}</button>}
        </>
      }
    </div>
  );
}

export default VendorDashboard;