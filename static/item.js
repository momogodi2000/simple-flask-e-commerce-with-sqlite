// Add your JavaScript code here
console.log('Script loaded successfully!');

// Example of animation using jQuery
$(document).ready(function() {
    $('h1').fadeIn(1000);
    $('table').fadeIn(1500);
    $('.btn').fadeIn(2000);
});


function deleteItemPrompt() {
    var itemId = prompt("Enter the ID of the item you want to delete:");
    if (itemId) {
        deleteItem(itemId);
    }
}

function deleteItem(itemId) {
    // Perform deletion logic here
    // You can use AJAX to send a request to your Flask route for deleting the item
    fetch('/delete-item/' + itemId, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert("Item deleted successfully!");
            // You can optionally update the UI here to reflect the deletion
        } else {
            alert("Failed to delete item. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while deleting the item.");
    });
}
