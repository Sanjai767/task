import React, { useState } from 'react';
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';

const VisitorForm = () => {
  const [visitors, setVisitors] = useState([{ name: '', mobile: '+91', showError: false }]);

  const handleInputChange = (index, field, value) => {
    const updatedVisitors = [...visitors];

    if (field === 'mobile') {
      let input = value.replace('+91', '').replace(/\D/g, ''); // remove non-digits

      if (input.length > 10) input = input.slice(0, 10); // limit to 10 digits

      const finalMobile = '+91' + input;
      updatedVisitors[index].mobile = finalMobile;

      // Show error if not exactly 10 digits
      updatedVisitors[index].showError = input.length !== 10;
    } else {
      updatedVisitors[index][field] = value;
    }

    setVisitors(updatedVisitors);
  };

  const handleAddVisitor = () => {
    setVisitors([...visitors, { name: '', mobile: '+91', showError: false }]);
  };

  const handleSave = async () => {
    const hasError = visitors.some(visitor => visitor.showError || visitor.mobile.length !== 13);
    if (hasError) {
      alert("Please enter a valid 10-digit mobile number for all visitors.");
      return;
    }

    try {
      const response = await fetch("https://visitor-eta.vercel.app/api/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ visitors }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Visitors saved successfully!");
        setVisitors([{ name: '', mobile: '+91', showError: false }]);
      } else {
        alert("Failed to save visitors.");
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error saving visitors:", error);
      alert("An error occurred while saving visitors.");
    }
  };

  return (
    <div className="container p-4 rounded border shadow-sm" style={{ maxWidth: '600px', backgroundColor: '#fff' }}>
      <Row className="mb-2 fw-bold">
        <Col>Visitor Name</Col>
        <Col>Mobile Number</Col>
      </Row>

      {visitors.map((visitor, index) => (
        <Row key={index} className="mb-3 align-items-center">
          <Col>
            <Form.Control
              type="text"
              placeholder="Visitor Name"
              value={visitor.name}
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
            />
          </Col>
          <Col>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Mobile Number"
                value={visitor.mobile}
                onChange={(e) => handleInputChange(index, 'mobile', e.target.value)}
              />
              {index === visitors.length - 1 && (
                <Button variant="light" onClick={handleAddVisitor} className="border ms-2">
                  <Plus style={{ color: 'red', fontSize: '28px' }} />
                </Button>
              )}
            </InputGroup>
            {visitor.showError && (
              <small className="text-danger">Mobile number must be 10 digits.</small>
            )}
          </Col>
        </Row>
      ))}

      <div className="text-center">
        <Button variant="danger" onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default VisitorForm;
