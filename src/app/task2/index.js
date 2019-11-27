const path = require('path');
const csv = require('csvtojson');
const fs = require('fs');
const rootPath = path.resolve();
const transformKeysToLowerCase = require(`${path.resolve()}/src/app/utils/lowercase-csv-keys.js`);

const pathToCsvFile = rootPath + '/src/assets/node_mentoring_t1_2_input_example.csv';
const pathToTxtFile = rootPath + '/src/assets/output.txt';

async function main() {
    const readStream = fs.createReadStream(pathToCsvFile);
    const writeStream = fs.createWriteStream(pathToTxtFile);
    await readStream.pipe(csv()).pipe(transformKeysToLowerCase).pipe(writeStream);
}

main().catch(err => console.error(err));