$(document).ready(function() {
    $('#contactForm').submit(function(event) {
        event.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();

        // Send data to the server using AJAX
        $.ajax({
            url: '/submit_contact_form',
            method: 'POST',
            data: {
                name: name,
                email: email,
                message: message
            },
            success: function(response) {
                alert('Message sent successfully!');
                // You can perform additional actions here after the message is sent successfully
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again later.');
                // You can handle errors here
            }
        });
    });
});