document.addEventListener('DOMContentLoaded', function() {

  const credentialStuffingForm = document.getElementById('credential-stuffing-form');


credentialStuffingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(credentialStuffingForm);
        const data = {
            user_id: formData.get('user_id'),
            typing_speed: formData.get('typing_speed'),
            key_press_duration: formData.get('key_press_duration'),
            interval_between_keys: formData.get('interval_between_keys')
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
            document.getElementById('credential-stuffing-result').innerText = 'Prediction: ' + (result[0] === 1 ? 'Fraudulent' : 'Legitimate');
        });
    });
   });
