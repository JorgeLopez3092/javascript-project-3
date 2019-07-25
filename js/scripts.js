// Empty array which will take the times of the selected activities from the checkbox list.
// Wrote a function below that checks whether a time exists in here or not.
let selectedTimes = [];
const nameField = $('#name');
const emailField = $('#mail');
const cardField = $('#cc-num');
const zipCodeField = $('#zip');
const cvvField = $('#cvv');

// Slicing the time of selected checkboxes.  Couldnt just write it like I did with the price.  The scoping of this function seems to have helped.
// before this function if the indes of .slice(-) was, for example, 15, it would get only index 15 of every other label which, of course, wasn't the character I needed
function getTime(str) {
    if (typeof str !== 'string') return null;
    return str
      .slice(str.indexOf('—') + 1, str.indexOf(','))
      .trim();
  }

// function to see whether a time exists in the array or not (for checkboxes).  Return true if it DOESN'T exist.
function isSelectable(time) {
    return selectedTimes.indexOf(time) === -1;
  }

// quick function to only show the payment field based on the payment option selected
  function paymentDisplay(val, id) {
    if($('#payment').val() === val) {
        $(id).show();
    } else {
        $(id).hide();
    }
  }

// regex functions
function nameValidator(name) {
    return /^[a-z]+$/i.test(name);
}

function emailValidator(email) {
    return /^[^@]+@[^@.]+\.[a-z]+/i.test(email);
  }

function creditCardValidator(creditcard) {
    const visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const amex = /^3[47][0-9]{13}$/;
    const mastercard = /^5[1-5][0-9]{14}$/;
    // checking to see if it matches any one of these regex
    if(visa.test(creditcard) || amex.test(creditcard) || mastercard.test(creditcard)) {
        return true;
    } else {
        return false;
    }
}

function zipValidator(zipCode) {
    return /^\d{5}$/.test(zipCode);
}

function cvvValidator(cvv) {
    return /^\d{3,4}$/.test(cvv);
}


  
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
    // Finding all the prices
    let activity = e.target;
    let activityLabel = activity.parentNode.textContent;
    let dollaIndex = activityLabel.indexOf('$');
    let costString = activityLabel.slice(dollaIndex + 1);
    let cost = parseInt(costString);
    // Add or Subtract price if you checking or unchecking, respectively
    if (activity.checked) {
        price += cost;
    }   else {
        price -= cost;
    }
    // Only show price if there's something selected
    if (price > 0) {
        priceMsg.show();
    }   else {
        priceMsg.hide();
    }
    $('#priceMsg').text(`${price.toFixed(2)}`);
// End pricing algorithm
// Use string from variable above to enter into function
    let _time = getTime(activityLabel);
    // Add/Remove the times of checked/unchecked activities into/from array
    if(activity.checked) {
        selectedTimes = selectedTimes.filter((t) => t !== _time).concat(_time);
    } else {
        selectedTimes = selectedTimes.filter((t) => t !== _time)
    }
    // Loop through all input and labels to disable checkbox if the respective time exists in array
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

// Defaulting to Credit Card on page load
$('option[value="select_method"]').hide();
$('#payment').val('credit card');
$('#paypal').hide();
$('#bitcoin').hide();
// Changing visibility based on selected
$('#payment').on('change', function() {
    paymentDisplay('credit card', '#credit-card');
    paymentDisplay('paypal', '#paypal');
    paymentDisplay('bitcoin', '#bitcoin')
});

// Event listener for submit button.  Start validation
$('button').on('click', function(e) {
    const checkboxes = $('.activities input')
    let checkedBoxes = 0;
    for (let i = 0; i < checkboxes.length; i++) {
        if  (checkboxes[i].checked) {
            checkedBoxes += 1
        }
    }
    // Do nothing or take red away if name and email fields are valid and if at lease one box is checked
    if  (nameValidator(nameField.val()) && emailValidator(emailField.val()) && checkedBoxes > 0) {
        nameField.css('border-color', '#b0d3e2')
        emailField.css('border-color', '#b0d3e2')
        $('.activities label').css('color', '#000')
    } else {
        // Check each field individually to only highlight incorrect fields
        e.preventDefault();
        if  (!emailValidator(emailField.val()))  {
            emailField.css('border-color', 'red');
            emailField.focus();
        }   else    {
            nameField.css('border-color', '#b0d3e2')
        }
        if  (!nameValidator(nameField.val())) {
            nameField.css('border-color', 'red')
            nameField.focus();
        }   else    {
            nameField.css('border-color', '#b0d3e2')
        }
        if  (checkedBoxes === 0)    {
            $('.activities label').css('color', 'red')
        }   else    {
            $('.activities label').css('color', '#000')
        }
    }
    // Only do Credit Card checks if Credit Card is selected as the payment option
    if ($('#payment').val() === 'credit card') {
        console.log('credit card!');
        // Do nothing or take red away if all credit card fields are correct
        if (creditCardValidator(cardField.val()) && zipValidator(zipCodeField.val()) && cvvValidator(cvvField.val())) {
            console.log('Its working!');
            cardField.css('border-color', '#b0d3e2');
            zipCodeField.css('border-color', '#b0d3e2');
            cvvField.css('border-color', '#b0d3e2');
        }   else    {
            // Check and validate each field individually
            e.preventDefault();
            if  (!creditCardValidator(cardField.val())) {
                cardField.css('border-color', 'red')
            }   else    {
                cardField.css('border-color', '#b0d3e2')
            }
            if  (!zipValidator(zipCodeField.val())) {
                zipCodeField.css('border-color', 'red')
            }   else    {
                zipCodeField.css('border-color', '#b0d3e2')
            }
            if  (!cvvValidator(cvvField.val())) {
                cvvField.css('border-color', 'red')
            }   else    {
                cvvField.css('border-color', '#b0d3e2')
            }
        }
    }
});
