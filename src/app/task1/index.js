import readline from "readline";

const { stdin, stdout } = process;
const readlineInterface = readline.createInterface({ input: stdin, terminal: false });

readlineInterface.on('line', (line = '') => {
    const reversedLine = [ ...line ].reverse().join('');

    stdout.write(`${reversedLine}\n`);
});
