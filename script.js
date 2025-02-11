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

            // Show loader
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
                resultDiv.textContent = `Result: ${data.result}`;
            } catch (error) {
                resultDiv.textContent = `Error: ${error.message}`;
            } finally {
                // Hide loader
                loader.style.display = 'none';
            }
        });
        // Typing Effect
        const textToType = ">_ Created By BALAJI C K";
        const typingSpan = document.getElementById('typing-effect');
        let index = 0;

        function typeWriter() {
            if (index < textToType.length) {
                typingSpan.textContent += textToType.charAt(index);
                index++;
                setTimeout(typeWriter, 100); // Adjust typing speed (milliseconds)
            }
        }

        // Start the typing effect when the page loads
        window.onload = typeWriter;
