# 📦TapSticky

## Overview
TapSticky is a versatile desktop application designed to streamline your note-taking process with a blend of traditional sticky notes' simplicity and modern functionality.

It caters to users who need quick access to notes while maintaining productivity through its unique "pinning" feature.

Whether you're jotting down quick reminders or creating detailed notes, TapSticky makes it effortless and intuitive.

<a href="https://www.buymeacoffee.com/trinesh" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" style="height: 40px;" >
</a>

## ✨ Key Features
- Pinning Window: TapSticky allows you to pin its window to ensure it remains visible above all other applications, providing constant access to your notes without interruption.
- Intuitive Interface: The app offers an intuitive user interface that simplifies the creation, editing, and organization of notes, making it easy to jot down quick reminders or develop detailed notes.
- Customizable Notes: Users can customize their notes with various formatting options and colors, allowing for efficient categorization and retrieval of information.
- Accessibility Features: Designed for accessibility, TapSticky offers keyboard shortcuts and customizable settings to enhance user experience and workflow efficiency.

## Use Cases
- Personal Organization: Ideal for personal organization, from managing daily tasks and reminders to creating shopping lists and brainstorming ideas.
- Professional Use: Suitable for professionals needing to keep track of meetings, project notes, and important deadlines, enhancing productivity and workflow management.

## Download exe or zip file
https://github.com/trineshl/tap-sticky/releases/tag/v1.0.1

## Sample Images
![image](https://github.com/user-attachments/assets/bf38dfcf-a707-474e-af11-2e94d4f23936)

### Pin Icon - Pin your window always on top
![image](https://github.com/user-attachments/assets/7743342d-6c67-4cc7-9c32-5b1205a4a278)


# 🛠️ Local installation

## Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

Follow these steps to run the project locally:

### Step 1: Set up the client

1. Navigate to the `client` folder:
```bash   
cd client
```
2. Install the dependencies:
```bash   
npm install
```
3. Build the client:
```bash
npm run build
```
This will create a build folder inside the client directory.

### Step 2: Set up the server
1. Navigate to the desktop folder:
```bash   
cd desktop
```
2. Install the dependencies:
```bash   
npm install
```
3. Copy the client build from the `client/build` directory and paste it into the `desktop/client` folder.
4. Build the client:
```bash
npm run dist
```
This will create a dist folder inside the server directory.

### If you want to run in development mode:
1. Navigate to the client folder:
```bash   
cd client
```
2. Run the client project by:
```bash   
npm start
```
3. Navigate to the desktop folder:
```bash   
cd desktop
```
4. Change the default port number from file to mostly 3000 (as on 3000, the client is running):
```bash   
invokeWindow.js -> LWindow.loadURL
```
5. Run the Electron desktop app:
```bash
npm run start
```

### Scripts
#### Client Scripts
- `npm start: Starts the React development server.`
- `npm run build: Builds the React app for production.`
#### Desktop Scripts
- `npm start: Starts the Electron app.`
- `npm run dist: Builds the Electron app for distribution.`
