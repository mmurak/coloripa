let G = new GlobalManager();
let cmuDictionary = new Dictionary(iDict);
let miniDictionary = new Dictionary(miniDict);

G.textArea.focus();



function doColourings() {
    clearOutputArea();
    clearListArea();

    let text = pronArea.value;
    let pool = text.split("");

    let flagArray = []; // consonant:1 vowel etc.:-1 symbols: 0

    for(const ch of pool) {
        let hitFlag = false;
        for(const key in G.dict) {
            if (G.dict[key][1].test(ch)) {
                appendTextInColor(ch, G.dict[key][0]);
                flagArray.push(G.dict[key][2]);
                hitFlag = true;
            }
        }
        if (hitFlag == false) {
            G.listArea1.innerHTML += "&nbsp;&nbsp;\"" + ch + "\"<br/>";
            flagArray.push(-1); // should be cleard
        }
    }

    // flagArray setting
    for (let i = 1; i < flagArray.length; i++) {
        if (flagArray[i-1] != -1) {
            flagArray[i] += (flagArray[i] != -1) ? flagArray[i-1] : 0;
        } else {
        }
    }
//    debugprint(pool, flagArray);
    // dictionary build-up
    let clusterDict = {};
    for (let i = flagArray.length-1; i >= 0; i--) {
        if (flagArray[i] < 2) continue;
        let chArray = [];
        while(flagArray[i] > 0) {
            if (!G.dict["space"][1].test(pool[i]) && !G.dict["stress"][1].test(pool[i])) {
                chArray.unshift(pool[i]);
            }
            i--;
        }
        clusterDict[chArray.join("")] = 1;
    }
    let a = Object.keys(clusterDict);
    for(let i of a.sort()) {
        G.listArea2.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;/" + i + "/<br/>";
    }
    pronArea.focus();
}

function clearTextArea() {
    textArea.value = "";
    pronArea.value = "";
    clearOutputArea();
    pronArea.focus();
}

function clearOutputArea() {
    outputArea.innerHTML = "";
    G.listArea1.innerHTML = "";
    G.listArea2.innerHTML = "";
}

function clearListArea() {
    G.listArea1.innerHTML = "Unknown character(s):<br/>";
    G.listArea2.innerHTML = "&nbsp;&nbsp;C clusters (incl. inter-words):<br/>";
}

function appendTextInColor(text, color) {
    if (text == "\n") {
        outputArea.innerHTML += "<br/>";
    } else {
        outputArea.innerHTML += "<span style='color:" + color + ";'>" + text + "</span>";
    }
}

//English to IPAish converter

function convertButton() {
    G.feelingLucky = false;
    let pron = convert(G.textArea.value);
    G.pronArea.value = pron;
    clearOutputArea();
    G.listArea1.innerHTML = "";
    G.listArea2.innerHTML = "";
    G.pronArea.focus();
}
function convertLuckyButton() {
    G.feelingLucky = true;
    let pron = convert(G.textArea.value);
    G.pronArea.value = pron;
    clearOutputArea();
    G.listArea1.innerHTML = "";
    G.listArea2.innerHTML = "";
    G.pronArea.focus();
}

function convert(input) {
    let tempOutput = ""
    let prompter = new ContextPrompter(20);
    let theFlag = false;
    while (true) {
        let retArray = "";
        let m = input.match(G.tokenExp);
        if (m == null) {
            if (theFlag) {
                tempOutput += "ðə";
            }
            tempOutput += input;
            break;
        }
        prompter.add(m[1]);
        if (m[2].toLowerCase() == "the") {    // patching up for 'the' problem.
            if (theFlag) {
                tempOutput += "ðə";
                tempOutput += m[1];
                prompter.add(m[2]);
                input = m[3];
                continue;
            }
            theFlag = true;
            tempOutput += m[1];
            prompter.add(m[2]);
            input = m[3];
            continue;
        } else {
            retArray = miniDictionary.searchEntry(m[2]);
            if (retArray.length == 0) {
                retArray = cmuDictionary.searchEntry(m[2]);
            }
        }
        let ph;
        switch (retArray.length) {
            case 1:
                ph = retArray[0];
                break;
            case 0:
                // Not in dictionary
                ph = "#";
                break;
            default:
                // Multiple pron.
                if (G.feelingLucky) {
                    ph = retArray[0];
                } else {
                    let candidate = [];
                    let num = 1;
                    for (const i of retArray) {
                        candidate += num + ": " + i + "\n";
                        num++;
                    }
                    let selected;
                    do {
                        selected = prompt(prompter.getPrompt() + " <" + m[2] + ">" + m[3].substr(0, 20) + "...\n" + candidate);
                    } while((!G.numberExp.test(selected)) || (selected > retArray.length) );
                    ph = retArray[selected-1];
                }
        }
        if (theFlag) {
            if (G.dict['vowel'][1].test(ph.substr(0, 1))) {
                tempOutput += "ðɪ";
            } else {
                tempOutput += "ðə";
            }
            theFlag = false;
        }
        tempOutput += m[1]
        tempOutput += ph;
        prompter.add(m[2]);
        input = m[3];
    }
    return tempOutput;
}
