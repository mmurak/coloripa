class GlobalManager {
    constructor() {
        this.pronArea = document.getElementById("pronArea");
        this.outputArea = document.getElementById("outputArea");
        this.clearButton = document.getElementById("clearButton");
        this.processButton = document.getElementById("processButton");
        this.textDialog = document.getElementById("textDialog");
        this.textArea = document.getElementById("textArea");
        this.listArea1 = document.getElementById("listArea1");
        this.listArea2 = document.getElementById("listArea2");

        this.dict = { 
            'space': ['#a0a0af', new RegExp("[ \n]"), 0],
            'vowel' : ['#a0a0af', new RegExp("[iyɨʉɯuɪʏʊeøɘɵɤoəɛœɜɞʌɔæɐaɶɑɒ]"), -1],
            'suprasegmental': ['#a0a0af', new RegExp("[ːˑ̆|‖‿]"), -1],
            'stress' : ['#a0a0af', new RegExp("[ˈˌ\u{300}\u{301}]"), 0],
            'punctuation': ['black', new RegExp("[,\.]"), -1],
            'plosive': ['red', new RegExp("[pbtdʈɖcɟkɡqɢʔ]"), 1],
            'nasal': ['brown',  new RegExp("[mɱnɳɲŋɴ]"), 1],
            'trill': ['orange', new RegExp("[ʙrʀ]"), 1],
            'tapFlap': ['pink', new RegExp("[ⱱɾɽ]"), 1],
            'fricative': ['blue', new RegExp("[ɸβfvθðszʃʒʂʐçʝxɣχʁħʕhɦ]"), 1],
            'lateralFricatives': ['marine', new RegExp("[ɬɮ]"), 1],
            'approximant': ['orange', new RegExp("[ʋɹɻjɰɚ]"), 1],   // added rhotic schwa
            'lateralApproximants': ['orange', new RegExp("[lɭʎʟ]"), 1],
            'other': ['orange', new RegExp("[ʘǀǃǂǁɓɗʄɠʛʼʍwɥʜʢʡɕʑɺɧ]"), 1],
            'affricative': ['red', new RegExp("[ʣʤʥʦʧʨʩʪʫ]"), 1],
        };
        this.tokenExp = new RegExp("([^'A-Z]*)(['A-Z]+)(.*)", "msi");
        this.numberExp = new RegExp(/^[0-9]+$/);

        this.digraphManager = new DigraphManager();
        this.feelingLucky = true;
    }
}
