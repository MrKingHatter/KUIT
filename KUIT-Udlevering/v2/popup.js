document.addEventListener("DOMContentLoaded", function() {
    var link = document.getElementById("udleveringslauncher");
    link.addEventListener("click", function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0].url.includes("https://serviceportal.ku.dk/CherwellClient/")) {
                chrome.tabs.sendMessage(tabs[0].id, { 
                    action: "executeCode", 
                    open: document.getElementById("open").value,
                    shut: document.getElementById("shut").value,
                    prep: document.getElementById("prep").value,
                    send: document.getElementById("send").value
                });
            };
        });
    })
})

getUser();
document.onchange = setUser;

function setUser() {
    chrome.storage.local.set(
        {
            KU_IT_udl_open: document.getElementById("open").value,
            KU_IT_udl_shut: document.getElementById("shut").value,
            KU_IT_udl_prep: document.getElementById("prep").value,
            KU_IT_udl_send: document.getElementById("send").value
        },
        getUser
    );
}

function getUser() {
    chrome.storage.local.get(
        ["KU_IT_udl_open", "KU_IT_udl_shut", "KU_IT_udl_prep", "KU_IT_udl_send"],
        function(result) {
            document.getElementById("open").value = result.KU_IT_udl_open;
            document.getElementById("shut").value = result.KU_IT_udl_shut;
            document.getElementById("prep").value = result.KU_IT_udl_prep;
            document.getElementById("send").value = result.KU_IT_udl_send;
        }
    );
}
