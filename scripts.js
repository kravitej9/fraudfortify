 // Function to get URL parameters
        function getParameterByName(name, url = window.location.href) {
            console.log(name);
            name = name.replace(/[\[\]]/g, '\\$&');
            console.log(url);
            let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
             console.log(results);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }

        // Function to display the passed value
        function displayValue() {
            const value = getParameterByName('username');
            console.log(value);
            if (value) {
                document.getElementById('displayValue').innerText = value;
                const element = document.getElementById('in');
                element.parentNode.removeChild(element);
                document.getElementById('out').style.display='inline';
            } else {
                document.getElementById('displayValue').innerText = "Guest";
                const element = document.getElementById('out');
                element.parentNode.removeChild(element);
                document.getElementById('in').style.display='inline';
            }
        }

        window.onload = displayValue;