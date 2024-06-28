document.addEventListener('DOMContentLoaded', function() {
    const transactionFraudForm = document.getElementById('transaction-fraud-form');

    transactionFraudForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(transactionFraudForm);
        const data = {
            transaction_id: formData.get('transaction_id'),
            user_id_transaction: formData.get('user_id_transaction'),
            transaction_amount: formData.get('transaction_amount'),
            payee_id: formData.get('payee_id')
        };

        fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            document.getElementById('transaction-fraud-result').innerText = 'Prediction: ' + (result[0] === 1 ? 'Fraudulent' : 'Legitimate');
        });
    });


   });
