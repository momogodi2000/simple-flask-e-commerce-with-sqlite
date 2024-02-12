// Function to redirect to admin.html
function redirectToAdmin() {
    window.location.href = 'admin'; // Modify the URL as needed
}

// Function to handle form submission
document.getElementById('crud-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    var form = event.target;
    var formData = new FormData(form);

    // Perform AJAX POST request to submit form data
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // If successful, display success message
            alert("Product inserted successfully!");
            // Redirect to admin.html
            redirectToAdmin();
        } else {
            // If not successful, display error message
            alert("Failed to insert product. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Display error message
        alert("An error occurred. Please try again later.");
    });
});
