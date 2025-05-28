# cicd-github-react

CI/CD using Github Actions to deploy barebone react web application to various 
cloud hosting environments including:
- Netlify
- Firebase

## Prerequisite

- [Node.js & NPM](https://heynode.com/tutorial/install-nodejs-locally-nvm/) 


## Develop

- To use the latest version of `create-react-app`, uninstall the package first
  in case it was previously installed globally: 
```
$ npm uninstall -g create-react-app
```

- Run locally
```
$ npm init react-app cicd-github-react
$ cd cicd-github-react
$ npm start
```

- Then open http://localhost:3000/ to see your app

## Test

### Serve with a Static server

- See more info: https://cra.link/deployment

- Generate the build folder
```
$ npm run build
```

- Install static server
```
$ npm install -g serve
$ serve -s build
```

## Deploy

The deployment will be done using Github Actions CI/CD pipeline (aka workflow).
The general instructions for creating thee Github Actions workflow:

- Perform the following from the browser on the Github repo

- Go to the Github project repository, go to actions and setup the Node.js 
  workflow, which will generate a `yaml` file. The file is stored in the 
  `.github/workflow` folder. We will have one file for each workflow
  corresponding to the cloud hosting platforms.
  
- Revise the workflow `yaml` file to configure the cloud hosting specifics,
  such as: AUTH token, Site ID, etc. 

- Go to the Github project repository, then go to the main tab "Settings", and 
  left navigation tab "Security > Secrets > Actions"; add the cloud hosting 
  specific configurations, referenced in the `yaml` file, to the Github Actions
  secret file.

- When new changes are pushed to the repo, the workflow will be triggered;
  it also depends on the branch setup in the `yaml` file, for example, 
  the following setup will trigger on changes in the `main` branch:
```
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
```

- The workflow will show success or error from each run; click on the specific
  run to get detailed logs.
  
- The workflow can be manually stopped from the "Actions > Workflows", and
  select the workflow to stop, and stop it

### Netlify

Source: [Deploy a React app to netlify using GitHub Actions](https://dev.to/ktscates/deploy-a-react-app-to-netlify-using-github-actions-3akd)

- Prerequisite: create a Netlify account

- Create a `netlify.toml` file locally in the project directory and add `build`
  configurations as shown in the `netlify.toml` file
  
- Generate the build folder which will be use in netlify
```
$ npm run build
```

- Push the changes to the Github repository

- From the browser, go to the Github project repository, go to actions and 
  setup the deployment workflow, which will generate a `yml` file. For Netlify
  deployment workflow, the filename is `node.js.yml`
  
- Revise the workflow `yaml` file by adding the following:
```
    - name: Netlify Deploy
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
      run: netlify deploy --prod
```  

- From the browser, login to your netlify account and create a new site by 
  drag/drop the build folder generated earlier;
  - a new site will be created; for example [clinquant-bunny-22f52d](https://clinquant-bunny-22f52d.netlify.app)
  - [Optional] setup a custom domain & secure the site with HTTPs
  - The "Site settings" page can be used to configure further; see below;

- Generate a "personal access token" from the "User settings" screen;
  "Applications > OAuth" tab; "Personal access tokens" panel;
  click "new access token"

- Get the "Site ID" from the "Site settings" page of the newly created site above;
  - From the top left near the logo, click the "Company name"
  - Next click the site name then "Site settings"
  - Go to the "General > Site details" tab
  - Copy the "Site ID"

- From the browser, go back to the Github project repository, then go to the 
  main tab "Settings", and left navigation tab "Security > Secrets > Actions";
  - add "Repository secrets" for the netlify Auth Token, and Site ID as follow:
```
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID
```

- To trigger the Github actions, "git push" the new changes.
  NOTE: the remote repository was modified when a new workflow file was created.
  Therefore, need to `git pull` to synch the local with the remote.
```
$ cd ~/projects/cicd-github-react
$ git pull
$ git push
```

### Google Firebase

- Source:
  - [How to deploy a React app to Firebase using GitHub Actions step-by-step](https://levelup.gitconnected.com/how-to-deploy-a-react-app-to-firebase-using-github-actions-step-by-step-11367e0627d5)
  - [How to Deploy React App on Firebase Hosting? CI/CD with GitHub Actions | Preview | Custom Domain](https://www.youtube.com/watch?v=Bnd4IO3f2hU)
  - [Deploy React Application to Firebase using GitHub Actions](https://eng.zemosolabs.com/deploy-react-application-to-firebase-using-github-actions-2c7514fba386)


- Prerequisite: create a Google Firebase account

- From the browser, create a firebase project; in the Firebase console, click Add project.
  Follow the instructions on the screen.
  
- From command line, install the Firebase CLI
```
$ npm install -g firebase-tools
```

- From the command line, login to Firebase as shwon below.
  The browser popup for authentication
```
$ firebase login
``` 

- After successful login, 
```
Waiting for authentication...

✔  Success! Logged in as ***@gmail.com
```

- Check whether we can access the firebase API
```
$ firebase projects:list
✔ Preparing the list of your Firebase projects
┌──────────────────────┬───────────────────┬────────────────┬──────────────────────┐
│ Project Display Name │ Project ID        │ Project Number │ Resource Location ID │
├──────────────────────┼───────────────────┼────────────────┼──────────────────────┤
│ cicd-github-react    │ cicd-github-react │ 1073305028143  │ [Not specified]      │
└──────────────────────┴───────────────────┴────────────────┴──────────────────────┘

1 project(s) total.
```

- Make sure we have the `build` folder to deploy; generate the build folder: 
```
$ npm run build
```

- Initial the project; NOTE: 
  - use `build` instead of the default `public` folder;
  - skip Github for now by selecting default
  - when ask to Overwrite? `build\index.html`, enter n 
```
$ cd ~/projects/cicd-github-react
$ firebase init hosting

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  /home/gabe/projects/cicd-github-react


=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

? Please select an option: Use an existing project
? Select a default Firebase project for this directory: cicd-github-react (cicd-github-react)
i  Using project cicd-github-react (cicd-github-react)

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No
? File build/index.html already exists. Overwrite? No
i  Skipping write of build/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!
```

- Deploy
```
$ cd ~/projects/cicd-github-react
$ firebase deploy --only hosting

=== Deploying to 'cicd-github-react'...

i  deploying hosting
i  hosting[cicd-github-react]: beginning deploy...
i  hosting[cicd-github-react]: found 15 files in build
✔  hosting[cicd-github-react]: file upload complete
i  hosting[cicd-github-react]: finalizing version...
✔  hosting[cicd-github-react]: version finalized
i  hosting[cicd-github-react]: releasing new version...
✔  hosting[cicd-github-react]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/cicd-github-react/overview
Hosting URL: https://cicd-github-react.web.app
```

- NEXT, setup Github Actions workflow to deploy to Firebase. We need to get
  the Firebase CI Token. NOTE: save the token because it is generated once
  and can't be retrieved again!!  
```
$ firebase login:ci

Visit this URL on this device to log in:
https://accounts.google.com/o/oauth2/auth?[...]

Waiting for authentication...

✔  Success! Use this token to login on a CI server:

1//[...]

Example: firebase deploy --token "$FIREBASE_TOKEN"
```

- From the browser, go to the Github project repository, go to actions and 
  setup the workflow, which will generate a `yml` file. For Firebase
  deployment workflow, the filename is `firebase.yml`.

- Revise the workflow `firebase.yml` file by adding the following:
```
 - name: Deploy to Firebase
      uses: w9jds/firebase-action@v1.5.0
      with:
        args: deploy --only hosting
      env:
        FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

- From the browser, go back to the Github project repository, then go to the 
  main tab "Settings", and left navigation tab "Security > Secrets > Actions";
  - add "Repository secrets" as follow:
```
FIREBASE_TOKEN
```

- To trigger the Github actions, "git push" the new changes.
  NOTE: the remote repository was modified when a new workflow file was created.
  Therefore, need to `git pull` to synch the local with the remote.
```
$ cd ~/projects/cicd-github-react
$ git pull
$ git push
```

- NOTE: unlike the Netlify deployment, the Firebase deployment using the
  `w9jds/firebase-action` is actually running inside the docker container.
  The earlier version `firebase-action@v1.5.0` has an issue as shown below; 
  which is resolved in the `firebase-action@v2.2.2`.
```  
Firebase CLI v11.4.0 is incompatible with Node.js v12.18.1 Please upgrade Node.js to version ^14.18.0 || >=16.4.0
```

## References

- [Create React App > Getting Started](https://create-react-app.dev/docs/getting-started)


## [ORIGINAL README] Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
