class DigraphManager {
    constructor() {
        this.digraphTable = [
            ["ʣ", "dz"],
            ["ʤ", "dʒ"],
//            ["ʥ", "dʑ"],
            ["ʦ", "ts"],
            ["ʧ", "tʃ"],
//            ["ʨ", "tɕ"],
//            ["ʩ", "fŋ"],
//            ["ʪ", "ls"],
//            ["ʫ", "lz"],
            ["ɚ", "ər"],
        ];
    }
    fromDigraph(str) {
        for (const pair of this.digraphTable) {
            str = str.replaceAll(pair[0], pair[1]);
        }
        return str;
    }
    toDigraph(str) {
        for (const pair of this.digraphTable) {
            str = str.replaceAll(pair[1], pair[0]);
        }
        return str;
    }
}
