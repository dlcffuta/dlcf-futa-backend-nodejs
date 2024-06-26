# DLCF FUTA chapter BACKEND DEVELOPMENT - repo

- Description: A backend development for DLCF FUTA administration mangement application.

### To view the api documentation

- You might need a postman deskop application installed and a good network connection to run it. Click 👉 [api documentation]()

#### Basic Database design

- Database used: NoSQL (Mongodb)

## Usage

- Clone repository using command `git clone https://github.com/dlcffuta/dlcf-futa-backend-nodejs.git`
- Change folder into the cloned folder using the command `cd dlcf-futa-backend-nodejs`
- Install project dependencies using the command `yarn install` or `npm install`
- Run `yarn run dev` or `npm run dev` to start the development server

## How To Contribute

- Create a new branch with `git checkout -b [branch-name]`. Your branch name should describe the feature you are implementing

```bash
git checkout -b login-with-email
```

- After making changes, run `git add .` to stage all of them or `git add [filename]` to add only specific files.
- Commit your changes by running `git commit` providing a descriptive commit message. e.g

```bash
git commit -m "added login with email"
```

- Push update to remote branch with `git push origin [your-branch-name]`. e.g

```bash
git push origin login-with-email
```

## How to add new ENV variable

This env validation is done to reduce missing out adding all needed env variable.

- Add the new env variable name to the env config type file inside the `./src/types/ProcessEnv.ts`
- State the type and validation of the env variable name inside the `./src/config/index.ts`
- Add the variable name and the value inside the `.env`
- Export and link the value from the `./src/config/`
- `./.env.sample` gives a sample of what the env file contains.

To use the value of the env variable in any where in the code,import the config from the `./src/config/` file e.g.

```
import { NODE_ENV, PORT } from "./config";

```

## How to add new endpoint

- Create a controller file with the name of the route e.g `./src/controllers/result.controller.ts`. Define all functions for the controller in here.
- Create a router file inside the routes, with the name route. e.g `./src/routes/results`
- Import the controller function inside the router file `./src/routes/results`
- Import the router file into the `./src/routes/index.ts`, under the import routers comment
- Already the router had been import into the `./src/index.ts`, under the Routes comments

```
import router from "./routes";
```

```
app.use("/", routes);
```

## How to add a new test file for test coverage

- Navigate to the `./test` folder, create a new file for the specific service or route you want to test. Name the file based on the function's service or route, for example, `./test/result.test`.
- Import the necessary packages for the unit testing. Using the popular like Mocha.

```
// For example:

import chai from "chai";
const expect = chai.expect;
```

- Import all functions regarding the service or route.

```
// For example:

import {  functionToTest } from "../src/services/result.services";
```

- Run `yarn run test` or `npm run test` to run all tests. And to run a single file, modify using `mocha --require ts-node/register ./test/testFile1.ts --timeout 20000 --exit` to the test script in the package.json.
- Ensure you replace `testFile1.ts` with the actual name of the file

## Others

- To connect to the data models, create a file inside the `./src/services` folder with the name of the router e.g `./src/services/result.services`
- Create the data model inside the `./src/models`
- Create the interface inside the `./src/interface`
- Run `yarn run commit` or `npm run commit` (a shorthand for git commit using Commitizen), to read the configuration from `./.czrc` and provides a guided interface to create a commit message.
