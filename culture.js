let cur;
document.addEventListener("DOMContentLoaded", function (params) {
    console.log(params);
    if (cur === undefined || cur === null) {
        cur = document.getElementById("culture");

        cur.addEventListener("click", function (params) {

            chrome.tabs.query({ 'currentWindow': true, 'active': true }, function (tabs) {

                if (tabs && tabs.length > 0) {
                    let tab = tabs[tabs.length - 1];                  

                    if (tab.url.toLowerCase().includes("tr-tr")) {
                        tab.url = tab.url.toLowerCase().replace("tr-tr", "en-us");
                    }

                    chrome.tabs.update({ url: tab.url });                   
                }

                window.close();

            });

        });

    }


})