## Stepper

**Stepper** is a React component that allows an end-user to step thorough a sequence of pages (for example filling out a questionnaire). The project uses React Portals.

The configuration of the **Stepper** is completely data-driven. The React parent component that uses **Stepper** provides a data structure that defines which controls should appear on each **Stepper** page. Currently four types of controls are supported:
- **select** (a control using the `select` element)
- **radio** (a control consisting of a group of `radio` buttons)
- **alt-radio** (a group of `button` elements that behaves as `radio`buttons
- **textarea** (a control using a `textarea` element)
- Further input control types can easily be added

The configuration data structure contains a **`pages`** array. Each element in the array specifies the content of each **Stepper** page. Multiple controls can be placed on each **Stepper** page. Aside from the configuaration information for a control, there is also the `name` property. The **Stepper** will use this `name` property and associated control value to format the payload provided to the parent when the user clicks **Submit**.

**TODO**: 
- Support **required** fields (and disallow page advance and submission until the required fields are updated)
- Support **branching** so different paths are taken (and different pages are shown) based on the user's action

Example **Screenshots** from **Stepper**:

<img width="624" alt="Page1" src="https://user-images.githubusercontent.com/4840824/87597180-325c4500-c6a6-11ea-960a-4cc944971558.png">

<img width="624" alt="Page2" src="https://user-images.githubusercontent.com/4840824/87597192-3720f900-c6a6-11ea-8eca-f6c11e33f62e.png">

<img width="624" alt="Page3" src="https://user-images.githubusercontent.com/4840824/87597207-3daf7080-c6a6-11ea-8a60-d3ff92bae220.png">

<img width="624" alt="Page4" src="https://user-images.githubusercontent.com/4840824/87597225-49029c00-c6a6-11ea-98d3-e181555a5670.png">


Example **Output** provided by the **Stepper**:
```
[
  {
    "likely-to-recommend": 3
  },
  {
    "visit-objective": "Contact customer service"
  },
  {
    "product-of-interest": "Sneakers"
  },
  {
    "easy-to-accomplish-goal": "Difficult"
  },
  {
    "feedback": "This is free form feedback"
  }
]
```


The project's **code style is very strict** (uses the Airbnb eslint standard) 

The project is build from my React template: https://github.com/boeric/zero-config-react-webapp, which enables by default a number of modern Javascript features

## Stepper Directory Structure

```
Project
|- .babelrc (Babel compiler settings)
|– .eslintrc.json (Eslint linter settings)
|- .git
|- .gitignore
|- LICENSE.txt (MIT)
|- README.md (this file)
|- dist (distribution directory, can be rsync'ed somewhere else)
|  |- bundle.js (generated by Webpack, and included by index.html)
|  |- favicon.ico (static file)
|  |- index.html (static file)
|- node_modules
|- package.lock.json
|- package.json
|- src (code, tests and css go here)
|  |- App.js (Top level React component)
|  |- index.js (entry point)
|  |- logo.png (dummy logo on each Stepper page)
|  |- Stepper.jsx (The Stepper component)
|  |- test-babel.js
|  |- test-babel.test.js
|  |- styles.css
|– webpack.config.js (Webpack bundler settings)
```

### Example of Available Commands

**`lint`** - Lints the **`./src/js`** files using **Eslint**

**`start-dev-server`** - Starts the **Webpack** dev server

**`test`** - Runs **Jest** on the test files in **`./src/js`**

### How to use

#### Required Global Depencies

- Node: ^14.2.0
- Npm: ^6.14.4
- Yarn: ^1.22.4 (it is not required to use Yarn, but it's is a convenient alternative to Npm)

#### How To Get Going

1. Make sure that you have recent versions of **`node`** (`node --version`) and **`npm`** (`npm --version`), and optionally **`yarn`** (`yarn --version`) on your system, see above. If not, find other resources on the web on how to install these utilities on your system
1. Install the dependencies by running **`npm install`** (or just **`yarn`**)
1. Start the dev server by running the **`start-dev-server`** command
1. With your browser, head to **`http://localhost:8080`** and open the browser's debugger