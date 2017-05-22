var username=document.querySelector('a[href^="userinfo.php"] font[color="red"]');
var status_header=document.querySelector('tr.hd a[href*="status.php"]');

function add_btn(text,href,newtab) {
    var btn=document.createElement('a');
    btn.href=href;
    if(newtab)
        btn.target="_blank";
    btn.textContent=text;
    btn.style.color="red";
    return btn;
}

if(username && status_header) {
    status_header.parentNode.insertBefore(add_btn('[My]','/JudgeOnline/status.php?user_id='+username.textContent),status_header);
}