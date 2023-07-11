class ContextPrompter {
    constructor(max) {
        this.tokenArray = [];
        this.max = max;
    }
    add(token) {
        this.tokenArray.push(token);
        this.tokenArray = this.tokenArray.splice(-this.max);
    }
    getPrompt() {
        return this.tokenArray.join("");
    }
}
