const express = require('express');
const path = require('path');
const app = express();
const PORT = 5500;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock Database
const users = { "prachi": "123456" };

// 1. Login API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Please fill all credentials!" });
    }

    const lowerUser = username.toLowerCase();
    if (users[lowerUser] && users[lowerUser] === password) {
        return res.json({ success: true, message: "Access Granted! Redirecting..." });
    }
    
    return res.status(401).json({ success: false, message: "Invalid Credentials!" });
});

// 2. AI Grievance Classification API
app.post('/api/classify', (req, res) => {
    const { contact, city, address, complaint } = req.body;

    if (!contact || !city || !address || !complaint) {
        return res.status(400).json({ success: false, message: "Please fill all details and describe your complaint clearly." });
    }

    const lowerComplaint = complaint.toLowerCase();
    let targetDepartment = "General Admin Dept";
    let priority = "Normal Priority";

    // AI Keyword Engine
    if (lowerComplaint.includes('water') || lowerComplaint.includes('pipe') || lowerComplaint.includes('sewage')) {
        targetDepartment = "Water Dept";
    } else if (lowerComplaint.includes('electricity') || lowerComplaint.includes('power') || lowerComplaint.includes('light')) {
        targetDepartment = "Electricity Dept";
    } else if (lowerComplaint.includes('road') || lowerComplaint.includes('pothole') || lowerComplaint.includes('street')) {
        targetDepartment = "Public Works Dept (PWD)";
    } else if (lowerComplaint.includes('garbage') || lowerComplaint.includes('waste') || lowerComplaint.includes('clean')) {
        targetDepartment = "Municipal Corporation";
    }

    if (lowerComplaint.includes('urgent') || lowerComplaint.includes('emergency') || lowerComplaint.includes('danger') || lowerComplaint.includes('days')) {
        priority = "High Priority";
    }

    res.json({
        success: true,
        department: `${targetDepartment} (${city})`,
        status: `${priority} - Logged in ${city} System`,
        contact: contact,
        locality: address
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
