import { Transform } from "stream";
import { StringDecoder } from "string_decoder";

export default new Transform({
    transform(chunk, encoding, next) {
        if (!this.stringDecoder) this.stringDecoder = new StringDecoder('utf-8');
        try {
            const transformedChunk = {};
            const parsedChunk = JSON.parse(this.stringDecoder.write(chunk));

            Object.keys(parsedChunk).forEach(key => transformedChunk[ key.toLowerCase() ] = parsedChunk[ key ]);

            this.push(JSON.stringify(transformedChunk) + '\n');
            next();
        } catch (e) {
            console.error(e);
        }
    }
});