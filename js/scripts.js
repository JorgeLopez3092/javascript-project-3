// focus on first form field when page loads
$('#name').focus();
// hide field for other option in the job role menu
$('#other-title').hide();

// function to show other field only when other option is selected in drop down.
$('#title').on('change', function() {
    if($(this).val() === "other") {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});
// basic info section END

// function to not show the select them option as an actual option when the shirt them menu is clicked.  It's only there to prompt the user to do something when the page loads
$('#design').ready(function() {
    $('#selectTheme').hide();
});


// function to prompt a user to select a shirt theme on page load, but not have it actually be an option once the menu is clicked
$('#color').ready(function() {
    $('#color').prepend('<option value="pleaseSelect" id="designMsg">Please select a T-shirt theme</option');
    $('#color').val('pleaseSelect');
    $('#color option').each(function() {
        if($(this).val() !== 'pleaseSelect') {
            $('#color option').hide();
        }
    });
});

// functions to only show colors that are available for the tshirt selected when the user selects a tshirt design
$('#design').on('change', function() {
    console.log($('#design').val());
    console.log($('#color').val());
    if($('#design').val() == 'js puns') {
        $('#color option').each(function() {
            if($(this).val() === 'cornflowerblue' || $(this).val() === 'darkslategrey' || $(this).val() === 'gold') {
                $(this).show();
                $('#color').val('cornflowerblue');
            }   else {
                $(this).hide();
            }
        });
    } else if($('#design').val() == 'heart js') {
        $('#color option').each(function() {
            if($(this).val() === 'tomato' || $(this).val() === 'steelblue' || $(this).val() === 'dimgrey') {
                $(this).show();
                $('#color').val('tomato');
            }   else {
                $(this).hide();
            }
        });
    }
});
// tshirt section END

let price = 0;
const priceMsg = $('<p>Total: $<span id="priceMsg"></span></p>');
$('.activities').append(priceMsg);
priceMsg.hide();

$('.activities input').on('change', function(e) {
    let activity = e.target;
    let activityLabel = activity.parentNode.textContent;
    let dollaIndex = activityLabel.indexOf('$');
    let costString = activityLabel.slice(dollaIndex + 1);
    let cost = parseInt(costString);
    if (activity.checked) {
        price += cost;
    }   else {
        price -= cost;
    }
    if (price > 0) {
        priceMsg.show();
    }   else {
        priceMsg.hide();
    }
    console.log(price);
    $('#priceMsg').text(`${price.toFixed(2)}`);
// End pricing algorithm

    let dashIndex = activityLabel.indexOf('—');
    console.log(dashIndex);
    let commaIndex = activityLabel.indexOf(',');
    console.log(commaIndex);
    let dayTime = activityLabel.slice(dashIndex + 2, commaIndex);
    console.log(dayTime);
    const inputArr = document.querySelectorAll('.activities input');
    console.log(inputArr[0].textContent.slice(dashIndex + 2, commaIndex));
    for(let i = 0; i < inputArr.length; i++) {
        console.log(inputArr[i].parentNode.textContent.slice(dashIndex + 2, commaIndex));
        if(dayTime === inputArr[i].parentNode.textContent.slice(dashIndex + 2, commaIndex) && activity !== inputArr[i]) {
            $(this).prop("disabled", true);
        }   else {
            $(this).prop("disabled", false);
        }
    }
});


