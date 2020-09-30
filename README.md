## How to run:
### preconditions:
- node installed (ideally using a node version manager). A good guide can be found [here](https://itnext.io/nvm-the-easiest-way-to-switch-node-js-environments-on-your-machine-in-a-flash-17babb7d5f1b)
- testcafe installed `npm install testcafe`
### setup:
- in terminal `cd /to/localfolder/` where `ruum-ta` folder will be created
- `git pull https://github.com/qatodev/ruum-ta.git`
- `npm install`
- `npm run test:chrome` || `npm run test:chrome:headless`
- test credentials used in tests are available in tasks.js file

### Assumptions:

#### A general comment on Selectors. 
Would be great to have accessibility identifiers for all elements (where it makes sense). They would improve app accessibility as well as testability.

#### The scenario that was requested 
(with small additions) is located in `tests/Tasks/tasks-smoke.test.js`
This scenario is very basic and didn't allow me to go deeper into creating the automation framework.

#### Enhanced framework
Therefore, I created another scenario here `tests/Tasks/tasks-regression.test.js` it is an e2e scenarios that takes advantage of functions and methods that I additionally created for more flexibility and reusability.
- All elements are described in Pages.
- All functions and methods are located in components
- Big chunks of features are in separate folders e.g Tasks tests and components. The reason is that the functions and tests can be separated in multiple files for easier framework maintenance and more optimal tests organization.

With the methods currently implemented a QA could add multiple tests to have a better coverage of:
login,
tasks creation with unique names,
statuses update,
search,
and deletion.

Additional methods for batch actions can also be easily implemented on top of existing methods - e.g for creating, updating, deleting multiple tasks based on various criteria for automated test data creation/preparation purpose.

#### Not implemented:
- tasks rename and other fields update like assignment etc.
- subtasks, collaboration and chats
- additional filter criteria
- other tabs like *Ruums* and *Approvals*
- logout
- test sets
- reporting