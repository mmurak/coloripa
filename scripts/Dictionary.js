class Dictionary {
    constructor(dictData) {
        this.digraphManager = new DigraphManager();
        this.dictionary = {};
        for (let [key, value] of Object.entries(dictData)) {
            value.forEach(elem => {
                if (elem in this.dictionary) {
                    this.dictionary[elem] += "," + this.digraphManager.toDigraph(key);
                } else {
                    this.dictionary[elem] = this.digraphManager.toDigraph(key);
                }
            });
        }
        this.numberExp = new RegExp(/^[0-9]+$/);
    }
    searchEntry(entry) {
        entry = entry.toLowerCase();
        if (entry in this.dictionary) {
            let candidates = this.dictionary[entry].split(/,/);
            return this.dictionary[entry].split(/,/);
        } else {
            return [];
        }
    }
}
