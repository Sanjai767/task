import React, { useState } from 'react';
import axios from 'axios';

function PaymentSummary({ record, onClose }) {
  const [payAmount, setPayAmount] = useState('');

  const totalAmount = record.totalAmount || 0;
  const paidAmount = record.history?.reduce((acc, item) => acc + item.updatedAmount, 0) || 0;
  const remainingAmount = totalAmount - paidAmount;

  const handleSubmit = async () => {
    try {
      const newRemaining = remainingAmount - Number(payAmount);
      const pendingAmount = newRemaining <= 0 ? 0 : newRemaining;

      await axios.patch(`https://visitor-eta.vercel.app/api/visitors/${record._id}`, {
        pendingAmount,
        newPayment: {
          amount: Number(payAmount),
          paid: true,
        },
      });

      onClose(); // close or refresh
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  return (
    <div style={styles.container}>
      {/* Total Amount Display */}
      <div style={styles.header}>
        <div style={styles.labelLarge}>Total Amount:</div>
        <div style={styles.totalBox}>₹ {totalAmount}</div>
      </div>

      <hr style={styles.divider} />

      {/* Payment History */}
      {record.history && record.history.length > 0 && (
        <div>
          {record.history.map((item, index) => (
            <div key={index} style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Meeting Date</label>
                <input
                  type="text"
                  value={new Date(item.date).toLocaleDateString()}
                  disabled
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Amount</label>
                <input
                  type="text"
                  value={`₹ ${item.updatedAmount}`}
                  disabled
                  style={styles.inputRed}
                />
              </div>
              <button style={styles.paidBtn} disabled>Paid</button>
            </div>
          ))}
        </div>
      )}

      {/* Remaining Amount Entry */}
      <div style={styles.row}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Remaining Amount</label>
          <input
            type="number"
            placeholder={`₹ ${remainingAmount <= 0 ? 'Nil' : remainingAmount}`}
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            style={styles.inputEditable}
          />
        </div>
        <button style={styles.payBtn}>Pay</button>
      </div>

      {/* Footer Buttons */}
      <div style={styles.footer}>
        <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
        <button style={styles.submitBtn} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 500,
    margin: 'auto',
    background: '#fff',
    borderRadius: 10,
    border: '1px solid #ccc',
    fontFamily: 'Arial',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  labelLarge: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  totalBox: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: 5,
    fontWeight: 'bold',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #ccc',
    margin: '10px 0',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  inputGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
  },
  input: {
    padding: 8,
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  inputRed: {
    padding: 8,
    borderRadius: 4,
    border: '1px solid #e74c3c',
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: 'bold',
    backgroundColor: '#fef4f4',
  },
  inputEditable: {
    padding: 8,
    borderRadius: 4,
    border: '1px solid #27ae60',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  paidBtn: {
    backgroundColor: 'green',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: 6,
    border: 'none',
    fontWeight: 'bold',
    cursor: 'not-allowed',
  },
  payBtn: {
    backgroundColor: 'green',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: 6,
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  cancelBtn: {
    backgroundColor: '#7f8c8d',
    color: '#fff',
    padding: '10px 25px',
    borderRadius: 5,
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  submitBtn: {
    backgroundColor: '#c0392b',
    color: '#fff',
    padding: '10px 25px',
    borderRadius: 5,
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default PaymentSummary;
