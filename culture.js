let cur;
let defaults;
let languageCodes = [
    "fr-dz",
    "es-ar",
    "en-au",
    "nl-be",
    "fr-be",
    "es-bo",
    "bs-ba",
    "pt-br",
    "en-ca",
    "fr-ca",
    "cs-cz",
    "es-cl",
    "es-co",
    "es-cr",
    "sr-latn-me",
    "en-cy",
    "da-dk",
    "de-de",
    "es-ec",
    "et-ee",
    "en-eg",
    "es-sv",
    "es-es",
    "fr-fr",
    "es-gt",
    "en-gulf",
    "es-hn",
    "en-hk",
    "hr-hr",
    "en-in",
    "id-id",
    "en-ie",
    "is-is",
    "it-it",
    "en-jo",
    "lv-lv",
    "en-lb",
    "lt-lt",
    "hu-hu",
    "en-my",
    "en-mt",
    "es-mx",
    "fr-ma",
    "nl-nl",
    "en-nz",
    "es-ni",
    "en-ng",
    "nb-no",
    "de-at",
    "en-pk",
    "es-pa",
    "es-py",
    "es-pe",
    "en-ph",
    "pl-pl",
    "pt-pt",
    "es-pr",
    "es-do",
    "ro-md",
    "ro-ro",
    "en-sa",
    "de-ch",
    "en-sg",
    "sl-si",
    "sk-sk",
    "en-za",
    "sr-latn-rs",
    "en-lk",
    "fr-ch",
    "fi-fi",
    "sv-se",
    "fr-tn",
    "tr-tr",
    "en-gb",
    "en-us",
    "es-uy",
    "es-ve",
    "vi-vn",
    "el-gr",
    "ru-by",
    "bg-bg",
    "ru-kz",
    "ru-ru",
    "uk-ua",
    "he-il",
    "ar-iq",
    "ar-sa",
    "ar-ly",
    "ar-eg",
    "ar-gulf",
    "th-th",
    "ko-kr",
    "zh-cn",
    "zh-tw",
    "ja-jp",
    "zh-hk"
    ]



document.addEventListener("DOMContentLoaded", function (params) {
  
    let brw = window.browser || window.chrome;   
    let fromSelect = document.getElementById("fromSelect");
    let toSelect = document.getElementById("toSelect");
    let defaultInput = document.getElementById("setdefault");
    let chlabel = document.getElementById("chlabel");
    languageCodes.sort();

    let brwStorage;   

   
    if (brw.storage === undefined || (brw.storage.sync === undefined && brw.storage.local === undefined)){
             chlabel.style.display = "none";
    }
    else 
    {
        brwStorage = brw.storage.sync || brw.storage.local;
    }


    if (brwStorage)
    {
        brwStorage.get(['defaults'],function (params) {
            defaults = params.defaults;
            let { fromIndex, toIndex } = getDefaultsIndex();

            setSelections(fromIndex, toIndex, fromSelect, toSelect);
         
        });   
    }
    else 
    {
        let fromIndex = 0;
        let toIndex = 0;
        setSelections(fromIndex, toIndex, fromSelect, toSelect);
    }

   

   

    if (cur === undefined || cur === null) {
     
        cur = document.getElementById("culture");
        cur.addEventListener("click", function (params) {            
           
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

                    if (defaultInput.checked)
                    {
                        defaults = {
                            from : languageCodes[fromSelect.value],
                            to : languageCodes[toSelect.value]
                        }

                        brwStorage.set({'defaults' : defaults},function () {
                           console.log("defaults saved!"); 
                        });
                    }
    
                   
                }


                window.close();
                

            });

        });

    }


})

function setSelections(fromIndex, toIndex, fromSelect, toSelect) {
    for (let index = 0; index < languageCodes.length; index++) {
        const element = languageCodes[index];
        let fromSelected = index === fromIndex;
        let toSelected = index === toIndex;
        fromSelect.options.add(new Option(element, index, index === 0, fromSelected));
        toSelect.options.add(new Option(element, index, index === 0, toSelected));
    }
}

function getDefaultsIndex() {
    let fromIndex = 0;
    let toIndex = 0;
    if (defaults) {
        fromIndex = Math.max(0, languageCodes.findIndex(x => x === defaults.from));
        toIndex = Math.max(0, languageCodes.findIndex(x => x === defaults.to));
    }
    return { fromIndex, toIndex };
}
