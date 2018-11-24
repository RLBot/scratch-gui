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
1. Run `npm-install-peers`. If you have trouble with this, try deleting package-lock.json.
1. Make sure you're running Python 2.7
1. Run `npm install` from this directory.

### Running scratch

1. Execute `npm start`.
2. Open a browser and navigate to http://localhost:8601/

Sometimes when you change source files, the page will reload and update automatically. Sometimes it will reload but not actually be updated,
and in that case you should Ctrl+C and run `npm start` again.

If you change anything in scratch-gui or scratch-vm, you need to rebuild those packages according to the instructions in their readme files,
then run `npm start` again.

### Uploading to the website

I (tarehart) am hosting a static website at rlbot.org. You can deploy this
scratch app to it by running `npm run s3deploy`.

In order for it to work, you will need to have some aws access keys configured on your system:
https://docs.aws.amazon.com/cli/latest/topic/config-vars.html

Contact me for help obtaining access.

### Troubleshooting

Sometimes after merging or otherwise messing around, the build will break. 

Example: 
```
npm ERR! enoent ENOENT: no such file or directory, rename '/mnt/c/Users/Tyler/Code/scratch-gui/node_modules/.staging/scratch-vm-69531e78/node_modules/@sindresorhus/is' -> '/mnt/c/Users/Tyler/Code/scratch-gui/node_modules/.staging/@sindresorhus/is-23aa70f5'
```

Try doing `sudo npm uninstall` and `git clean -xdf` and `rm package-lock.json` and `npm install` on all the packages, in this order:
1. scratch-blocks
2. scratch-vm
3. scratch-gui

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

## Developing alongside other Scratch repositories

### Linking this code to another project's `node_modules/scratch-gui`

#### Configuration

If you wish to develop scratch-gui alongside other scratch repositories that depend on it, you may wish
to have the other repositories use your local scratch-gui build instead of fetching the current production
version of the scratch-gui that is found by default using `npm install`.

To do this:
1. Make sure you have run `npm install` from this (scratch-gui) repository's top level
2. Make sure you have run `npm install` from the top level of each repository (such as scratch-www) that depends on scratch-gui
3. From this (scratch-gui) repository's top level, build the `dist` directory by running `BUILD_MODE=dist npm run build`
4. From this (scratch-gui) repository's top level, establish a link to this repository by running `npm link`
5. From the top level of each repository that depends on scratch-gui, run `npm link scratch-gui`
6. Build or run the repositories that depend on scratch-gui

Instead of `BUILD_MODE=dist npm run build` you can also use `BUILD_MODE=dist npm run watch`, however this may be unreliable.

#### Oh no! It didn't work!
* Follow the recipe above step by step and don't change the order. It is especially important to run npm first because installing after the linking will reset the linking.
* Make sure the repositories are siblings on your machine's file tree.
* If you have multiple Terminal tabs or windows open for the different Scratch repositories, make sure to use the same node version in all of them.
* In the worst case unlink the repositories by running `npm unlink` in both, and start over.

## Testing
### Documentation

You may want to review the documentation for [Jest](https://facebook.github.io/jest/docs/en/api.html) and [Enzyme](http://airbnb.io/enzyme/docs/api/) as you write your tests.

See [jest cli docs](https://facebook.github.io/jest/docs/en/cli.html#content) for more options.

### Running tests

*NOTE: If you're a windows user, please run these scripts in Windows `cmd.exe`  instead of Git Bash/MINGW64.*

Before running any test, make sure you have run `npm install` from this (scratch-gui) repository's top level.

#### Main testing command

To run linter, unit tests, build, and integration tests, all at once:
```bash
npm test
```

#### Running unit tests

To run unit tests in isolation:
```bash
npm run test:unit
```

To run unit tests in watch mode (watches for code changes and continuously runs tests):
```bash
npm run test:unit -- --watch
```

You can run a single file of integration tests (in this example, the `button` tests):

```bash
$(npm bin)/jest --runInBand test/unit/components/button.test.jsx
```

#### Running integration tests

Integration tests use a headless browser to manipulate the actual html and javascript that the repo
produces. You will not see this activity (though you can hear it when sounds are played!).

Note that integration tests require you to first create a build that can be loaded in a browser:

```bash
npm run build
```

Then, you can run all integration tests:

```bash
npm run test:integration
```

Or, you can run a single file of integration tests (in this example, the `backpack` tests):

```bash
$(npm bin)/jest --runInBand test/integration/backpack.test.js
```

If you want to watch the browser as it runs the test, rather than running headless, use:

```bash
USE_HEADLESS=no $(npm bin)/jest --runInBand test/integration/backpack.test.js
```

## Publishing to GitHub Pages
You can publish the GUI to github.io so that others on the Internet can view it.
[Read the wiki for a step-by-step guide.](https://github.com/LLK/scratch-gui/wiki/Publishing-to-GitHub-Pages)

## Donate
We provide [Scratch](https://scratch.mit.edu) free of charge, and want to keep it that way! Please consider making a [donation](https://secure.donationpay.org/scratchfoundation/) to support our continued engineering, design, community, and resource development efforts. Donations of any size are appreciated. Thank you!
