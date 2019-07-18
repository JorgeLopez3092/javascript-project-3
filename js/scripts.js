let selectedTimes = [];
  
function getTime(str) {
    if (typeof str !== 'string') return null;
    return str
      .slice(str.indexOf('—') + 1, str.indexOf(','))
      .trim();
  }
function isSelectable(time) {
    return selectedTimes.indexOf(time) === -1;
  }

  function paymentDisplay(val, id) {
    if($('#payment').val() === val) {
        $(id).show();
    } else {
        $(id).hide();
    }
  }

function nameValidator(name) {
    return /^[a-z]+$/.test(name);
}

function emailValidator(email) {
    return /^[^@]+@[^@.]+\.[a-z]+/i.test(email);
  }
  
let selectedActivities = 0;
function activityValidator() {
    for(let i = 0; i < $('activities input').length; i++) {
        if ($('.activities input')[i].checked === true) {
        selectedActivities += 1;
        console.log($('.activities input')[i], $('activities input')[i].checked)
        }
    }
}
  
$('.activities input').on('change', function() {
activityValidator();

})

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
    if($('#design').val() === 'js puns') {
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
    $('#priceMsg').text(`${price.toFixed(2)}`);
// End pricing algorithm
    let _time = getTime(activityLabel);
    if(activity.checked) {
        selectedTimes = selectedTimes.filter((t) => t !== _time).concat(_time);
    } else {
        selectedTimes = selectedTimes.filter((t) => t !== _time)
    }
    let activityArray = $('.activities input');
    for (let i = 0; i < activityArray.length; i++) {
        const input = activityArray[i];
        const activityArrayLabel = input.parentNode.textContent;
        const time = getTime(activityArrayLabel);
        const selectable = isSelectable(time);
        if (!selectable && input.checked === false) {
            input.disabled = true;
        } else {
            input.disabled = false;
        }
    }
});


$('option[value="select_method"]').hide();
$('#paypal').hide();
$('#bitcoin').hide();
$('#payment').on('change', function() {
    paymentDisplay('credit card', '#credit-card');
    paymentDisplay('paypal', '#paypal');
    paymentDisplay('bitcoin', '#bitcoin')
});

