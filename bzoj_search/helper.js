var DBNAME='bzoj-search-db';
var DBVER=1;
var DBSTORE='problems';

function getdb(callback) {
    var req=indexedDB.open(DBNAME,DBVER);
    req.onsuccess=function(evt) {
        callback(this.result); // evt.result is the db obj
    }
    req.onupgradeneeded=function(evt) {
        var store=evt.currentTarget.result.createObjectStore(
            DBSTORE,{keyPath: 'id'}
        );
    }
}