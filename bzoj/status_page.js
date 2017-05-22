var username=document.querySelector('a[href^="userinfo.php"] font[color="red"]');
var submits=document.querySelector('table+table[align="center"]');

function add_btn(text,href,callback) {
    var btn=document.createElement('a');
    btn.href=href;
    btn.addEventListener('click',callback);
    btn.textContent=text;
    return btn;
}

if(submits) {
    if(username)
        Array.from(submits.querySelectorAll('tr:not(.toprow) a[href^="userinfo.php?user="]')).forEach(function(unobj) {
            var un=(new URLSearchParams(unobj.search)).get('user');
            if(un==username.textContent) {
                unobj.style.backgroundColor='#ff7';
                unobj.style.padding='0 1em 0 1em';
            }
        });
    runids=[];
    Array.from(submits.querySelectorAll('tr:not(.toprow) td>font[color="gray"],tr:not(.toprow) td>font[color="orange"]')).forEach(function(statusobj) {
        var idobj=statusobj.parentNode.parentNode.firstChild;
        if(idobj) {
            var runid=parseInt(idobj.textContent);
            if(runid && !isNaN(runid)) {
                idobj.innerHTML='';
                idobj.appendChild(add_btn(runid+'','#',function() {
                    chrome.runtime.sendMessage({'action':'switch','target':runid+''});
                    location.reload();
                }));
                runids[runid]=idobj;
            }
        }
    });
    chrome.runtime.sendMessage({action:'report',ids:Object.keys(runids)},function(resp) {
        if(resp && resp.hit) {
            var idobj=runids[resp.hit];
            idobj.style.backgroundColor='#3f3';
            idobj.style.padding='0 1em 0 1em';
            setTimeout(function(){location.reload();},500);
        }
    });
}