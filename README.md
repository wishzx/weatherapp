#DEMO

https://weatherapp-5d0b9.web.app/

#TODO
- Daily notifications of weather in current location.
- Testing:
   End-to-end.
- Containerization.


# Node and npm Installation Guide

This guide will walk you through the installation process for Node.js and npm, as well as how to install project dependencies and start the development server using `npm`.

## Table of Contents
- [Node.js Installation](#nodejs-installation)
- [npm Installation](#npm-installation)
- [Installing Project Dependencies](#installing-project-dependencies)
- [Starting the Development Server](#starting-the-development-server)

## Node.js Installation
1. Visit the official Node.js website: [https://nodejs.org](https://nodejs.org)
2. Download the appropriate installer for your operating system.
3. Run the installer and follow the on-screen instructions.
4. Once the installation is complete, open a terminal or command prompt and type the following command to verify the installation:
   ```shell
   node --version
   ```
   This should print the installed Node.js version.

## npm Installation
npm is installed automatically along with Node.js. To verify the installation, open a terminal or command prompt and run the following command:
```shell
npm --version
```
This should print the installed npm version.

## Installing Project Dependencies
1. Navigate to the project's root directory in a terminal or command prompt.
2. Run the following command to install the project dependencies listed in the `package.json` file:
   ```shell
   npm install
   ```
   This command will download and install all the necessary dependencies defined in the `package.json` file.

## Starting the Development Server
To start the development server, execute the following command in the project's root directory:
```shell
npm run dev
```
This command will run the `dev` script defined in the `package.json` file. The `dev` script is typically responsible for starting the development server or running other tasks specific to your project.

Once the development server is successfully started, you should see the appropriate output or logs indicating that the server is running. You can then access your application by navigating to the provided URL or localhost address in your web browser.

## Starting ladle (storybook)

This is just a tool i use to develop components in isolations

```shell
npx ladle serve
```
