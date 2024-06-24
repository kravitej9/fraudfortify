document.getElementById('accountTakeoverForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:5000/predict', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
//        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Redirect to results page with result data
        sessionStorage.setItem('fraudResult', JSON.stringify(result));
        console.log(JSON.stringify(result));
        window.location.href = 'results.html';
    })
    .catch(error => console.error('Error:', error));
});
