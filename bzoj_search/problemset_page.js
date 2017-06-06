var tbl=document.querySelector('#problemset>tbody');
var searchbox=document.querySelector('input[name=search]');
var bottomobj=document.querySelector('a~hr');

function search() {
    var store=db.transaction([DBSTORE],'readwrite').objectStore(DBSTORE);
    var query=new RegExp(searchbox.value,'i');
    var counter=0;
    tbl.innerHTML='';
    store.openCursor().onsuccess=function(evt) {
      var cursor=evt.target.result;
      if(!cursor) return;
      
      if(query.test(cursor.value.text)) {              
          counter++;
          var elem=document.createElement('tr');
          elem.className=counter%2?'evenrow':'oddrow';
          elem.innerHTML=cursor.value.html;
          tbl.appendChild(elem);
      }
      cursor.continue();
    };
}

getdb(function(db) {
    window.db=db;
    // update current db
    var store=db.transaction([DBSTORE],'readwrite').objectStore(DBSTORE);
    Array.from(tbl.querySelectorAll('tr')).forEach(function(row) {
        store.put({
            'id': row.childNodes[1].textContent,
            'text': row.childNodes[2].textContent+'|'+row.childNodes[3].textContent,
            'html': row.innerHTML
        });
    });
    // search ui
    var btn=document.createElement('button');
    btn.type='button';
    btn.textContent='Local Search';
    btn.addEventListener('click',search);
    searchbox.addEventListener('keypress',function(evt) {
        if(evt.charCode==13) { // enter
            evt.preventDefault();
            search();
        }
    })
    searchbox.parentNode.insertBefore(btn,searchbox.nextSibling);
    // stats
    store.count().onsuccess=function(evt) {       
        var stats=document.createElement('a');
        stats.href='/JudgeOnline/problemset.php?search=';
        stats.target='_blank';
        stats.textContent=' [ BZOJ Local Search: '+this.result+' entries cached. Click to update all. ] ';
        bottomobj.parentNode.insertBefore(stats,bottomobj);
    }
});