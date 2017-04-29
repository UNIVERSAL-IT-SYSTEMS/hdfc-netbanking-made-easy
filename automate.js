/*
Author: Viranch Mehta
Email: email@viranch.me
*/

// 1. Auto-check Secure Access Image confirmation box
// 2. Auto-select 1st option from annoying dropdowns

// Ideal would be injecting `$('a[tabindex="4"]').click()` but jquery inside chrome extn is a pain :(
var inject = '(' + function() {
    var box = document.getElementById("chkrsastu");
    if (box) {
        box.checked = true;
    }

    // auto select from dropdown
    var whitelist = ['selAcct', 'fldPmntType', 'selCard'];
    var dropdowns = document.getElementsByTagName('select');
    console.log('found '+dropdowns.length+' dropdowns');
    for (var i in dropdowns) {
        var options = dropdowns[i].getElementsByTagName('option');
        var index;
        if (options.length == 0) {
            continue;
        } else if (options.length == 1) {
            index = 0;
        } else if (options[0].text.startsWith('- ')) {
            index = 1;
        } else {
            continue;
        }
        var event = document.createEvent("HTMLEvents");
        event.initEvent("change", true, true);
        dropdowns[i].selectedIndex = index;
        dropdowns[i].dispatchEvent(event);
        console.log('setting '+dropdowns[i].getAttribute('name')+' to '+options[index].text);
    }
} + ')();';

var script = document.createElement('script');
script.textContent = inject;
(document.head||document.documentElement).appendChild(script);
