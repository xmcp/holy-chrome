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

// resolve login request
if(document.querySelector('a[href="loginpage.php"]') && location.href.indexOf('submitpage.php')!==-1) {
    history.pushState(null,'',location.href); // thus redirect-back will work
    location.href='loginpage.php';
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

// one-key to-top
var topper=document.createElement('div');
topper.style.position='fixed';
topper.style.height='100%';
topper.style.width='3px';
topper.style.top='0';
topper.style.left='0';
topper.style.backgroundColor='rgba(0,0,255,.2)';
topper.addEventListener('click',function() {
    scrollTo(0,0);
});
document.body.appendChild(topper);