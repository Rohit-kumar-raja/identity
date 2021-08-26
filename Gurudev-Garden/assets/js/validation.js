function valid_inquiry() {

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var company = document.getElementById('company');
    var cellno = document.getElementById('cellno');
    if (name.value == '') {
        alert('Please Enter Your Name.')
        name.focus();
        return false;
    }

    if (email.value == '') {
        alert('Please Enter Your Email ID.')
        email.focus();
        return false;
    }

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var address = document.InquiryForm.email.value;
    if (reg.test(address) == false) {
        alert('Invalid Email ID');
        email.focus();
        return false;
    }

    if (company.value == '') {
        alert('Please Enter Your Convenient Time to Call.')
        company.focus();
        return false;
    }
	if (cellno.value == '') {
        alert('Please Enter Your Contact no.');
        cellno.focus();
        return false;
    } else if (isNaN(cellno.value)) {
        alert("Please Enter Numeric Value in Contact No.");
        cellno.value = "";
        cellno.focus();
        return false;
    } else if (cellno.value.length != 10) {
        alert('Please Enter Your 10 Digits Contact No.');
		cellno.value = "";
        cellno.focus();
        return false;
    }
	alert('Thank you, your application has been received. We are presently in the process of reviewing it & will get back to you soon.')
	
    return true;

}


function valid_booking() {

    var bname = document.getElementById('bname');
    var mobile = document.getElementById('mobile');
    var residence = document.getElementById('residence');
    var bemail = document.getElementById('bemail');
	var range = document.getElementById('range');

    if (bname.value == '') {
        alert('Please Enter Person Name.')
        bname.focus();
        return false;
    }
	
	if (mobile.value == '') {
        alert('Please Enter Mobile Number.')
        mobile.focus();
        return false;
    }
	
	if (residence.value == '') {
        alert('Please Enter Residence.')
        residence.focus();
        return false;
    }

    if (bemail.value == '') {
        alert('Please Enter Your Email ID.')
        bemail.focus();
        return false;
    }

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var address = document.BookingForm.bemail.value;
    if (reg.test(address) == false) {
        alert('Invalid Email ID');
        bemail.focus();
        return false;
    }
	
	if (range.value == '') {
        alert('Please Select Your Price Range.')
        range.focus();
        return false;
    }
	
	alert('Thank you, your application has been received. We are presently in the process of reviewing it & will get back to you soon.')
	
    return true;

}