let hashHistory = [];
let isTableVisible = false; // Track whether the table is visible
// Validation function for SHA-1 hash
function isValidSHA1(hash) {
            const sha1Regex = /^[a-fA-F0-9]{40}$/; // Regex for 40-character hexadecimal string
            return sha1Regex.test(hash);
        }
        document.getElementById('executeButton').addEventListener('click', async () => {
            const hash = document.getElementById('hashInput').value.trim();
            const useSalts = document.getElementById('saltDropdown').value === 'true';

            // Validate the hash format
            if (!hash || !isValidSHA1(hash)) {
                alert('Please enter a valid SHA-1 hash.');
                return;
            }
            
            const existingEntry = hashHistory.find(entry => entry.hash === hash && entry.useSalts === useSalts);
            if (existingEntry) {
            alert(`This hash has already been cracked. Password: ${existingEntry.result}`);
            return;}

            // show loader
            const loader = document.getElementById('loader');
            const resultDiv = document.getElementById('result');
            loader.style.display = 'block';
            resultDiv.textContent = '';

            try {
                // Send data to the backend
                const response = await fetch('https://balaji-spyder-github-io.onrender.com/crack', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ hash, useSalts }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Unknown error');
                }

                const data = await response.json();
                resultDiv.textContent = `Password: ${data.result}`;
             // Add entry to the table
                addHashToTable(hash, useSalts, data.result);
            if (!isTableVisible) {
            showTable();
            }
            } catch (error) {
                resultDiv.textContent = `Error: ${error.message}`;
            } finally {
                // Hide loader
                loader.style.display = 'none';
            }
        });
        // Typing Effect
        const textToType = ">_ created by BALAJI C K";
        const typingSpan = document.getElementById('typing-effect');
        let index = 0;

        function typeWriter() {
            if (index < textToType.length) {
                typingSpan.textContent += textToType.charAt(index);
                index++;
                setTimeout(typeWriter, 100); // Adjust typing speed (milliseconds)
            }
        }
         // Function to add a hash to the table
    function addHashToTable(hash, useSalts, result) {
    const tableBody = document.querySelector('#hashTable tbody');

    // Create a new row
    const row = document.createElement('tr');

    // Add hash cell
    const hashCell = document.createElement('td');
    hashCell.textContent = hash; 
    row.appendChild(hashCell);

    // Add salt cell
    const saltCell = document.createElement('td');
    saltCell.textContent = useSalts ? 'Yes' : 'No'; 
    row.appendChild(saltCell);

    // Add result cell
    const resultCell = document.createElement('td');
    resultCell.textContent = result; 
    row.appendChild(resultCell);

    // Append row to the table
    tableBody.appendChild(row);
    hashHistory.push({ hash, useSalts, result });
}
function showTable() {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.style.display = 'block'; // Make the table visible
    isTableVisible = true;
    setTimeout(() => {
        tableContainer.classList.add('visible');
    }, 10); 
}
document.getElementById('clearHistoryButton').addEventListener('click', () => {
    const tableBody = document.querySelector('#hashTable tbody');
    tableBody.innerHTML = ''; // Clear table rows
    hashHistory = []; // Clear history array
});
    // Start the typing effect when the page loads
    window.onload = typeWriter;
