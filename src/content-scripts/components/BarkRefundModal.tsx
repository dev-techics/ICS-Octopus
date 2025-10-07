import React, { useEffect } from "react";
import type { BarkRefundModalParamsType } from "../../types/type";

const BarkRefundSuccessModal: React.FC<BarkRefundModalParamsType> = ({
  title,
  description,
  redirect = false, // default to false
}) => {
  const caseId = sessionStorage.getItem("case_id");
  const autoCloseSeconds = 1;
  const REDIRECT_URL = `https://cms.icslegal.com/add_edit_case.php?caseid=${caseId}`;
  const ALERT_MESSAGE = 'Case ID not found in session.';

  // redirect crm method
  const redirectToCRM = () => {
    caseId ? window.location.href = REDIRECT_URL : alert(ALERT_MESSAGE);
  };

  // handle auto redirect only if redirect=true
  useEffect(() => {
    if (!redirect || !caseId) return;
    const timer = setTimeout(redirectToCRM, autoCloseSeconds * 1000);
    return () => clearTimeout(timer);
  }, [redirect, caseId, autoCloseSeconds]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "30px 40px",
          maxWidth: "500px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>{title}</h2>
        <p style={{ marginBottom: "25px", color: "#333" }}>{description}</p>
        <button
          onClick={redirectToCRM}
          style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Back to CRM
        </button>
      </div>
    </div>
  );
};

export default BarkRefundSuccessModal;
