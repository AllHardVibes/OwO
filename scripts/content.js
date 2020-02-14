var htmlElements = ['p', 'th', 'tr', 'i', 'button', 'td', 'span', 'a', 'b', 'h1', 'h2', 'h3', 'h4',
    'div', 'em', 'cite', 'li', 'code', 'yt-formatted-string', 'abbr', 'acronym', 'textarea', 'fieldset',
    'legend', 'caption', 'title'];

var actual_JSON;
var size;
var power;
var imageSelector;
var textSelector;

var imageLinks = {};

init(function() {
    initImageSel(function() {
        if(power){
            checkText();
        }
    });
});

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    if(power){
        checkText();
    }
});

observer.observe(document.body, {
  subtree: true,
  childList: true,
  attributes: true
});

function checkText(){
    var hello2 = document.querySelectorAll(textSelector);

    if(hello2.length>0)
        reText(hello2);
}

function init(callback) {
    chrome.storage.local.get("owaitData", function(st){
        actual_JSON = st.owaitData;
        console.log('Entered');
        chrome.storage.local.get("size", function(st2){
            size = st2.size;
            chrome.storage.local.get("power", function(st3){
                power = st3.power == "on";
                callback();
            });
        });
    });
}

function initImageSel(callback){
    imageSelector = "img";
    for(var i=0;i<imageLinks.length;i++){
        imageSelector = imageSelector+":not([src=\'"+imageLinks[i]+"\'])";
    }
    textSelector = "";
    for(var i=0;i<htmlElements.length;i++){
        textSelector = textSelector+htmlElements[i]+":not(.owo)";
        if(i!=htmlElements.length-1)
            textSelector += ', ';
    }
    callback();
}

function changeSrc(images){
    for (var i = 0; i < images.length; i++){
        var index = Math.floor((Math.random() * imageLinks.length));
        var image = images[i];

        image.src = imageLinks[index];
    }
}

function reText(elements){
    console.log("retexting "+elements.length);
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.classList.add("owo");

        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text;

                for (var z = 0; z<size;z++ ) {
                    if(actual_JSON["Selector"+z].selected)
                        replacedText = replacedText.replace(new RegExp(actual_JSON["Selector"+z].original,
                         'gi'), actual_JSON["Selector"+z].converted);
                }

                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}

