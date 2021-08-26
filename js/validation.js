function valid_request()
	{
		var re_name=document.getElementById('re_name');		
		var re_mobile=document.getElementById('re_mobile');
		var re_mail=document.getElementById('re_mail');
		var datepicker=document.getElementById('datepicker');		
		var re_time=document.getElementById('re_time');
		var re_comment=document.getElementById('re_comment');
		var re_drp_inq=document.getElementById('re_drp_inq');
						
				
		if(re_name.value=='' || re_name.value=='Name')
		{
		 alert('Please Enter Name.')
		 re_name.focus();
		 return false;
		}		
		if(re_mobile.value=='' || re_mobile.value=='Mobile No')
		{
		 alert('Please enter Mobile No.')
		 re_mobile.focus();
		 return false;
		}
		
		else if(isNaN(re_mobile.value))
		{
		   alert("Please Enter Numeric Value in Mobile No.");
			re_mobile.value = "";
		   re_mobile.focus();
		  return false;
		}
		
		if(re_mail.value==''  || re_mail.value=='Email*')
		{
		 alert('Please Enter Your Email-Id.')
		 re_mail.focus();
		 return false;
		}
		
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var address = document.request.re_mail.value;
	   if(reg.test(address) == false) {
		  alert('Invalid Email Address');
		  re_mail.focus();
		  return false;
	}
		
		if(datepicker.value=='' || datepicker.value=='Convenient Date')
		{
		 alert('Please Select Date.')
		 datepicker.focus();
		 return false;
		}
		if(re_time.value=='' || re_time.value=='Convenient Time')
		{
		 alert('Please Enter Convenient Time.')
		 re_time.focus();
		 return false;
		}
			
	if(re_comment.value=='' || re_comment.value=='Message')
		{
		 alert('Please Enter Message.')
		 re_comment.focus();
		 return false;
		}
		if(re_drp_inq.value=='' || re_drp_inq.value=='Project Name')
		{
		 alert('Please Select Project Name.')
		 re_drp_inq.focus();
		 return false;
		}
		
		 
		/*if(resume=='')
		{
		 alert('Please Attach Your Resume.')
		
		 return false;
		}
	
	if(resume != '')
 { 
  var valid_extensions = /(.doc|.docx|.DOC|.DOCX|.txt|.TXT|.pdf|.PDF)$/i;   
  if(valid_extensions.test(resume))
  { 
    return true;
  }
  else
  {
   alert('Only .doc, docx, pdf, txt files are allowed!')
   return false;
  }
 } */
		
	
	
	return true;
}   //validation Contact Enquiry Feedback

function valid_sub_news1()
	{
		var email=document.getElementById('email');
		var mobile=document.getElementById('mobile');
					
		if(email.value==''  || email.value=='Email Id*')
		{
		 alert('Please Enter Your Email-Id.')
		 email.focus();
		 return false;
		}
		
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var address = document.wsubNews.email.value;
	   if(reg.test(address) == false) {
		  alert('Invalid Email Address');
		  email.focus();
		  return false;
	}
	
	if(mobile.value==''  || mobile.value=='Mobile No*')
		{
		 alert('Please Enter Your Mobile No.')
		 mobile.focus();
		 return false;
		}
	else if (isNaN(mobile.value)) {
       alert("Please Enter Numeric Value in Mobile No.");
       mobile.focus();
      return false;
		}
		
	return true;
}


function valid_sub_news()
	{
		var Email_id=document.getElementById('Email_id');
					
		if(Email_id.value==''  || Email_id.value=='Email Id*')
		{
		 alert('Please Enter Your Email-Id.')
		 Email_id.focus();
		 return false;
		}
		
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var address = document.subNews.Email_id.value;
	   if(reg.test(address) == false) {
		  alert('Invalid Email Address');
		  Email_id.focus();
		  return false;
	}
		
	return true;
}


function valid_inquiry()
	{
		var name=document.getElementById('name');
		var mail=document.getElementById('mail');
		var comment=document.getElementById('comment');
		
				
		if(name.value=='' || name.value=='Name')
		{
		 alert('Please Enter Name.')
		 name.focus();
		 return false;
		}
			
		if(mail.value==''  || mail.value=='Email')
		{
		 alert('Please Enter Your Email-Id.')
		 mail.focus();
		 return false;
		}
		
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var address = document.iform.mail.value;
	   if(reg.test(address) == false) {
		  alert('Invalid Email Address');
		  mail.focus();
		  return false;
	}
	
		
		if(comment.value=='' || comment.value=='Message')
		{
		 alert('Please enter Message.')
		 comment.focus();
		 return false;
		}
		
	
	
	return true;
}  


function valid_career()
	{
		var c_name=document.getElementById('c_name');
		var c_email=document.getElementById('c_email');
		var phone=document.getElementById('phone');
		var c_drp_inq=document.getElementById('c_drp_inq');
		var resume=document.getElementById('file').value;		
				
		if(c_name.value=='' || c_name.value=='Name')
		{
		 alert('Please Enter Name.')
		 c_name.focus();
		 return false;
		}
			
		if(c_email.value=='')
		{
		 alert('Please Enter Your Email-Id.')
		 c_email.focus();
		 return false;
		}
		
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var address = document.career.c_email.value;
	   if(reg.test(address) == false) {
		  alert('Invalid Email Address');
		  c_email.focus();
		  return false;
	}
	if(phone.value=='')
		{
		 alert('Please Enter Phone No.')
		 phone.focus();
		 return false;
		}
		
		if(c_drp_inq.value=='' || c_drp_inq.value=='Job Type*')
		{
		 alert('Please Enter Job Type.')
		 c_drp_inq.focus();
		 return false;
		}
	
		if(resume=='')
		{
		 alert('Please Attach Your Resume.')
		
		 return false;
		}
		if(resume != '')
 { 
  var valid_extensions = /(.doc|.docx|.DOC|.DOCX|.txt|.TXT|.pdf|.PDF)$/i;   
  if(valid_extensions.test(resume))
  { 
    return true;
  }
  else
  {
   alert('Only .doc, docx, pdf, txt files are allowed!')
   return false;
  }
 }
	
	return true;
}

function test()
	{
		var c_name=document.getElementById('c_name');
				
		if(c_name.value=='' || c_name.value=='Name')
		{
		 alert('Please Enter Name.')
		 c_name.focus();
		 return false;
		}
		
		
	
	return true;
}


function valid_sales()
	{
		var s_name=document.getElementById('s_name');
		var s_designation=document.getElementById('s_designation');
		var s_phone=document.getElementById('s_phone');		
		var s_time=document.getElementById('s_time');
		var s_drp_inq=document.getElementById('s_drp_inq');
		var s_mail=document.getElementById('s_mail');
		var s_comment=document.getElementById('s_comment');
				
				
		if(s_name.value=='' || s_name.value=='Name')
		{
		 alert('Please Enter Name.')
		 s_name.focus();
		 return false;
		}
		
		if(s_designation.value=='' || s_designation.value=='Designation')
		{
		 alert('Please Enter Designation Name.')
		 s_designation.focus();
		 return false;
		}
		
		if(s_phone.value=='' || s_phone.value=='Phone No')
		{
		 alert('Please Enter Mobile No .')
		 s_phone.focus();
		 return false;
		}
	
		else if(isNaN(s_phone.value))
		{
		   alert("Please Enter Numeric Value in Mobile No.");
			s_phone.value = "";
		   s_phone.focus();
		  return false;
		}
		
		
	if(s_time.value=='' || s_time.value=='Convenient Time to Call')
		{
		 alert('Please Enter Convenient Time.')
		 s_time.focus();
		 return false;
		}
		
		if(s_drp_inq.value=='' || s_drp_inq.value=='Inquiry For')
		{
		 alert('Please Select Project.')
		 s_drp_inq.focus();
		 return false;
		}
		if(s_mail.value=='' || s_mail.value=='Email')
		{
		 alert('Please Enter Your Email-Id.')
		 s_mail.focus();
		 return false;
		}
		
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var address = document.sales.s_mail.value;
	   if(reg.test(address) == false) {
		  alert('Invalid Email Address');
		  s_mail.focus();
		  return false;
	}
	
		
		if(s_comment.value=='' || s_comment.value=='Message')
		{
		 alert('Please Enter Message .')
		 s_comment.focus();
		 return false;
		}
		
		
	
	
	return true;
}


function valid_contactus()
	{
		var name1=document.getElementById('name1');
		var mail1=document.getElementById('mail1');
		var comment1=document.getElementById('comment1');
		
		
				
		if(name1.value=='' || name1.value=='Name')
		{
		 alert('Please Enter Name.')
		 name1.focus();
		 return false;
		}
			
		if(mail1.value=='' || mail1.value=='Email')
		{
		 alert('Please Enter Your Email-Id.')
		 mail1.focus();
		 return false;
		}
		
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var address = document.contactus.mail1.value;
	   if(reg.test(address) == false) {
		  alert('Invalid Email Address');
		  mail1.focus();
		  return false;
	}
	
		
		
		if(phone.value=='')
		{
		 alert('Please enter phone number.')
		 phone.focus();
		 return false;
		}
		
		else if(isNaN(phone.value))
		{
		   alert("Please Enter Numeric Value in Phone No.");
			phone.value = "";
		   phone.focus();
		  return false;
		}

	
	
	return true;
}

function checkform(theform){
	var why = "";
	 
	if(theform.txtInput.value == ""){
		why += "- Security code should not be empty.\n";
	}
	if(theform.txtInput.value != ""){
		if(ValidCaptcha(theform.txtInput.value) == false){
			why += "- Security code did not match.\n";
		}
	}
	if(why != ""){
		alert(why);
		return false;
	}
}
	
// Validate the Entered input aganist the generated security code function   
function ValidCaptcha(){
	var str1 = removeSpaces(document.getElementById('txtCaptcha').value);
	var str2 = removeSpaces(document.getElementById('txtInput').value);
	if (str1 == str2){
		return true;	
	}else{
		return false;
	}
}

// Remove the spaces from the entered and generated code
function removeSpaces(string){
	return string.split(' ').join('');
}

