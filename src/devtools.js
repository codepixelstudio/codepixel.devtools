var xhr = new XMLHttpRequest();

xhr.open('GET', '../assets/css/codepixel.devtools.css');

xhr.onload = function() {

    chrome.devtools.panels.applyStyleSheet(xhr.responseText);

};

xhr.send();
