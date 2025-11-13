import React, { useState, useEffect, useRef } from "react";
import { useReactFlow } from "reactflow";
import Sidebar from "./Sidebar";
import FlowCanvas from "./FlowConvas";
import metadata from "../metadata.json";

const LOCAL_KEY = "reactflow_saved_diagram";

const FlowEditor = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDefaultDiagram, setIsDefaultDiagram] = useState(false);

    const { fitView, project } = useReactFlow();
    const fileInputRef = useRef(null);

    // LOAD diagram
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_KEY);

        if (saved && saved !== '{"nodes":[],"edges":[]}') {
            const parsed = JSON.parse(saved);
            setNodes(parsed.nodes);
            setEdges(parsed.edges);
            setIsDefaultDiagram(false);
        } else {
            setNodes(metadata.nodes);
            setEdges(metadata.edges);
            setIsDefaultDiagram(true);
        }

        setIsLoading(false);
    }, []);

    // AUTO SAVE
    useEffect(() => {
        if (isLoading || isDefaultDiagram) return;

        localStorage.setItem(
            LOCAL_KEY,
            JSON.stringify({ nodes, edges })
        );
    }, [nodes, edges, isLoading, isDefaultDiagram]);

    // ADD NODE
    const handleAddNode = (newNode) => {
        if (isDefaultDiagram) {
            setNodes([newNode]);
            setEdges([]);
            setIsDefaultDiagram(false);
        } else {
            setNodes((prev) => [...prev, newNode]);
        }

        setTimeout(() => {
            fitView({
                nodes: [newNode.id],
                duration: 200,
                maxZoom: 1.2,
            });
        }, 50);
    };

    // ADD EDGE
    const handleAddEdge = (newEdge) => {
        if (isDefaultDiagram) {
            setEdges([newEdge]);
            setNodes([]);
            setIsDefaultDiagram(false);
        } else {
            setEdges((prev) => [...prev, newEdge]);
        }
    };

    // DOUBLE-CLICK EMPTY CANVAS → add new node
    const handlePaneDoubleClick = (event) => {
        const position = project({
            x: event.clientX,
            y: event.clientY - 80,
        });

        handleAddNode({
            id: `node_${crypto.randomUUID()}`,
            type: "default",
            position,
            data: { label: "New Node" },
        });
    };

    // EXPORT JSON
    const handleExport = () => {
        if (nodes.length === 0) return;
        const diagram = { nodes, edges };
        const blob = new Blob([JSON.stringify(diagram, null, 2)], {
            type: "application/json",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "flow-diagram.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    // IMPORT JSON
    const handleImportClick = () => fileInputRef.current.click();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = JSON.parse(e.target.result);

            setNodes(data.nodes || []);
            setEdges(data.edges || []);
            setIsDefaultDiagram(false);
            localStorage.removeItem(LOCAL_KEY);

            setTimeout(() => fitView({ duration: 200 }), 50);
        };

        reader.readAsText(file);
    };

    // RESET
    const handleReset = () => {
        if (!window.confirm("Reset to default metadata.json?")) return;

        setNodes(metadata.nodes);
        setEdges(metadata.edges);
        setIsDefaultDiagram(true);
        localStorage.removeItem(LOCAL_KEY);
    };

    return (
        <div className="app-container">
            <Sidebar onAddNode={handleAddNode} onAddEdge={handleAddEdge} />

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div
                    style={{
                        padding: "8px",
                        borderBottom: "1px solid #ddd",
                        background: "#fff",
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                    }}
                >
                    <button onClick={handleReset}>Reset Diagram</button>
                    <button onClick={handleExport}>Export JSON</button>
                    <button onClick={handleImportClick}>Import JSON</button>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept=".json"
                        onChange={handleFileChange}
                    />
                </div>

                {!isLoading && (
                    <FlowCanvas
                        nodes={nodes}
                        setNodes={setNodes}
                        edges={edges}
                        setEdges={setEdges}
                        onPaneDoubleClick={handlePaneDoubleClick}
                    />
                )}
            </div>
        </div>
    );
};

export default FlowEditor;
