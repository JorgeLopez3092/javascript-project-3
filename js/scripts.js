// let selectedTimes = [];
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
    
// const strings = [
//     'Main Conference — $200',
//     'JavaScript Frameworks Workshop — Tuesday 9am-12pm, $100',
//     'JavaScript Libraries Workshop — Tuesday 1pm-4pm, $100',
//     'Express Workshop — Tuesday 9am-12pm, $100',
//     'Node.js Workshop — Tuesday 1pm-4pm, $100',
//     'Build tools Workshop — Wednesday 9am-12pm, $100',
//     'npm Workshop — Wednesday 1pm-4pm, $100',        
//   ];
  
  
  
//   console.clear();
  
// strings.forEach((string) => {
//     const time = getTime(string);
//     const enabled = isSelectable(time);
// });


// const time = 'Tuesday 1pm-4pm';
// selectedTimes = selectedTimes.filter((t) => t !== time).concat(time);
// selectedTimes = [ ...selectedTimes.filter((t) => t !== time)];
// console.log(selectedTimes);


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
    let _time = getTime(activityLabel);
    console.log(selectedTimes);
    if(activity.checked) {
        selectedTimes = selectedTimes.filter((t) => t !== _time).concat(_time);
    } else {
        selectedTimes = selectedTimes.filter((t) => t !== _time)
    }
    console.log(selectedTimes);
    let activityArray = $('.activities input');
    for (let i = 0; i < activityArray.length; i++) {
        const input = activityArray[i];
        const activityArrayLabel = input.parentNode.textContent;
        const time = getTime(activityArrayLabel);
        const selectable = isSelectable(time);
        console.log(i, selectable);
        if (!selectable && activityLabel !== activityArrayLabel && input.checked === false) {
            input.disabled = true;
        } else {
            input.disabled = false;
        }
    }
    
    

});




// function getTime(activity) {
//     const inputArr = document.querySelectorAll('.activities input')
//     for(let i = 0; i < inputArr.length * 2; i++) {  
//         let activityLabel = activity.parentNode.textContent;
//         let dashIndex = activityLabel.indexOf('—');
//         let commaIndex = activityLabel.indexOf(',');
//         let dayTime = activityLabel.slice(dashIndex + 2, commaIndex);   
//         let loopDash = inputArr[i].parentNode.textContent.indexOf('—');
//         let loopComma = inputArr[i].parentNode.textContent.indexOf(',');
//         console.log(dashIndex);
//         console.log(commaIndex);
//         console.log(dayTime);
//         console.log(inputArr[i].parentNode.textContent.slice(loopDash + 2, loopComma));
//         if(dayTime === inputArr[i].parentNode.textContent.slice(loopDash + 2, loopComma) && activity !== inputArr[i]) {
//             $(inputArr[i]).prop("disabled", true);
//         }   else if ($(inputArr[i]).is(':disabled')) {
//             $(inputArr[i]).prop("disabled", true);
//         }   else {
//             $(inputArr[i]).prop("disabled", false);
//         }
//         if($(inputArr[i]).is(':checked')) {
//             $(inputArr[i]).prop("disabled", false);
//         }
//         if (activity.is(':checked') === false) {
//             $(inputArr[i]).prop("disabled", false);
//         }
//     }
// };