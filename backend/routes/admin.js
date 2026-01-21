const express = require('express');
const router = express.Router();
// Changed 'user' to 'User' and 'order' to 'Order' to match Linux case-sensitivity
const User = require('../../models/User'); 
const Order = require('../../models/Order');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return res.redirect('/admin/dashboard');
    }
    res.render('admin/login', { error: null, success: null, email: '' });
});

router.post('/login', async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;

        if (!email || !password) {
            return res.render('admin/login', {
                error: '📧 Email and password are required',
                success: null,
                email: email || ''
            });
        }

        const trimmedEmail = email.trim().toLowerCase();
        
        // Find the admin
        const admin = await User.findOne({
            where: { email: trimmedEmail, role: 'admin' }
        });

        if (!admin) {
            console.log(`[LOGIN FAILED] Admin not found: ${trimmedEmail}`);
            return res.render('admin/login', {
                error: '⚠️ Invalid email or password',
                success: null,
                email: trimmedEmail
            });
        }

        // Password Comparison (Plaintext or Bcrypt)
        let passwordMatch = false;
        if (admin.password && (admin.password.startsWith('$2'))) {
            passwordMatch = await bcrypt.compare(password, admin.password);
        } else {
            passwordMatch = (password === admin.password);
        }

        if (!passwordMatch) {
            return res.render('admin/login', {
                error: '⚠️ Invalid email or password',
                success: null,
                email: trimmedEmail
            });
        }

        // ✅ CRITICAL: Create the session
        req.session.user = {
            id: admin.id,
            name: admin.name || 'Admin',
            email: admin.email,
            role: admin.role
        };

        // If using Render, session save can be slow. Force it before redirecting.
        req.session.save((err) => {
            if (err) {
                console.error("Session Save Error:", err);
                return res.redirect('/admin/login');
            }
            console.log(`[LOGIN SUCCESS] Session saved for: ${trimmedEmail}`);
            return res.redirect('/admin/dashboard');
        });

    } catch (err) {
        console.error('[LOGIN ERROR]', err);
        res.render('admin/login', { error: '🚨 Server error', success: null, email: '' });
    }
});

module.exports = router;

