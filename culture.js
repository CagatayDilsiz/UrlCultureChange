let cur;

document.addEventListener("DOMContentLoaded", function (params) {

    let fromSelect = document.getElementById("fromSelect");
    let toSelect = document.getElementById("toSelect");
    languageCodes.sort();
    for (let index = 0; index < languageCodes.length; index++) {
        const element = languageCodes[index];

        fromSelect.options.add(new Option(element,index));
        toSelect.options.add(new Option(element,index));        
    }

    if (cur === undefined || cur === null) {
     
        cur = document.getElementById("culture");
        cur.addEventListener("click", function (params) {            
            var brw = window.browser || window.chrome;   
            brw.tabs.query({ 'currentWindow': true, 'active': true }, function (tabs) {

                if (fromSelect.value && toSelect.value)
                {
                    if (tabs && tabs.length > 0) {
                        let tab = tabs[tabs.length - 1];                  
    
                        if (tab.url.toLowerCase().includes(languageCodes[fromSelect.value])) {
                            tab.url = tab.url.toLowerCase().replace(languageCodes[fromSelect.value], languageCodes[toSelect.value]);
                        }
    
                        brw.tabs.update({ url: tab.url });                   
                    }
    
                   
                }
                window.close();
                

            });

        });

    }


})