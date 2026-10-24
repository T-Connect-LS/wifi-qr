const express = require('express');
const router = express.Router();
const { createVisitor } = require('./model');

router.post('/register', async (req, res) => {
  try {
    // Added 'location' to destructuring
    const { fullName, connectReason, phone, email, location, knowsTConnect } = req.body;

    if (!fullName || fullName.trim() === '') {
      return res.status(400).json({ success: false, error: 'Full name is required' });
    }
    if (!phone || phone.trim() === '') {
      return res.status(400).json({ success: false, error: 'Phone number is required' });
    }

    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const visitor = await createVisitor({
      firstName,
      lastName,
      business: connectReason || null,
      phone: phone.trim(),
      email: email ? email.trim() : null,
      area: location || 'Green City', // ✅ Saves "Green City" to the database
      useCase: knowsTConnect === 'yes' ? 'business' : 'home' 
    });

    res.status(201).json({
      success: true,
      message: 'Device registered successfully',
      data: {
        id: visitor.id,
        fullName: `${visitor.first_name} ${visitor.last_name}`.trim(),
        business: visitor.business,
        useCase: visitor.use_case,
        connectedAt: visitor.connected_at,
        knowsTConnect: knowsTConnect
      }
    });

  } catch (error) {
    console.error('===== REGISTRATION ERROR =====');
    console.error('Message:', error.message);
    console.error('Detail:', error.detail);
    console.error('Code:', error.code);
    console.error('==============================');
    res.status(500).json({
      success: false,
      error: 'Registration failed. Please try again.',
      debug: error.message
    });
  }
});

router.get('/config', (req, res) => {
  res.json({
    success: true,
    data: {
      splashUrl: process.env.SPLASH_URL || null
    }
  });
});

module.exports = router;