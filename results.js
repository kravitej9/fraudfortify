document.addEventListener('DOMContentLoaded', () => {
    const result = JSON.parse(sessionStorage.getItem('fraudResult'));
    if (result) {
        document.getElementById('fraud-status').textContent = result.isFraud ? 'Fraudulent' : 'Legitimate';
        
        // Populate details
        const detailsList = document.querySelector('#details ul');
        detailsList.innerHTML = `
            <li>Transaction amount: $${result.transaction_amount}</li>
            <li>Transaction date: ${result.transaction_date}</li>
            <li>Transaction time: ${result.transaction_time}</li>
            <li>Transaction location: ${result.transaction_location}</li>
            <li>Typing patterns: ${result.typing_patterns}</li>
            <li>Mouse movements: ${result.mouse_movements}</li>
        `;
        
        // Data Visualization
        const ctx = document.getElementById('dataChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Transaction Amount', 'Typing Patterns', 'Mouse Movements'],
                datasets: [{
                    label: 'Fraud Score',
                    data: [result.transaction_amount_score, result.typing_patterns_score, result.mouse_movements_score],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
