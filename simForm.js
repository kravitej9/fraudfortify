document.getElementById('simForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Fetch form values based on the currently visible fields
    let fraudDetected = false;
    const visibleForm = document.querySelector('.formFields:not([style*="display: none"])');

    if (visibleForm) {
        const formId = visibleForm.id;
        if (formId === 'purchaseFields') {
            const amount = parseFloat(document.getElementById('purchaseAmount').value);
            const userType = document.getElementById('purchaseUserType').value;
            fraudDetected = simulateFraud('purchase', amount, userType);
        } else if (formId === 'refundFields') {
            const amount = parseFloat(document.getElementById('refundAmount').value);
            const reason = document.getElementById('refundReason').value;
            fraudDetected = simulateFraud('refund', amount, reason);
        } else if (formId === 'transferFields') {
            const amount = parseFloat(document.getElementById('transferAmount').value);
            const accountType = document.getElementById('transferAccountType').value;
            fraudDetected = simulateFraud('transfer', amount, accountType);
        }

        // Display results
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = `<p>Simulation Result: ${fraudDetected ? 'Fraud Detected' : 'No Fraud Detected'}</p>`;
    }
});

// Example simulation function (replace with your actual simulation function)
function simulateFraud(transactionType, amount, additionalInfo) {
    // Example logic: detect fraud based on transaction type, amount, and additional info
    if (transactionType === 'refund' && amount > 1000) {
        return true; // Simulate fraud detected
    } else if (transactionType === 'purchase' && amount > 5000) {
        return true; // Simulate fraud detected
    } else {
        return false; // Simulate no fraud detected
    }
}

// Show form fields based on selected simulation type
function showForm(type) {
    const formTitle = document.getElementById('formTitle');
    const allFormFields = document.querySelectorAll('.formFields');
    allFormFields.forEach(fields => fields.style.display = 'none');

    if (type === 'purchase') {
        document.getElementById('purchaseFields').style.display = 'block';
        formTitle.textContent = 'Configure Purchase Simulation';
    } else if (type === 'refund') {
        document.getElementById('refundFields').style.display
