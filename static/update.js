// JavaScript for update item form

// Example animation: Fade in form elements
document.addEventListener('DOMContentLoaded', function() {
    var formElements = document.querySelectorAll('.form-group');
    formElements.forEach(function(element) {
        element.style.opacity = 0;
        element.style.transition = 'opacity 0.5s ease-in';
    });
    
    setTimeout(function() {
        formElements.forEach(function(element) {
            element.style.opacity = 1;
        });
    }, 100);
});
