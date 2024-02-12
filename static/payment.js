$(document).ready(function() {
    $('#buy-button').click(function() {
        var quantity = $('#quantity-input').val();
        var itemId = {{ item.id }}; // Assuming you pass the item object from the backend
        $.ajax({
            url: '/payment/' + itemId,
            method: 'POST',
            data: {
                ordered_quantity: quantity
            },
            success: function(response) {
                // Handle success, e.g., show a confirmation message
                alert('Purchase successful!');
                window.location.href = '/dashboard'; // Redirect to dashboard or a confirmation page
            },
            error: function(xhr, status, error) {
                // Handle error, e.g., show an error message
                alert('Failed to process order. Please try again later.');
            }
        });
    });
});
