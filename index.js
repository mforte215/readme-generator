// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const answerArray = [];
console.log('README MAKER');
console.log('------------');
// TODO: Create an array of questions for user input
const questions = [{
    type: 'input',
    message: 'Project Title:',
    name: 'projectTitle'
},
{
    type: 'input',
    message: 'Description:',
    name: 'description'
},
{
    type: 'input',
    message: 'Installation Instructions:',
    name: 'installationInstructions'
},
{
    type: 'input',
    message: 'Usage Information:',
    name: 'usageInformation'
},
{
    type: 'list',
    message: 'License:',
    name: 'license',
    choices: [
        'AFL-3.0',
        'Apache-2.0',
        'BSD-3-Clause-Clear',
        'BSD-4-Clause',
        'CC-BY-4.0',
        'CC-BY-SA-4.0',
        'WTFPL',
        'ECL-2.0',
        'EPL-1.0',
        'EPL-2.0',
        'EUPL-1.1',
        'AGPL-3.0',
        'GPL-3.0',
        'LGPL-3.0',
        'ISC',
        'LPPL-1.3c',
        'MS-PL',
        'MIT',
        'MPL-2.0',
        'OSL-3.0',
        'PostgreSQL',
        'OFL-1.1',
        'NCSA',
        'Unlicense',
        'Zlib',
    ]
},
{
    type: 'input',
    message: 'Contributing:',
    name: 'contributing'
},
{
    type: 'input',
    message: 'Tests:',
    name: 'tests'
},
{
    type: 'input',
    message: 'GitHub Username:',
    name: 'githubUsername'
},
{
    type: 'input',
    message: 'Email:',
    name: 'email'
},
{
    type: 'input',
    message: 'Additional Contact Info:',
    name: 'contactInfo'
},
];


const generateREADMEText = (data) => {
    //capture the right values to insert into README Text
    for (const [field, answer] of Object.entries(data)) {
        console.log(answer);
        answerArray.push(answer);
    }
    let projectTitle = answerArray[0];
    let description = answerArray[1];
    let installationInstructions = answerArray[2];
    let usageInformation = answerArray[3];
    let license = answerArray[4];
    let contributing = answerArray[5];
    let tests = answerArray[6];
    let githubUsername = answerArray[7];
    let email = answerArray[8];
    let contactInfo = answerArray[9];

    const readMe = `# ${projectTitle} 

    ## Description

    ${description}
    
    ## Table of Contents
    
    - [Installation](#installation)
    - [Usage](#usage)
    - [Credits](#credits)
    - [License](#license)
    - [Contributing](#contributing)
    - [Tests](#tests)
    - [Questions](#questions)

    
    ## Installation
    
    ${installationInstructions}
    
    ## Usage
    
    ${usageInformation}

    ## License

    ${license}
    
    ## Contributing
    
    ${contributing}
    
    ## Tests

    ${tests}
    
    Please refer to the LICENSE in the repo
    
    ## Questions

    GitHub Username: ${githubUsername}

    Email: ${email}

    Additional Contact Information: ${contactInfo}
    `

    return readMe;
}


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeToFile(fileName, data);

}

// TODO: Create a function to initialize app
function init() {
    //start it up
    inquirer.prompt(questions).then((response) => {
        console.log(response);
        const generatedReadMe = generateREADMEText(response);

        fs.writeFile('README.md', generatedReadMe, (errorMessage) => {
            errorMessage ? console.log(errorMessage) : console.log("Successully created README.md");
        });

    })



}

// Function call to initialize app
init();