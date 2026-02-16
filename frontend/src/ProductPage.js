import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const [loadingId, setLoadingId] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handlePayment = async (productId) => {
    try {
      setLoadingId(productId);

      const res = await axios.post("http://localhost:5000/create-payment", {
        productId,
        customerId: "6992d8f68a94e97ae5aa3edd"
      });

      console.log(res)

      navigate(`/payment/${res.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoadingId(null);
    }
  };

  const fetchProductList = async () => {
    try {
      const productList = await axios.get("http://localhost:5000/product");
      setProducts(productList.data.product);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const styles = {
    container: {
      padding: "40px",
      background: "#f4f6f9",
      minHeight: "100vh"
    },
    title: {
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "28px",
      fontWeight: "600"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px"
    },
    card: {
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      transition: "0.3s ease"
    },
    name: {
      fontSize: "18px",
      fontWeight: "600"
    },
    price: {
      fontSize: "16px",
      color: "#28a745",
      fontWeight: "bold"
    },
    vendor: {
      fontSize: "14px",
      color: "#555"
    },
    button: {
      marginTop: "10px",
      padding: "10px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      color: "#fff"
    },
    disabledButton: {
      background: "#ccc",
      cursor: "not-allowed"
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Our Products</h2>

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <h3 style={styles.name}>{product.name}</h3>
            <p style={styles.price}>₹ {product.price}</p>

            <p style={styles.vendor}>
              Vendor: {product?.vendorId?.userId?.name}
            </p>

            <button
              style={{
                ...styles.button,
                ...(loadingId === product._id ||
                  product?.vendorId?.status !== "active"
                  ? styles.disabledButton
                  : {})
              }}
              onClick={() => handlePayment(product._id)}
              disabled={
                loadingId === product._id ||
                product?.vendorId?.status !== "active"
              }
            >
              {loadingId === product._id ? "Processing..." : "Pay Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
