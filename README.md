# FSMVRPTW Visual

This project is a visual representation of the **FSMVRPTW** (Fleet Size and Mix Vehicle Routing Problem with Time Windows) problem.  
Together with my collaborator, we developed a [Rust server](https://github.com/Simone-Lauro-itis-pr/fsmvrptw-server-noauth) that computes the solution to the problem, while this frontend — built using **React** — is used to display the solution graphically.

It was our first time using **React** and **Bootstrap**, so the code may not be the most efficient or easy to follow, but it was a valuable learning experience.

## 🔧 Technologies Used

- [React](https://react.dev/) – JavaScript library for building user interfaces
- [Bootstrap](https://getbootstrap.com/) – Styling and layout framework
- [Cytoscape.js](https://js.cytoscape.org/) – Library for graph theory visualization and analysis
- [Vite](https://vitejs.dev/) – Frontend build tool for fast development

## 🚀 How to Run

1. Clone this repository  
2. Clone [Rust server](https://github.com/Simone-Lauro-itis-pr/fsmvrptw-server-noauth)
3. run Rust server with the command `cargo run -r `
4. Install dependencies on this project:
    ```bash
    npm install react react-dom
    npm install bootstrap
    npm install cytoscape cytoscape-cxtmenu cytoscape-cose-bilkent cytoscape-spread cytoscape-cola
    npm install react-use-websocket
5. Start the development server with `npm run dev`

Make sure the Rust backend is running on the configured address before starting the frontend.