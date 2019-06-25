// focus on first form field when page loads
$('#name').focus();
// hide field for other option in the job role menu
$('#other-title').hide();
$('#design').children('option').hide();



$('#title').on('change', function() {
    if($(this).val() == "other") {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});

$('#design').on('change', function() {
    if($(this).val() == "other") {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});

// $('#design').on('load', function() {
//     if ($('#design').children('option').val() === 'select theme') {
//         $(this).hide();
//     }
// });
