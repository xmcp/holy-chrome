var username=document.querySelector('a[href*="userinfo.php"] font[color="red"]');
var status_header=document.querySelector('tr.hd a[href*="status.php"]');
var problems_header=document.querySelector('tr.hd a[href*="problemset.php"]');

function add_btn(text,href,callback) {
    var btn=document.createElement('a');
    btn.href=href;
    if(callback)
        btn.addEventListener('click',callback);
    btn.textContent=text;
    btn.style.color="red";
    return btn;
}

// resolve 5xx error
if(document.title.charAt(0)==='5' && document.body && document.body.getAttribute('bgcolor')==='white') {
    var cancelbtn=document.createElement('button');
    cancelbtn.textContent=' Stop Auto Refreshing ';
    cancelbtn.style.fontSize='1.25em';
    cancelbtn.style.padding='.25em';
    document.body.appendChild(cancelbtn);
    var refreshid=setTimeout(function() {
        cancelbtn.textContent='Refreshing...';
        cancelbtn.setAttribute('disabled','disabled');
        location.reload();
    } ,1000);    
    cancelbtn.addEventListener('click',function() {
        clearTimeout(refreshid);
        cancelbtn.parentNode.removeChild(cancelbtn);
    });
}

// hide link
['faqs.php','donation.php'].forEach(function(url) {
    var obj=document.querySelector('tr.hd a[href*="'+url+'"]');
    if(obj)
        obj.style.display='none';
});

// add link
if(username && status_header) {
    status_header.parentNode.insertBefore(add_btn('[My]','/JudgeOnline/status.php?user_id='+username.textContent),status_header);
}