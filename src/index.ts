import shell from 'shelljs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

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
  console.log(chalk.green("Welcome to Starting Frontend CLI!"));

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
      validate: function(input: string) {
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

  const spinner = ora(`Creating ${framework} project: ${projectName}`).start();

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
  } catch (error: any) {
    spinner.fail(`Failed to create project: ${error.message}`);
  }
}

async function createReactProject(projectName: string, packageManager: string) {
  await executeShellCommand(`npx create-react-app ${projectName}`, packageManager);
}

async function createAngularProject(projectName: string, packageManager: string) {
  await executeShellCommand(`npx @angular/cli new ${projectName}`, packageManager);
}

async function createVueProject(projectName: string, packageManager: string) {
  await executeShellCommand(`npx @vue/cli create ${projectName}`, packageManager);
}

async function createSvelteProject(projectName: string, packageManager: string) {
  await executeShellCommand(`npx degit sveltejs/template ${projectName}`, packageManager);
}

async function createNextProject(projectName: string, packageManager: string) {
  await executeShellCommand(`npx create-next-app ${projectName}`, packageManager);
}

async function createNuxtProject(projectName: string, packageManager: string) {
  await executeShellCommand(`npx create-nuxt-app ${projectName}`, packageManager);
}

async function createLegacyProject(projectName: string, packageManager: string) {
  shell.exec(`mkdir ${projectName} && cd ${projectName}`);
  shell.exec(`${packageManager} init -y`);
  console.log(chalk.red(`Legacy project ${projectName} initialized!`));
}

async function initializeGitRepo(projectName: string) {
  console.log(chalk.blue('Initializing Git repository...'));
  shell.cd(projectName);
  shell.exec('git init');
  shell.exec('git add .');
  shell.exec('git commit -m "Initial commit"');
  console.log(chalk.green('Git repository initialized!'));
}

async function setupCiCd(projectName: string, ciCdOptions: string[]) {
  console.log(chalk.blue('Setting up CI/CD configurations...'));
  shell.cd(projectName);

  ciCdOptions.forEach(option => {
    switch (option) {
      case 'github':
        shell.exec('npx create-github-actions');
        break;
      case 'travis':
        shell.exec('touch .travis.yml');
        break;
      case 'circleci':
        shell.exec('mkdir .circleci && touch .circleci/config.yml');
        break;
      default:
        console.log(chalk.red('Unknown CI/CD option.'));
    }
  });

  console.log(chalk.green('CI/CD configurations added!'));
}

async function executeShellCommand(command: string, packageManager: string) {
  return new Promise<void>((resolve, reject) => {
    shell.exec(command, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(new Error(`Command failed with error: ${stderr}`));
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

run();