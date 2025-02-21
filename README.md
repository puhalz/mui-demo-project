<img width="1426" alt="Screenshot 2025-02-21 at 5 06 55 PM" src="https://github.com/user-attachments/assets/b3316277-13dc-40cb-b9be-472d3acb72af" /># Project Name

## Overview

This is a brief description of your project. Replace this with what your project does, the main technologies used, and any other relevant details.

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

 - Adding Unit tests
 - Need to add Integration test

## UI Screens
- Login with Firebase
<img width="1426" alt="Screenshot 2025-02-21 at 5 06 55 PM" src="https://github.com/user-attachments/assets/874899b4-35e4-4e6c-9ec6-44ccadc7b535" />
- User Grid
<img width="1433" alt="Screenshot 2025-02-21 at 5 07 20 PM" src="https://github.com/user-attachments/assets/b42862e9-53a8-4715-a791-c8f91537c497" />
- Sidepanel Edit
<img width="1434" alt="Screenshot 2025-02-21 at 5 07 30 PM" src="https://github.com/user-attachments/assets/ccc86c25-d59b-4dec-a249-c40ed0c8f15b" />

  


