active_watcher=null;
chrome.runtime.onMessage.addListener(function(msg,_,sendResponse) {
    if(msg.action=='switch')
        active_watcher=(active_watcher==msg.target)?null:msg.target;
    else if(msg.action=='report')
        if(msg.ids.indexOf(active_watcher)!=-1)
            sendResponse({hit:active_watcher});
})