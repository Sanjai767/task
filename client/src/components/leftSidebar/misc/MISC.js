import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  Grid,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogContent,
  DialogActions
} from '@mui/material';
import axios from 'axios';
import VisitorForm from '../../visitorform/VisitorForm';
import PaymentSummary from '../../paymentSummary/PaymentSummary';
import { FaArrowLeft } from 'react-icons/fa';


function MISC() {
  const [tableData, setTableData] = useState([]);
  const [showVisitorForm, setShowVisitorForm] = useState(false);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [visitorRecord, setVisitorRecord] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  const [defaultRow, setDefaultRow] = useState({
    name: '',
    attendance: false,
    visitor: false,
    amountPaid: false,
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/visitors')
      .then((response) => setTableData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/visitors/${id}`);
      // Remove deleted visitor from table
      setTableData(prev => prev.filter(visitor => visitor._id !== id));
    } catch (error) {
      console.error('Error deleting visitor:', error);
    }
  };
  

  const handlePendingAmountClick = (entry) => {
    if (!isNaN(entry.pendingAmount) && entry.pendingAmount !== '') {
      setSelectedRecord(entry);
      setShowPaymentSummary(true);
    }
  };

  const handleToggle = (entry, field) => {
    const updatedValue = !entry[field];
    axios.patch(`http://localhost:5000/api/visitors/${entry._id}`, {
      [field]: updatedValue,
    })
    .then(() => {
      setTableData((prevData) =>
        prevData.map((item) =>
          item._id === entry._id ? { ...item, [field]: updatedValue } : item
        )
      );
    })
    .catch((error) => console.error(`Failed to update ${field}:`, error));
  };
  

  const handleDefaultToggle = (field, value) => {
    setDefaultRow((prev) => ({ ...prev, [field]: value }));
    const updatedData = tableData.map((entry) => ({ ...entry, [field]: value }));
    setTableData(updatedData);

    updatedData.forEach((entry) => {
      axios.patch(`http://localhost:5000/api/visitors/${entry._id}`, {
        [field]: value,
      }).catch((err) => console.error(`Error updating ${field} for ${entry.name}:`, err));
    });
  };

  const handleVisitorClick = (entry) => {
    setVisitorRecord(entry);
    setShowVisitorForm(true);
  };

  const handleSaveVisitors = async (visitors) => {
    try {
      if (visitorRecord) {
        // update existing record
        await axios.post(`http://localhost:5000/api/visitors/${visitorRecord._id}/visitors`, {
          visitors,
        });
      } else {
        // handle default case — e.g., apply to all or create new record
        console.log('Saving default visitor form data:', visitors);
        // optional: bulk apply or save somewhere
      }

      setShowVisitorForm(false);
    } catch (err) {
      console.error('Error saving visitors:', err);
    }
  };


  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    setCurrentDate(formattedDate);
  }, []);
  return (
    <Container maxWidth="xl" style={{ minHeight: '100vh' }}>


      <div className='d-flex justify-content-between align-items-center p-3 shadow-sm bg-white rounded'>
        {/* Left Section */}
        <section className='d-flex align-items-center gap-2'>
          <button
            className="btn btn-sm text-white d-flex justify-content-center align-items-center"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'red',
              border: 'none',
            }}
          >
            <FaArrowLeft size={14} />
          </button>
          <h5 className='mb-0 text-danger'>MISC Report</h5>
        </section>


        {/* Right Section */}
        <section className="mb-3">
          <label htmlFor="meetingDate" className="form-label fw-semibold text-dark mb-1">
            Meeting Date
          </label>
          <input
            type="date"
            id="meetingDate"
            className="form-control shadow-sm border border-secondary-subtle rounded-3 px-3 py-2"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
          />
        </section>
      </div>



      <Grid container justifyContent="center" alignItems="center" direction="column">
        <TableContainer component={Paper} style={{ width: '100%' }}>
          <Table aria-label="attendance table">
            <TableHead>
              <TableRow>
                {['Photo', 'Name', 'Attendance', 'Visitor', 'Amount Paid', 'Pending Amount', 'Delete'].map((header) => (
                  <TableCell align="center" key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center" />
                <TableCell align="center">
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Enter Name"
                    value={defaultRow.name}
                    onChange={(e) => setDefaultRow({ ...defaultRow, name: e.target.value })}
                    sx={{
                      width: '100px',        // or any smaller width you prefer
                      fontSize: '0.75rem',   // smaller text
                      '& input': {
                        padding: '6px 8px',  // reduce input padding
                        fontSize: '0.75rem',
                      }
                    }}
                  />
                </TableCell>

                <TableCell align="center">
                  <Checkbox
                    checked={defaultRow.attendance}
                    onChange={(e) => handleDefaultToggle('attendance', e.target.checked)}
                    sx={{ '&.Mui-checked': { color: 'red' } }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant={defaultRow.visitor ? "contained" : "outlined"}
                    size="small"
                    onClick={() => {
                      setVisitorRecord(null);          // Clear previous selected visitor
                      setShowVisitorForm(true);        // Open modal
                    }}
                  >
                    +
                  </Button>
                </TableCell>

                <TableCell align="center">
                  <Checkbox
                    checked={defaultRow.amountPaid}
                    onChange={(e) => handleDefaultToggle('amountPaid', e.target.checked)}
                    sx={{ '&.Mui-checked': { color: 'red' } }}
                  />
                </TableCell>
                <TableCell align="center" />
                <TableCell align="center" />
              </TableRow>

              {tableData.map((entry, index) => (
                <TableRow
                  key={entry._id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'inherit'  // Light gray for even rows
                  }}
                >
                  <TableCell align="center">
                    <Avatar alt={entry.name} src={entry.avatar} />
                  </TableCell>
                  <TableCell align="center">
                    {entry.name}
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={entry.attendance}
                      onChange={() => handleToggle(entry, 'attendance')}
                      sx={{ '&.Mui-checked': { color: 'red' } }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant={entry.visitor ? "contained" : "outlined"}
                      size="small"
                      onClick={() => handleVisitorClick(entry)}
                    >
                      +
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={entry.amountPaid}
                      onChange={() => handleToggle(entry, 'amountPaid')}
                      sx={{ '&.Mui-checked': { color: 'red' } }}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handlePendingAmountClick(entry)}
                  >
                    {!isNaN(entry.pendingAmount) && entry.pendingAmount !== '' ? (
                      Number(entry.pendingAmount) === 0 ? (
                        <span
                          style={{

                            color: 'black',
                            fontWeight: 'bold',
                            padding: '6px 10px',
                            borderRadius: '3px',
                            fontSize: '0.75rem',
                            display: 'inline-block'
                          }}
                        >
                          Nill
                        </span>
                      ) : (
                        <span
                          style={{
                            backgroundColor: '#d32f2f',
                            color: '#fff',
                            fontWeight: 'bold',
                            padding: '6px 10px',
                            borderRadius: '3px',
                            fontSize: '0.75rem',
                            display: 'inline-block'
                          }}
                        >
                          ₹{entry.pendingAmount}
                        </span>
                      )
                    ) : (
                      entry.pendingAmount
                    )}

                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(entry._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Visitor Form Modal */}
        <Dialog open={showVisitorForm} onClose={() => setShowVisitorForm(false)} maxWidth="md" fullWidth>
          <DialogContent>
            <VisitorForm onSave={handleSaveVisitors} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowVisitorForm(false)} color="error">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Payment Summary Modal */}
        <Dialog open={showPaymentSummary} onClose={() => setShowPaymentSummary(false)} maxWidth="sm" fullWidth>
          <DialogContent>
            {selectedRecord && <PaymentSummary record={selectedRecord} />}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowPaymentSummary(false)} color="error">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Container>
  );
}

export default MISC;
