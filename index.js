// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const {log} = require('console');
const answerArray = [];
let readMe;
log('README MAKER');
log('------------');

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
        'Apache-2.0',
        'BSD-3-Clause',
        'CC-BY-4.0',
        'MIT',
        'MPL 2.0',
        'Unlicense',
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


const badgeUrls = [
    '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
    '[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)',
    '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)',
    '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)',
]


const generateREADMEText = (data) => {
    //capture the right values to insert into README Text
    for (const [field, answer] of Object.entries(data)) {
        log(answer);
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
    let badgeUrl = '';
    let choices = [...questions[4].choices]
    //set license badge url

    for (let i = 0; i < choices.length; i++) {

        if (choices[i] == license) {
            log("found badge!");
            badgeUrl = badgeUrls[i];
        }
    }


    readMe =
        `# ${projectTitle}      ${badgeUrl}\n

## Description
${description}\n

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)


## Installation
${installationInstructions}\n

## Usage
${usageInformation}\n

## License

NOTICE THIS REPOSITORY IS USING THE ${license} LICENSE\n

## Contributing

${contributing}\n

## Tests

${tests}\n

## Questions

GitHub Username: ${githubUsername}\n

Email: ${email}\n

Additional Contact Information: ${contactInfo}\n
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
        log(response);
        const generatedReadMe = generateREADMEText(response);


        //first check if folder for new README is created
        try {
            //if the folder does not exist, create it
            if (!fs.existsSync('./created_content')) {
                fs.mkdirSync('./created_content');
            }


            if (!fs.existsSync('./created_content/README.md')) {
                //Read me does not exist yet, write new file in the new folder
                fs.writeFile('./created_content/README.md', generatedReadMe, (errorMessage) => {
                    errorMessage ? log(errorMessage) : log("Successully created README.md");
                });
            }
            else {
                //file already exists, need to overwrite.
                fs.writeFileSync('./created_content/README.md', generatedReadMe, {
                    flag: 'w',
                })

            }
        }
        catch (err) {
            console.error(err);
        }



    })



}

// Function call to initialize app
init();