// focus on first form field when page loads
$('#name').focus();
// hide field for other option in the job role menu
$('#other-title').hide();




$('#title').on('change', function() {
    if($(this).val() == "other") {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});


$('#design').ready(function() {
    const $electTheme = $('#selectTheme');
    $electTheme.hide();
});
console.log($('#design').val());

$('#color').ready(function() {
    $('#color').prepend('<option value="pleaseSelect" id="designMsg">Please select a T-shirt theme</option');
    $('#color').val('pleaseSelect');
    $('#color option').each(function() {
        if($(this).val() !== 'pleaseSelect') {
            $('#color option').hide();
        }
    });
});
console.log($('#color').val());