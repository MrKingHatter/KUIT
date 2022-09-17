chrome.runtime.onMessage.addListener(function(request) {
    if(request.action === 'executeCode') {
        var [textbox, user, caseNr] = launch();
        var text = generateText(request.send, user, caseNr, request.open, request.shut, request.prep);
        textbox.innerHTML += text;
    }
});

function launch() {
    if (getEmailEditor() == null) return;
    var frame = document.getElementById("email-rteditor-iframe");
    var textbox = frame.contentWindow.document.body;
    [user, caseNr] = grabUserAndCase(textbox);
    textbox.innerHTML = "&#xfeff;";
    return [textbox, user, caseNr];
}

function grabUserAndCase(body) {
    var userRow = body.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1];
    var userMessage = userRow.getElementsByTagName("td")[1].getElementsByTagName("span")[0].innerHTML;
    var ispace = userMessage.indexOf(" ");
    var user = userMessage.substring(ispace+1);

    var caseRow = body.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[3];
    var caseMessage = caseRow.getElementsByTagName("td")[1].getElementsByTagName("span")[1].innerHTML;
    var caseNr = caseMessage;

    return [user, caseNr]
}

function getEmailEditor() {
    var editor = document.querySelector('[id*="email-editor-form"]');
    return editor;
}

function parseLate(open, shut, prep) {
    const zeroPad = (num, places) => String(num).padStart(places, '0')

    const [ohour, ominute] = open.split(":").map(function(e){ return parseInt(e); });
    const [shour, sminute] = shut.split(":").map(function(e){ return parseInt(e); });
    const [phour, pminute] = prep.split(":").map(function(e){ return parseInt(e); });
    var today = new Date();
    open = new Date(today.setHours(ohour+phour, ominute+pminute));
    shut = new Date(today.setHours(shour-phour, sminute-pminute));
            
    open = zeroPad(open.getHours(), 2) + ":" + zeroPad(open.getMinutes(), 2);
    shut = zeroPad(shut.getHours(), 2) + ":" + zeroPad(shut.getMinutes(), 2);

    return [open, shut];
}

function generateText(sender, user, caseNr, open, shut, prep) {

    var [iBuffer, eBuffer] = parseLate(open, shut, prep);

    var text = template.substring(1, template.length-1);
        
    text = text.replaceAll("[User]", user);
    text = text.replaceAll("[Case]", caseNr);
    text = text.replaceAll("[Send]", sender);
    text = text.replaceAll("[Open]", open);
    text = text.replaceAll("[Shut]", shut);
    text = text.replaceAll("[Prep]", iBuffer);
    text = text.replaceAll("[Clos]", eBuffer);
    text = text.replaceAll("\n", "<br>");
        
    return text;
}
