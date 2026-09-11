// --- Login Page Logic ---
const usernameInput = document.getElementById('username');
const aiStatus = document.getElementById('ai-status');
const loginBtn = document.getElementById('loginBtn');

if (usernameInput) {
    // Simulating AI Username Recognition as you type (From Video)
    usernameInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (val.length > 0) {
            aiStatus.innerText = `#recognizing ${val}...`;
            aiStatus.style.color = "#ffb03a";
            
            // Simulating ready state
            setTimeout(() => {
                if(usernameInput.value === val) {
                    aiStatus.innerText = `System Ready for ${val}`;
                    aiStatus.style.color = "#4ed9ff";
                }
            }, 800);
        } else {
            aiStatus.innerText = "Predicting User...";
            aiStatus.style.color = "#4ed9ff";
        }
    });

    // Login Form Submit
    loginBtn.addEventListener('click', async () => {
        const username = usernameInput.value;
        const password = document.getElementById('password').value;
        const city = document.getElementById('city').value;
        const errorMsg = document.getElementById('error-msg');

        if(!username || !password) {
            errorMsg.innerText = "Please fill all credentials!";
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (data.success) {
                aiStatus.innerText = data.message;
                aiStatus.style.color = "#4effa6";
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                errorMsg.innerText = data.message;
            }
        } catch (err) {
            errorMsg.innerText = "Server Error!";
        }
    });
}

// --- Grievance Dashboard Logic ---
const submitGrievanceBtn = document.getElementById('submitGrievanceBtn');
if (submitGrievanceBtn) {
    submitGrievanceBtn.addEventListener('click', async () => {
        const contact = document.getElementById('contact').value;
        const city = document.getElementById('portal-city').value;
        const address = document.getElementById('address').value;
        const complaint = document.getElementById('complaint').value;

        if (!contact || !address || !complaint) {
            alert("Please fill all details and describe your complaint clearly.");
            return;
        }

        try {
            const response = await fetch('/api/classify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contact, city, address, complaint })
            });
            const data = await response.json();

            if (data.success) {
                // Display the AI target system output (Matches Video exactly)
                document.getElementById('ai-result-container').style.display = 'block';
                document.getElementById('res-dept').innerText = `Target: ${data.department}`;
                document.getElementById('res-status').innerText = `Status: 🟢 ${data.status}`;
                document.getElementById('res-meta').innerText = `Contact: ${data.contact} | Locality: ${data.locality}`;
            }
        } catch (err) {
            alert("Error analyzing complaint!");
        }
    });
}
