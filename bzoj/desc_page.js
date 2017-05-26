var probid=(new URLSearchParams(location.search)).get('id');

var titleobj=document.querySelector('center h2');
var username=document.querySelector('a[href^="userinfo.php"] font[color="red"]');
var bottomobj=document.querySelector('a~hr');

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

function parse_discuss(dom,xhr_url) {
    xhr_url=new URL(xhr_url,location.href).href;
    var tbl=dom.querySelector('body>center>div>table');
    Array.from(tbl.querySelectorAll('tr:not([class=toprow])')).forEach(function(elem) {
        if(elem.childNodes[2] && elem.childNodes[2].textContent!=probid)
            elem.parentNode.removeChild(elem);
    });
    Array.from(tbl.getElementsByTagName('a')).forEach(function(elem) {
        elem.setAttribute('href',new URL(elem.getAttribute('href'),xhr_url).href);
    });
    return tbl;
}

// http://stackoverflow.com/questions/175739/is-there-a-built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
if(titleobj && probid && !isNaN(probid)) {
    var container=document.createElement('p');
    container.style.fontWeight='bold';
    container.appendChild(add_btn('[Search]','https://www.baidu.com/s?wd=bzoj%20'+probid,true));
    container.appendChild(add_btn('[All Status]','/JudgeOnline/status.php?problem_id='+probid));
    if(username)
        container.appendChild(add_btn('[My Status]','/JudgeOnline/status.php?problem_id='+probid+'&user_id='+username.textContent));
    
    // https://stackoverflow.com/questions/4793604/how-to-do-insert-after-in-javascript-without-using-a-library
    titleobj.parentNode.insertBefore(container,titleobj);
    
    if(bottomobj) {
        var dscz=document.createElement('div');
        dscz.textContent='Loading discuss page...';
        bottomobj.parentNode.insertBefore(dscz,bottomobj);
        var xhr=new XMLHttpRequest();
        var xhr_url='/JudgeOnline/wttl/wttl.php?pid='+probid;
        xhr.open('get',xhr_url);
         xhr.onreadystatechange=function() {
            if(this.readyState!=4 || this.status!=200) {
                dscz.textContent='Cannot load discuss page!';
                return;
            }
            dscz.textcontent='Processing discuss paeg...';
            var parser=new DOMParser();
            dscz.parentNode.replaceChild(parse_discuss(parser.parseFromString(xhr.responseText,'text/html'),xhr_url),dscz);
        };
        xhr.send();
    }
}