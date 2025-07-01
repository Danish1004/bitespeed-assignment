# BiteSpeed Frontend Task: Chatbot Flow Builder

## Overview

This project is a **Chatbot Flow Builder** frontend, designed as part of the BiteSpeed Frontend Task. The application allows users to visually create, edit, and manage chatbot conversation flows using a node-based interface. Users can add, connect, and configure different types of nodes to define the logic and structure of a chatbot conversation.

The project demonstrates modern frontend engineering practices, including component-based architecture, state management, and interactive UI design.

---

## Features Implemented

- **Visual Flow Builder**: Drag-and-drop interface to create and connect nodes representing chatbot steps.
- **Node Types**: Support for different node types (e.g., text, question, action) with customizable settings.
- **Nodes Panel**: Sidebar to add new nodes to the canvas.
- **Settings Panel**: Edit properties and configuration of selected nodes.
- **Dynamic Connections**: Create and visualize connections between nodes to define conversation flow.
- **Persistent State**: Flow state is managed in React and can be extended to support saving/loading.
- **Reusable Components**: Modular design for easy extension and maintenance.

---

## Technologies and Concepts Used

- **React**: For building the user interface with a component-based approach.
- **TypeScript**: Ensures type safety and better developer experience.
- **Tailwind CSS**: Utility-first CSS framework for rapid and consistent styling.
- **React Flow**: For node-based flow rendering and interaction.
- **Custom Hooks & Utilities**: For state management and logic separation.

---

## Key Concepts Demonstrated

- **Component-Based Architecture**: UI is broken into reusable, isolated components (e.g., NodesPanel, SettingsPanel, CustomTextNode).
- **State Management**: Uses React hooks and context to manage the flow state and node properties.
- **Drag-and-Drop Interaction**: Implements interactive node placement and connection.
- **Type Safety**: Leverages TypeScript for robust and maintainable code.
- **Separation of Concerns**: Logic, UI, and utility functions are organized for clarity and scalability.

---

## How to Run the Project

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd bitespeed-assignment
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

---

## Folder Structure

```
src/
  ├── App.tsx                # Main application component
  ├── index.tsx              # Entry point
  ├── index.css              # Global styles (Tailwind)
  ├── common/                # Shared UI components (e.g., Header)
  ├── components/            # Feature-specific components (e.g., CustomTextNode, NodesPanel, SettingsPanel)
  ├── utils/                 # Utility functions and TypeScript types
  └── Layout.tsx             # Layout wrapper for the app
```

---

## Example Usage

1. **Add Nodes**: Use the Nodes Panel to drag new nodes onto the canvas.
2. **Connect Nodes**: Click and drag from one node to another to create a connection.
3. **Edit Node Settings**: Select a node to edit its properties in the Settings Panel.
4. **Visualize Flow**: The canvas updates in real-time to reflect the current chatbot flow.

---
