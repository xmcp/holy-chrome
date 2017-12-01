chrome.commands.onCommand.addListener(function(command) {
    if(command=='extension-page')
        chrome.tabs.create({
            url: 'chrome://extensions'
        });
});