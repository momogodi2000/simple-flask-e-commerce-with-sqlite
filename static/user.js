$(document).ready(function() {
    // Delete button click event
    $('.btn-delete').on('click', function() {
        // Get the user ID from the data attribute
        var userId = $(this).data('user-id');
        
        // Confirm deletion
        if (confirm("Are you sure you want to delete this user?")) {
            // Send DELETE request to delete the user
            $.ajax({
                url: '/delete-user/' + userId, // Update the URL as per your route
                type: 'DELETE',
                success: function(response) {
                    // If deletion is successful, remove the corresponding row from the table
                    $('#user-row-' + userId).remove();
                    alert(response.message); // Show success message
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting user:', error);
                    alert('An error occurred while deleting the user. Please try again.');
                }
            });
        }
    });
});
