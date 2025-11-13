import React, { useState } from "react";

const NodeForm = ({ onAddNode }) => {
    const [nodeData, setNodeData] = useState({
        id: "",
        label: "",
        x: "",
        y: "",
    });

    const handleChange = (e) => {
        setNodeData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nodeData.id || !nodeData.label) {
            alert("ID and Label are required!");
            return;
        }

        const newNode = {
            id: nodeData.id,
            type: "default",
            position: {
                x: Number(nodeData.x) || Math.random() * 400,
                y: Number(nodeData.y) || Math.random() * 400,
            },
            data: { label: nodeData.label },
        };

        onAddNode(newNode);

        setNodeData({ id: "", label: "", x: "", y: "" });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h3>Add Node</h3>

            <label>ID:</label>
            <input name="id" value={nodeData.id} onChange={handleChange} />

            <label>Label:</label>
            <input name="label" value={nodeData.label} onChange={handleChange} />

            <label>X:</label>
            <input name="x" value={nodeData.x} onChange={handleChange} />

            <label>Y:</label>
            <input name="y" value={nodeData.y} onChange={handleChange} />

            <button type="submit">Add Node</button>
        </form>
    );
};

export default NodeForm;
