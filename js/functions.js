function genratecode()
{
	
var  showval='<input type="text" name="password" id="password" style="font-size: 30px;"  maxlength="70" value="Password" onfocus="return click_event_pwd(\'password\',\'Password\');" onblur="return blur_event_pwd(\'password\',\'Password\');" onmouseover="Tip(\'Password\')" onmouseout="UnTip()"/>';
document.getElementById('manage_pasword').innerHTML=showval;
	
}


function click_event_pwd(id,value)
{
	//document.getElementById(id).type='password';
	/*mid=document.getElementById(id);
	alert(mid.style);
	var newInput = document.createElement('input');
    newInput.type = 'password'; // that should work even with IE
    newInput.name = 'password';
    newInput.id = 	'password';
	newInput.value =	"";
	//newInput.width=	"30px";
	newInput.onmouseover=new Function( Tip('Password') );
	newInput.onFocus ="return click_event_pwd('password','Password')";
	mid.parentNode.replaceChild(newInput, mid);
	newInput.onFocus = new Function(alert(1));
	
	/*var objid = document.getElementById(id); 
	delete objid;
	var  showval='<input type="text" name="password" id="password" style="font-size: 30px;"  maxlength="70" value="" onfocus="return click_event_pwd(\'password\',\'Password\');" onblur="return blur_event_pwd(\'password\',\'Password\');" onmouseover="Tip(\'Password\')" onmouseout="UnTip()"/>';
	document.getElementById('manage_pasword').innerHTML=showval;
	//document.getElementById('password').focus();
	*/
	

	var var_id=document.getElementById(id);
	if(var_id.value==value)
	{
		var_id.value='';
		var_id.type='password';
	}
	
}

function blur_event_pwd(id,value)
{
	var var_id=document.getElementById(id);
	if(var_id.value=='')
	{
		var_id.value=value;
		var_id.type='text';
	}
	
	
}

function click_event(id,value)
{
	var var_id=document.getElementById(id);
	
	if(var_id.value==value)
	{
		var_id.value='';
	}
	
}


function blur_event(id,value)
{
	var var_id=document.getElementById(id);

	
	if(var_id.value=='')
	{
	var_id.value=value;
	}
}

// JavaScript Document