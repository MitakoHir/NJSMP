const { Transform } = require('stream');
const StringDecoder = require('string_decoder').StringDecoder;

module.exports = new Transform({
    transform(chunk, encoding, callback) {
        if (!this.stringDecoder) this.stringDecoder = new StringDecoder('utf-8');
        try {
            const transformedChunk = {};
            const parsedChunk = JSON.parse(this.stringDecoder.write(chunk));
            Object.keys(parsedChunk).forEach(key => transformedChunk[key.toLowerCase()] = parsedChunk[key]);
            this.push(JSON.stringify(transformedChunk) + '\n');
            callback();   
        } catch (e) {
            console.error(e);
        }
    }
});