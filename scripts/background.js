'use strict';

var newProfile;

chrome.runtime.onInstalled.addListener(function() {
	init(function(response) {
        if(newProfile){
            console.log("New user OwO");
            chrome.storage.local.set({owaitData: response}, function() {
                chrome.storage.local.get("owaitData", function(st){
                    console.log(st.owaitData);
                });
            });
        }

        chrome.storage.local.get("owaitData", function(st){
            keyAmount(st.owaitData);
        });
		
        chrome.storage.local.set({power: "on"}, function() {
            chrome.storage.local.get("power", function(st){
                console.log(st.power);
            });
        });
	});

    alert("Enjoy your OwO experience");
});

function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function keyAmount(obj) 
{ 
    var counter=Object.keys(obj).length;
    chrome.storage.local.set({size: counter}, function() {
        console.log(counter);
    });
}

function init(callback) {
 loadJSON(function(response) {
    chrome.storage.local.get("owaitData", function(st){
        newProfile = st.owaitData == undefined;
        callback(JSON.parse(response));
    });
 });
}
