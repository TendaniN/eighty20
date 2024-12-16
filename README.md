# Getting Started

## Manually

1. Clone this repository.
2. Checkout to the `master` branch. `git checkout master`
4. Run `nvm use` to make sure you are using the correct supported version of node and npm.
5. Install dependencies with `npm install` (`npm i` for short)
6. Start the development server: `npm run dev`
7. (Optional) check out build statistics by running `npm run build`

## Using a script

- To build: `./build.sh`
- To run dev server: `./run.sh`


# Project Configuration

## Linting

I used [ESLint](https://eslint.org/) for type checking Javascript and TypeScript files.

## Project Structure

The top level of `src` directory will look like this:

```tree
src
├── api               # API wrapper utility functions.
├── assets            # Contains all the static files such as images, pdfs, etc.
├── components        # Shared components for the project.
├── state             # Where all State management is handled.
├── pages             # Routes configuration.
│   └── example
│       ├── components              # Components used only on the example page
│       ├── constants               # Constants used only on the example page
│       ├── index                   # Entry example file
│       └── style                   # Styles used only on the example page
└── utils             # Shared utility functions.
```

The idea is that [all the code that belongs to a component is located in a single directory](https://kentcdodds.com/blog/colocation). This makes it very easy to extract the code into a package at a later stage if the need arises.

If components, utilities, hooks etc are shared by multiple components, I moved them up until they are in a shared scope. That is to say, if the component in directory `A` has a utility function that is also required by the component in directory `B`, this function needs to be moved up to the parent directory containing both `A` and `B` and not imported directly from `A`.

## Forms

Any time you receive input from the user, a form is used (or should be at least). However, forms in React can quickly become repetitive and make your component noisy with states of inputs and the form itself. Throw validation into the mix and the business logic can quickly become cluttered.

To avoid this overhead, I opted for using the [formik](https://formik.org/) library to handle forms. The library works for React and React Native and handles form state internally for us.

Formik also allows us to hook in a [Yup](https://github.com/jquense/yup) validation schema. This provides a flexible API for defining per-input validation rules and messages.

## Remote state

I am using [Redux toolkit](https://redux-toolkit.js.org/) as a remote state management library.

### Folder Structure
```
src
└── redux
    ├── slices
    |    └── teams
    ├── reducers
    ├── sagas
    └── initial-state
```

### Slices

> [createSlice is] a function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state. This API is the standard approach for writing Redux logic. Internally, it uses createAction and createReducer, so you may also use Immer to write "mutating" immutable updates. [createSlice() documentation](https://redux-toolkit.js.org/api/createSlice)
