import React, { useEffect } from "react";


const BarkRefundSuccessModal: React.FC = () => {
  const caseId = sessionStorage.getItem("case_id");
  const autoCloseSeconds = 3;

  // redirect crm method
  const redirectToCRM = () => {
    if (caseId) { 
      window.location.href = `https://cms.icslegal.com/add_edit_case.php?caseid=${caseId}`;
    } else {
      alert("Case ID not found in session.");
    }
  };

  // handle auto redirect
  useEffect(() => {
    if (!caseId) return;

    // Auto-redirect after specified seconds
    const timer = setTimeout(redirectToCRM, autoCloseSeconds * 1000);

    // Cleanup on unmount or dependency change
    return () => clearTimeout(timer);
  }, [caseId, autoCloseSeconds]);

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
        <h2 style={{ marginBottom: "15px" }}>Refund Submitted</h2>
        <p style={{ marginBottom: "25px", color: "#333" }}>
          Your refund request has been successfully processed and submitted.
        </p>
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
