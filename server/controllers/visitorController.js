const Visitor = require('../models/Visitor');

// Add new visitors
exports.addVisitors = async (req, res) => {
  try {
    const { visitors } = req.body;

    if (!Array.isArray(visitors) || visitors.length === 0) {
      return res.status(400).json({ error: 'Visitors list is empty or invalid' });
    }

    const enrichedVisitors = visitors.map(v => ({
      name: v.name,
      mobile: v.mobile,
      avatar: v.avatar || 'https://randomuser.me/api/portraits/women/45.jpg',
      attendance: false,
      amountPaid: false,
      totalAmount: 850,
      pendingAmount: 850,
    }));

    const result = await Visitor.insertMany(enrichedVisitors);
    res.status(201).json({ message: 'Visitors added', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add visitors' });
  }
};

// Get all visitors
exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
};

// Delete a visitor
exports.deleteVisitor = async (req, res) => {
  try {
    const deleted = await Visitor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Visitor not found' });
    res.json({ message: 'Visitor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete visitor' });
  }
};

// Update visitor
exports.updateVisitor = async (req, res) => {
  try {
    const updateFields = req.body;

    const allowedFields = ['attendance', 'amountPaid', 'pendingAmount', 'newPayment'];
    const isValidUpdate = Object.keys(updateFields).some(field => allowedFields.includes(field));

    if (!isValidUpdate) {
      return res.status(400).json({ error: 'Invalid fields in update' });
    }

    const updateData = {};
    if (typeof updateFields.attendance === 'boolean') {
      updateData.attendance = updateFields.attendance;
    }

    if (typeof updateFields.amountPaid === 'boolean') {
      updateData.amountPaid = updateFields.amountPaid;
    }

    if (updateFields.pendingAmount !== undefined) {
      updateData.pendingAmount = updateFields.pendingAmount;
      updateData.amountPaid = updateFields.pendingAmount === 0;
    }

    const updateQuery = { $set: updateData };

    if (updateFields.newPayment) {
      if (typeof updateFields.newPayment.amount !== 'number' || updateFields.newPayment.amount <= 0) {
        return res.status(400).json({ error: 'Invalid payment amount' });
      }

      updateQuery.$push = {
        history: {
          updatedAmount: updateFields.newPayment.amount,
        },
      };
    }

    const updated = await Visitor.findByIdAndUpdate(
      req.params.id,
      updateQuery,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Visitor not found' });

    res.json({ message: 'Visitor updated', data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update visitor' });
  }
};
