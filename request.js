const axios = require('axios');

const DOMAIN = 'lb-hp-2114439115.eu-central-1.elb.amazonaws.com';

function sendRequest() {
  axios.get(`http://${DOMAIN}`)
    .then(response => {
      const data = response.data;
      console.log('Sent request');
      console.log(data);
    })
    .catch(error => {
      console.error('Error sending request:', error.message);
    })
    .finally(() => {
      // Send the request again after a delay
      setTimeout(sendRequest, 100); // Adjust the delay (in milliseconds) as needed
    });
}

// Start sending requests
sendRequest();
