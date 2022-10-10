"use strict";
// regex pattern variables
const datePattern = /^((0[13578]|1[02])\/31\/(18|19|20)[0-9]{2})|((01|0[3-9]|1[0-2])\/(29|30)\/(18|19|20)[0-9]{2})|((0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-8])\/(18|19|20)[0-9]{2})|((02)\/29\/(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000))$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.edu$/;
const phonePattern = /^\(\d{3}\) \d{3}.\d{4}$/;
const usernamePattern = /^(\d|\w)+$/;
const zipcodePattern = /^\d{5}-\d{4}$/;

$(document).ready( () => {
    $("#username").focus();

    let isValid;

    const makeInvalid = (textbox,message) => {
        textbox.next().text(message);
        textbox.addClass('is-invalid');
        textbox.removeClass('is-valid');
        isValid = false;
    }
    const makeValid = (textbox) => {
        textbox.next().text('');
        textbox.removeClass('is-invalid');
        textbox.addClass('is-valid');
        isValid = true;
        $("#username").focus();
    }

    $("#validateSave").on('click', (evt) => {
// set isValid to true
        //alert("test");
        isValid = true;
        // set values equal to contents of text boxes
        const username = $("#username").val().trim();
        const emailAddress = $("#email-address").val().trim();
        const phoneNumber = $("#phone-number").val().trim();
        const zipCode = $("#zip-code").val().trim();
        const dateOfBirth = $("#date-of-birth").val().trim();

        // validate username contains no spaces or special symbols
        !usernamePattern.test(username) ? makeInvalid($("#username"),"Username cannot contain spaces or special characters") : makeValid($("#username"));

        // validate email address ends in .edu
        !emailPattern.test(emailAddress) ? makeInvalid($("#email-address"),"Email address must meet username@domain.edu format") : makeValid($("#email-address"));

        // validate phone number matches (999) 999.9999 format
        !phonePattern.test(phoneNumber) ? makeInvalid($("#phone-number"), "Phone number must meet (999) 999.9999 format") : makeValid($("#phone-number"));

        // validate zip code match 99999-9999 format
        !zipcodePattern.test(zipCode) ? makeInvalid($("#zip-code"),"Zip code must meet 99999-9999 format") : makeValid($("#zip-code"));

        // validate date of birth matches MM/DD/YYYY format
        if (!datePattern.test(dateOfBirth)) {
            makeInvalid($("#date-of-birth"),"Date must match MM/DD/YYYY format");
        }
        // validate date is a previous date - subtracted a day's worth of milliseconds to ensure same day doesn't get included
        else if (Date.parse($('#date-of-birth').val().trim()) >= Date.now() - 86400000) {
            makeInvalid($("#date-of-birth"),"Date must be in the past");
        }
        else {
            makeValid($("#date-of-birth"));
        }

        // show text if all entries are valid
        // used for testing
        //$("#entries-validated").text(isValid ? 'All fields contain valid entries' : '');

        if (isValid) {
            // array to save profile info
            const lab9info = [];
            // add values to array
            lab9info['username'] = username;
            lab9info['email-address'] = emailAddress;
            lab9info['phone-number'] = phoneNumber;
            lab9info['zip-code'] = zipCode;
            lab9info['date-of-birth'] = dateOfBirth;

            sessionStorage.lab9info = '';

            for (let i in lab9info) {
                sessionStorage.lab9info += i + '=' + lab9info[i] + "|";
            }
            // go to profile page
            location.href = 'profile.html';
        }
    });

});