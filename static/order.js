$(document).ready(function() {
    $('.btn-order').click(function() {
        var itemId = $(this).data('item-id');
        window.location.href = '/payment/' + itemId;
    });
});
