# RLBot Stuff

## Development Environment

### General Info

You need three repositories, this is only one of them.
1. scratch-gui (this one)
2. scratch-vm
3. scratch-blocks

You need to build scratch-blocks first, then scratch-vm, then scratch-gui. They all have different commands for building.
Visit their README files for more information.

### Setup for this package

1. Be on Linux
1. Make sure you've cloned scratch-vm and scratch-blocks into the same parent directory as scratch-gui.
1. Install node.js
   - If you already have it, update to the latest version or you'll get bad problems like I did.
   - Also update npm: `npm install -g npm`
1. Run `npm install -g npm-install-peers`
1. Make sure you're running Python 2.7
1. Run `npm install` from this directory.

### Running scratch

1. Execute `npm start`.
2. Open a browser and navigate to http://localhost:8601/

Sometimes when you change source files, the page will reload and update automatically. Sometimes it will reload but not actually be updated,
and in that case you should Ctrl+C and run `npm start` again.

If you change anything in scratch-gui or scratch-vm, you need to rebuild those packages according to the instructions in their readme files,
then run `npm start` again.

# scratch-gui
#### Scratch GUI is a set of React components that comprise the interface for creating and running Scratch 3.0 projects

[![Build Status](https://travis-ci.com/LLK/scratch-gui.svg?token=Yfq2ryN1BwaxDME69Lnc&branch=master)](https://travis-ci.com/LLK/scratch-gui)
[![Greenkeeper badge](https://badges.greenkeeper.io/LLK/scratch-gui.svg)](https://greenkeeper.io/)

## Installation
This requires you to have Git and Node.js installed.

In your own node environment/application:
```bash
npm install https://github.com/LLK/scratch-gui.git
```
If you want to edit/play yourself:
```bash
git clone git@github.com:LLK/scratch-gui.git
cd scratch-gui
npm install
```

## Getting started
Running the project requires Node.js to be installed.

## Running
Open a Command Prompt or Terminal in the repository and run:
```bash
npm start
```
Then go to [http://localhost:8601/](http://localhost:8601/) - the playground outputs the default GUI component

## Testing
NOTE: If you're a windows user, please run these scripts in Windows `cmd.exe`  instead of Git Bash/MINGW64.

Run linter, unit tests, build, and integration tests.
```bash
npm test
```

Run unit tests in isolation.
```bash
npm run unit-test
```

Run unit tests in watch mode (watches for code changes and continuously runs tests). See [jest cli docs](https://facebook.github.io/jest/docs/en/cli.html#content) for more options.
```bash
npm run unit-test -- --watch
```

Run integration tests in isolation.
```bash
npm run integration-test
```

You may want to review the documentation for [Jest](https://facebook.github.io/jest/docs/en/api.html) and [Enzyme](http://airbnb.io/enzyme/docs/api/) as you write your tests.

## Publishing to GitHub Pages

You can publish the GUI to github.io so that others on the Internet can view it.
[Read the wiki for a step-by-step guide.](https://github.com/LLK/scratch-gui/wiki/Publishing-to-GitHub-Pages)

## Donate
We provide [Scratch](https://scratch.mit.edu) free of charge, and want to keep it that way! Please consider making a [donation](https://secure.donationpay.org/scratchfoundation/) to support our continued engineering, design, community, and resource development efforts. Donations of any size are appreciated. Thank you!
