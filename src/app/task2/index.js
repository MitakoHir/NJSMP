import  path from 'path';
import csv from "csvtojson";
import fs from "fs";
import transformKeysToLowerCase from '../utils/lowercase-csv-keys';

(function main() {
    const rootPath = path.resolve();

    const pathToCsvFile = rootPath + '/src/assets/node_mentoring_t1_2_input_example.csv';
    const pathToTxtFile = rootPath + '/src/assets/output.txt';
    
    async function convertCsvToJson() {
        const readStream = fs.createReadStream(pathToCsvFile);
        const writeStream = fs.createWriteStream(pathToTxtFile);
        await readStream.pipe(csv()).pipe(transformKeysToLowerCase).pipe(writeStream);
    }

    convertCsvToJson().catch(err => console.error(err));
})();
