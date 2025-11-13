React Flow Diagram Editor

This project is a custom React-based flow diagram editor built using React Flow.
Users can:

Add nodes & edges

Edit nodes (double-click)

Edit edges (double-click)

Delete nodes & edges (Delete key)

Create nodes by double-clicking on the canvas

Reset the diagram to default metadata

Export the diagram as JSON

Import a diagram from a JSON file

Auto-save diagrams to localStorage

This editor is built to be simple, clean, and fully interactive.

🚀 Features
✅ Node Features

Add new nodes through the sidebar

Double-click to edit node label

Press Delete to remove node

Add node by double-clicking empty canvas

Load nodes from metadata.json

Save nodes to localStorage automatically

✅ Edge Features

Add edges through the sidebar

Double-click to edit edge type

Press Delete to remove edge

Auto-remove connected edges if node is deleted

Save edges to localStorage

✅ Import / Export Features

Export diagram as a .json file

Import any valid JSON diagram

Validate node/edge structure

Auto-fit view after import

✅ Reset to Default

Reset diagram to metadata.json without saving

LocalStorage will be cleared on reset

📁 Project Structure
src/
│
├── components/
│   ├── FlowEditor.jsx        # Main editor logic
│   ├── FlowCanvas.jsx        # ReactFlow canvas
│   ├── Sidebar.jsx           # Sidebar UI
│   ├── NodeForm.jsx         # Form for adding nodes
│   ├── EdgeForm.jsx         # Form for adding edges
│   ├── styles.css            # App-wide styles
│
├── metadata.json             # Default diagram data
├── App.jsx                   # App entry
└── index.js

🧩 Component Overview
FlowEditor.jsx

Handles:

Loading saved diagram or default metadata

Auto-saving

Adding nodes/edges

Import/export

Reset logic

Canvas double-click → add node

FlowCanvas.jsx

Handles:

Render nodes & edges

Edit label on double-click

Edit edge type on double-click

Delete nodes/edges

Remove connected edges when node deleted

Sidebar.jsx

Provides:

Tabs (Node / Edge)

NodeForm

EdgeForm

NodeForm.jsx

Used to create new nodes with:

id

label

optional x, y coordinates

EdgeForm.jsx

Used to create new edges:

id

source node

target node

edge type

🛠️ Installation & Setup
1️⃣ Install dependencies
npm install

2️⃣ Start the development server
npm start

3️⃣ Open in browser

Go to:

http://localhost:3000

📌 How to Use
➕ Add Node

Go to Add Node tab

Enter:

id

label

(optional) x, y

Click Add Node

OR
Double-click the canvas → automatic new node

➕ Add Edge

Go to Add Edge tab

Enter:

id

source

target

type

Click Add Edge

✏️ Edit Node

Double-click a node → type new label

✏️ Edit Edge

Double-click an edge → type new type
(smoothstep, straight, step)

🗑️ Delete Node or Edge

Click node or edge

Press Delete key

📤 Export Diagram

Click Export JSON

File: flow-diagram.json

📥 Import Diagram

Click Import JSON

Select file

Diagram updates instantly

🔄 Reset Diagram

Loads metadata.json and clears localStorage.

🧪 Testing Checklist
Node tests:

✔ Add a node
✔ Edit node label (double-click)
✔ Delete node (Delete key)
✔ Connected edges automatically removed

Edge tests:

✔ Add edge
✔ Edit edge type (double-click)
✔ Delete edge (Delete key)

JSON tests:

✔ Export JSON
✔ Import valid JSON
✔ Import invalid JSON → alert message
✔ FitView works after import

📌 JSON Format Example
{
  "nodes": [
    {
      "id": "1",
      "type": "default",
      "position": { "x": 200, "y": 150 },
      "data": { "label": "Node 1" }
    }
  ],
  "edges": [
    {
      "id": "e1-2",
      "source": "1",
      "target": "2",
      "type": "smoothstep"
    }
  ]
}

🎯 Future Enhancements (Optional)

If you want, I can help implement:

Right-click context menu

Sidebar editing for selected node

Snap-to-grid

Mini-map & controls

Drag-select multiple nodes