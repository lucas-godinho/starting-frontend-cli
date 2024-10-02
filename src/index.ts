import shell from 'shelljs';
import inquirer from 'inquirer';
import chalk from 'chalk';

const frameworks = ['React', 'Angular', 'Vue', 'Legacy'];

async function run() {
  console.log(chalk.green("Welcome to Starting Frontend CLI!"));

  // Pergunta qual framework deseja utilizar
  const answers = await inquirer.prompt([
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
      console.log(chalk.red('Framework not supported.'));
      break;
  }
}

function createReactProject(projectName: string) {
  console.log(chalk.blue(`Creating React project: ${projectName}`));
  shell.exec(`npx create-react-app ${projectName}`);
}

function createAngularProject(projectName: string) {
  console.log(chalk.yellow(`Creating Angular project: ${projectName}`));
  shell.exec(`npx @angular/cli new ${projectName}`);
}

function createVueProject(projectName: string) {
  console.log(chalk.green(`Creating Vue project: ${projectName}`));
  shell.exec(`npx @vue/cli create ${projectName}`);
}

function createLegacyProject(projectName: string) {
  console.log(chalk.red(`Creating Legacy project: ${projectName}`));
  shell.exec(`mkdir ${projectName} && cd ${projectName}`);
  shell.exec(`npm init -y`);
  console.log(chalk.red(`Legacy project ${projectName} initialized!`));
}

run();