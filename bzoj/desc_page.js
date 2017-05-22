var titleobj=document.querySelector('center h2');
var probid=(new URLSearchParams(location.search)).get('id');
var username=document.querySelector('a[href^="userinfo.php"] font[color="red"]');

function add_btn(text,href,newtab) {
    var btn=document.createElement('a');
    btn.href=href;
    if(newtab)
        btn.target="_blank";
    btn.textContent=text;
    btn.style.marginLeft='1em';
    btn.style.fontSize='small';
    return btn;
}

// http://stackoverflow.com/questions/175739/is-there-a-built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
if(titleobj && probid && !isNaN(probid)) {
    titleobj.appendChild(add_btn('[Search]','https://www.baidu.com/s?wd=bzoj%20'+probid,true));
    if(username)
        titleobj.appendChild(add_btn('[My Status]','/JudgeOnline/status.php?problem_id='+probid+'&user_id='+username.textContent));
}