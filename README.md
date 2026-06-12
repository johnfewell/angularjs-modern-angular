# AngularJS and Modern Angular Coexistence Demo

This repository demonstrates the coexistence of AngularJS and modern Angular (currently Angular 22) within a single application. It showcases how a modern Angular application can be embedded within an existing AngularJS application, allowing for seamless state synchronization between the two frameworks.

[The full description is on my blog.](https://johnfewell.com/blog/angularjs-angular17.html)

[The demo app is here](https://johnfewell.github.io/angularjs-modern-angular/#!/)

## Overview

The demo is based on the ToDo MVC project, which is designed to showcase various front-end frameworks. In this specific implementation, a modern Angular custom element is embedded within an AngularJS application, both running the same ToDo MVC application.

## Features

- Seamless integration of modern Angular within an AngularJS application
- State synchronization between AngularJS and modern Angular via signal inputs/outputs
- Demonstration of Angular Elements (custom elements) usage
- Modified build process to facilitate integration

## Getting Started

To run the demo locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/johnfewell/angularjs-modern-angular.git
```

2. Navigate to the project directory:

```
cd angularjs-modern-angular
```

3. Install the dependencies:

```
npm install
```

4. Start the development server:

```
npm run start
```

5. Open your browser and visit `http://localhost:4200` to see the demo in action.

## Project Structure

- `src/`: Contains the source code for the modern Angular application
- `angularjs/`: Contains the AngularJS application code
  - `angularjs/bundles/`: Output directory for the compiled Angular bundles
- `angular.json`: Angular configuration file
- `package.json`: Node.js package configuration file

## How It Works

The modern Angular application is compiled as a custom element (Angular Element) and embedded within the AngularJS application. The build process is modified to generate consistently named bundles without hashing, facilitating the inclusion of the Angular bundles in the AngularJS application.

State synchronization between AngularJS and modern Angular is achieved through a directive that binds the input and output data from the Angular custom element to AngularJS. This ensures that any changes made in one framework are reflected in the other.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [AngularJS](https://angularjs.org/)
- [Angular](https://angular.dev/)
- [ToDo MVC](https://todomvc.com/)
