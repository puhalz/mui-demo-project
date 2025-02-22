# Project Name
Enterprise App

## Overview

MUI Enterprise App - MUI - Typescript

## Getting Started

To get started with this project locally, follow the instructions below.

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: This project requires Node.js. You can download and install the latest version from [nodejs.org](https://nodejs.org/).
- **npm**: npm (Node Package Manager) is installed automatically with Node.js. You can verify it's installed by running:

  ```bash
  npm --version
  ```
  
### Installation
Clone the Repository

First, clone the repository to your local machine:

bash
Copy
git clone <repository-url>

### Install Dependencies

Navigate into the project directory and install all the required dependencies using npm:

  ```bash
    cd <project-directory>
    npm install
  ```

This will install all the dependencies listed in package.json.

### Running the Development Server
Once the dependencies are installed, you can start the development server:

  ```bash  
  npm run dev
  ```

This will start the application locally. Typically, it will be available at http://localhost:3000/ (or another port if specified).

### Running Tests
If your project has tests set up, you can run them using:

```bash 
npm run test
```  

### MUI UI

Using ToolPad Library

- Language Switcher
- Light and Dark mode
- Search (No Functionality added yet)

### Auth 

For Login using firebase auth.

.env file can be updated with the config.
```bash 
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGE_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
```

### User - Add, Edit, Delete
 - DataGrid
 - Added side drawer edit for the UserGrid (Toggle to switch between Inline edit and Sidepanel edit)
 - Using MSW for mock api
 - Localstorage to persist the data

### Translation

Using i18n library

Adding translation files in the following path

```bash
public/locales/
```

### Code Quality

- Added Eslint and Typescript Eslint.
- Prettier for code formatting 

### Unit test

Using Jest for unit testing (Still working on adding more unit tests)

### Work in progress

 - Adding more Unit tests
 - Need to add Integration test

## UI Screens
- Login with Firebase
  <img width="1435" alt="Screenshot 2025-02-22 at 4 33 54 PM" src="https://github.com/user-attachments/assets/706b4fdc-5690-46e9-8c21-9cca67912f07" />
- User Grid
  <img width="1439" alt="Screenshot 2025-02-22 at 4 34 15 PM" src="https://github.com/user-attachments/assets/212c0d95-3329-4282-a55c-e4f82e94e7d9" />
- Sidepanel Edit
  <img width="1440" alt="Screenshot 2025-02-22 at 4 34 42 PM" src="https://github.com/user-attachments/assets/25e01e0c-aa09-4019-9a88-d291cfbc9415" />


  


