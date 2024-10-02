"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const frameworks = ['React', 'Angular', 'Vue', 'Legacy'];
async function run() {
    console.log(chalk_1.default.green("Welcome to Starting Frontend CLI!"));
    // Pergunta qual framework deseja utilizar
    const answers = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'framework',
            message: 'Choose a frontend framework:',
            choices: frameworks,
        },
        {
            type: 'input',
            name: 'projectName',
            message: 'What is the name of your project?',
        }
    ]);
    const { framework, projectName } = answers;
    switch (framework) {
        case 'React':
            createReactProject(projectName);
            break;
        case 'Angular':
            createAngularProject(projectName);
            break;
        case 'Vue':
            createVueProject(projectName);
            break;
        case 'Legacy':
            createLegacyProject(projectName);
            break;
        default:
            console.log(chalk_1.default.red('Framework not supported.'));
            break;
    }
}
function createReactProject(projectName) {
    console.log(chalk_1.default.blue(`Creating React project: ${projectName}`));
    shelljs_1.default.exec(`npx create-react-app ${projectName}`);
}
function createAngularProject(projectName) {
    console.log(chalk_1.default.yellow(`Creating Angular project: ${projectName}`));
    shelljs_1.default.exec(`npx @angular/cli new ${projectName}`);
}
function createVueProject(projectName) {
    console.log(chalk_1.default.green(`Creating Vue project: ${projectName}`));
    shelljs_1.default.exec(`npx @vue/cli create ${projectName}`);
}
function createLegacyProject(projectName) {
    console.log(chalk_1.default.red(`Creating Legacy project: ${projectName}`));
    shelljs_1.default.exec(`mkdir ${projectName} && cd ${projectName}`);
    shelljs_1.default.exec(`npm init -y`);
    console.log(chalk_1.default.red(`Legacy project ${projectName} initialized!`));
}
run();
