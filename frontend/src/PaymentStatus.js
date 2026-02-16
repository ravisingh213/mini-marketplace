import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PaymentStatus() {
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false)

  const fetchPaymentStatus = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`http://localhost:5000/payment/${id}`);
      setStatus(res.data.status);
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPaymentStatus()
  }, []);

  return (
    <div>
      <h2>Payment Status</h2>
      {
        loading ? <p>loading...</p> : <p>{status}</p>
      }
    </div>
  );
}

export default PaymentStatus;