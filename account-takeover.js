document.addEventListener('DOMContentLoaded', function() {
    const accountTakeoverForm = document.getElementById('account-takeover-form');

    accountTakeoverForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(accountTakeoverForm);
        const data = {
            user_id: formData.get('user_id'),
            typing_speed: parseFloat(formData.get('typing_speed')),
            mouse_movement: parseFloat(formData.get('mouse_movement')),
            login_attempts: parseFloat(formData.get('login_attempts')),
            session_duration: parseFloat(formData.get('session_duration')),
            amount: parseFloat(formData.get('amount'))
        };

        fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin': '*',
                 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(result => {
                  console.log('Response from Flask API:', data);
                   const divElement = document.getElementById('cont');

                       // Set the display property to 'none'
                       divElement.style.display = 'none';
                      document.getElementById('account-takeover-result').innerText = 'Prediction: ' + (result[0] === 1 ? 'Fraudulent' : 'Legitimate');
                  })
              .catch(error => {
                  console.log('There was a problem with your fetch operation:', error);
                  document.getElementById('account-takeover-result').innerText = 'Error: ' + error.message;
              });
    });

   });
