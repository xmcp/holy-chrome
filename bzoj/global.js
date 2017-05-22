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

['faqs.php','donation.php'].forEach(function(url) {
    var obj=document.querySelector('tr.hd a[href*="'+url+'"]');
    if(obj)
        obj.style.display='none';
});

function bzoj_search() {
    alert(1);
}

if(username && status_header) {
    status_header.parentNode.insertBefore(add_btn('[My]','/JudgeOnline/status.php?user_id='+username.textContent),status_header);
}
if(problems_header) {
    problems_header.parentNode.insertBefore(add_btn('[Search]','#',function() {
        var res=prompt('Search:');
        if(res)
            location.href='/JudgeOnline/problemset.php?search='+encodeURIComponent(res);
    }),problems_header);
}