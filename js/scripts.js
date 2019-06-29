// focus on first form field when page loads
$('#name').focus();
// hide field for other option in the job role menu
$('#other-title').hide();




$('#title').on('change', function() {
    if($(this).val() === "other") {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});


$('#design').ready(function() {
    $('#selectTheme').hide();
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

$('#design').on('change', function() {
    console.log($('#design').val());
    console.log($('#color').val());
    if($('#design').val() == 'heart js') {
        $('#color option').each(function() {
            if($(this).val() === 'cornflowerblue') {
                $('#color option').show();
            }
        });
    }
});

$('#color').on('change', function() {
    console.log($('#color').val());

});
