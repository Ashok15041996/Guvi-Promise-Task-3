document.addEventListener('DOMContentLoaded', function() {
    const accessKey = '050c07ef2955cbb68e1b9189de17b94c';
    const apiUrl = `https://api.marketstack.com/v1/eod?access_key=${accessKey}&symbols=AAPL&date_from=2024-02-26&date_to=2024-03-07`;

    // Fetch data from the API using Promises
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('data-container').innerHTML = `<p class="text-danger">Error fetching data: ${error.message}</p>`;
        });
});

/**
 * Display the fetched data on the webpage
 * @param {Object} data - The data fetched from the API
 */
function displayData(data) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    // Assuming data.data is an array of EOD market data points
    if (data.data && data.data.length > 0) {
        data.data.forEach(eod => {
            const dataCard = document.createElement('div');
            dataCard.className = 'col-12 col-md-6 col-lg-4 data-card';

            dataCard.innerHTML = `
                <h3>${eod.symbol}</h3>
                <p><strong>Date:</strong> ${new Date(eod.date).toLocaleDateString()}</p>
                <p><strong>Open:</strong> ${eod.open}</p>
                <p><strong>Close:</strong> ${eod.close}</p>
                <p><strong>High:</strong> ${eod.high}</p>
                <p><strong>Low:</strong> ${eod.low}</p>
                <p><strong>Volume:</strong> ${eod.volume}</p>
            `;

            dataContainer.appendChild(dataCard);
        });
    } else {
        dataContainer.innerHTML = '<p>No data available.</p>';
    }
}
