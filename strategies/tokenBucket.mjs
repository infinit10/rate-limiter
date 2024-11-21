export default class TokenBucket {
    constructor(bucketSize, tokenRefillRate) {
        this.bucketSize = bucketSize;
        this.tokens = bucketSize;
        this.tokenRefillRate = tokenRefillRate;
        this.lastRefillAt = Date.now();
        this.lastRequestAt = Date.now();
    }
    
    #refillBucket() {
        const currentTime = Date.now();
        const tokensToAdd = Math.floor((currentTime - this.lastRefillAt) * this.tokenRefillRate / 1000);
        this.tokens = Math.min(tokensToAdd + this.tokens, this.bucketSize);
        if (tokensToAdd > 0) {
            this.lastRefillAt = currentTime;
        }
    }
    
    allowRequest() {
        this.#refillBucket();
        if (this.tokens > 0) {
            this.tokens--;
            this.lastRequestAt = Date.now();
            return true;
        }
        return false;
    }
}
