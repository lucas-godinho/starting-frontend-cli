"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const frameworks = [
    { name: 'React', value: 'react' },
    { name: 'Angular', value: 'angular' },
    { name: 'Vue', value: 'vue' },
    { name: 'Svelte', value: 'svelte' },
    { name: 'Next.js', value: 'next' },
    { name: 'Nuxt.js', value: 'nuxt' },
    { name: 'Legacy', value: 'legacy' }
];
const packageManagers = ['npm', 'yarn', 'pnpm'];
async function run() {
    console.log(chalk_1.default.green("Welcome to Starting Frontend CLI!"));
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
            validate: function (input) {
                if (!input || input.trim() === '') {
                    return 'Project name is required.';
                }
                return true;
            },
        },
        {
            type: 'list',
            name: 'packageManager',
            message: 'Choose a package manager:',
            choices: packageManagers,
        },
        {
            type: 'confirm',
            name: 'git',
            message: 'Initialize a Git repository?',
        },
        {
            type: 'checkbox',
            name: 'ciCd',
            message: 'Choose CI/CD configuration:',
            choices: [
                { name: 'GitHub Actions', value: 'github' },
                { name: 'Travis CI', value: 'travis' },
                { name: 'CircleCI', value: 'circleci' }
            ],
        }
    ]);
    const { framework, projectName, packageManager, git, ciCd } = answers;
    const spinner = (0, ora_1.default)(`Creating ${framework} project: ${projectName}`).start();
    try {
        switch (framework) {
            case 'react':
                await createReactProject(projectName, packageManager);
                break;
            case 'angular':
                await createAngularProject(projectName, packageManager);
                break;
            case 'vue':
                await createVueProject(projectName, packageManager);
                break;
            case 'svelte':
                await createSvelteProject(projectName, packageManager);
                break;
            case 'next':
                await createNextProject(projectName, packageManager);
                break;
            case 'nuxt':
                await createNuxtProject(projectName, packageManager);
                break;
            case 'legacy':
                await createLegacyProject(projectName, packageManager);
                break;
            default:
                throw new Error('Framework not supported.');
        }
        if (git) {
            await initializeGitRepo(projectName);
        }
        if (ciCd.length) {
            await setupCiCd(projectName, ciCd);
        }
        spinner.succeed(`Project ${projectName} created successfully!`);
    }
    catch (error) {
        spinner.fail(`Failed to create project: ${error.message}`);
    }
}
async function createReactProject(projectName, packageManager) {
    await executeShellCommand(`npx create-react-app ${projectName}`, packageManager);
}
async function createAngularProject(projectName, packageManager) {
    await executeShellCommand(`npx @angular/cli new ${projectName}`, packageManager);
}
async function createVueProject(projectName, packageManager) {
    await executeShellCommand(`npx @vue/cli create ${projectName}`, packageManager);
}
async function createSvelteProject(projectName, packageManager) {
    await executeShellCommand(`npx degit sveltejs/template ${projectName}`, packageManager);
}
async function createNextProject(projectName, packageManager) {
    await executeShellCommand(`npx create-next-app ${projectName}`, packageManager);
}
async function createNuxtProject(projectName, packageManager) {
    await executeShellCommand(`npx create-nuxt-app ${projectName}`, packageManager);
}
async function createLegacyProject(projectName, packageManager) {
    shelljs_1.default.exec(`mkdir ${projectName} && cd ${projectName}`);
    shelljs_1.default.exec(`${packageManager} init -y`);
    console.log(chalk_1.default.red(`Legacy project ${projectName} initialized!`));
}
async function initializeGitRepo(projectName) {
    console.log(chalk_1.default.blue('Initializing Git repository...'));
    shelljs_1.default.cd(projectName);
    shelljs_1.default.exec('git init');
    shelljs_1.default.exec('git add .');
    shelljs_1.default.exec('git commit -m "Initial commit"');
    console.log(chalk_1.default.green('Git repository initialized!'));
}
async function setupCiCd(projectName, ciCdOptions) {
    console.log(chalk_1.default.blue('Setting up CI/CD configurations...'));
    shelljs_1.default.cd(projectName);
    ciCdOptions.forEach(option => {
        switch (option) {
            case 'github':
                shelljs_1.default.exec('npx create-github-actions');
                break;
            case 'travis':
                shelljs_1.default.exec('touch .travis.yml');
                break;
            case 'circleci':
                shelljs_1.default.exec('mkdir .circleci && touch .circleci/config.yml');
                break;
            default:
                console.log(chalk_1.default.red('Unknown CI/CD option.'));
        }
    });
    console.log(chalk_1.default.green('CI/CD configurations added!'));
}
async function executeShellCommand(command, packageManager) {
    return new Promise((resolve, reject) => {
        shelljs_1.default.exec(command, (code, stdout, stderr) => {
            if (code !== 0) {
                reject(new Error(`Command failed with error: ${stderr}`));
            }
            else {
                console.log(stdout);
                resolve();
            }
        });
    });
}
run();
