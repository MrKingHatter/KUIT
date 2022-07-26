window.onload = function() {
    readFile();
    getUser();
    document.getElementById("send").onchange = setUser;
    document.getElementById("autocopy").onchange = setUser;
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

function generateText() {
    var text = document.getElementById("template").value;
    var send = document.getElementById("send").value;
    var name = document.getElementById("user").value;
    var numb = document.getElementById("case").value;
    var open = document.getElementById("open").value;
    var shut = document.getElementById("shut").value;
    var prep = document.getElementById("prep").value;

    [prep, clos] = parseLate(open, shut, prep);
        
    text = text.replaceAll("[User]", name);
    text = text.replaceAll("[Case]", numb);
    text = text.replaceAll("[Send]", send);
    text = text.replaceAll("[Open]", open);
    text = text.replaceAll("[Shut]", shut);
    text = text.replaceAll("[Prep]", prep);
    text = text.replaceAll("[Clos]", clos);
        
    document.getElementById("result").value = text;

    var auto = document.getElementById("autocopy")
    if (auto.checked == true) {
        copy2Clipboard();
    }
        
    return false;
}
          
function copy2Clipboard() {
    var copyText = document.getElementById("result").value;
    navigator.clipboard.writeText(copyText);
    var oldtext = document.getElementById("copy").innerHTML;
    document.getElementById("copy").innerHTML = "Copied to clipboard";
    setTimeout(function() { 
        document.getElementById("copy").innerHTML = oldtext;
        }, 2000);
}

function readFile() {
    document.getElementById("template").value = template.substring(1, template.length-1);
}

function darkmode() {
    var sheethrefs = ["light-style.css", "dark-style.css"];
    var element = document.getElementById("theme");
    var button = document.getElementById("darkmode");
    if (element.getAttribute("href") == sheethrefs[0]) {
        button.innerHTML = "Light mode";
        element.href = sheethrefs[1];
    } else {
        button.innerHTML = "Dark mode";
        element.href = sheethrefs[0];
    }
    setUser();
}

function getUser() {
    var localData = window.localStorage.getItem("KU-IT Udlevering User Data")
    if (localData == null) {
        document.getElementById("send").value = "KU-IT Support"
        document.getElementById("theme").href = "light-style.css"
        document.getElementById("autocopy").checked = false;
        setUser();
    } else {
        const data = JSON.parse(localData);

        if (data.theme != document.getElementById("theme").href) { darkmode(); }
        document.getElementById("send").value = data.name;
        document.getElementById("autocopy").checked = data.copy;
    }
}

function setUser() {
    var Utheme = document.getElementById("theme").href;
    var Uname = document.getElementById("send").value;
    var Ucopy = document.getElementById("autocopy").checked;

    const data = {
        "name": Uname,
        "theme": Utheme,
        "copy": Ucopy,
    };

    window.localStorage.setItem("KU-IT Udlevering User Data", JSON.stringify(data));
}

function clearUser() {
    window.localStorage.removeItem("KU-IT Udlevering User Data");
    location.reload();
}
