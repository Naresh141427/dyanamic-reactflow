import React, { useState } from "react";

const EdgeForm = ({ onAddEdge }) => {
    const [edgeData, setEdgeData] = useState({
        id: "",
        source: "",
        target: "",
        type: "smoothstep",
    });

    const handleChange = (e) => {
        setEdgeData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!edgeData.id || !edgeData.source || !edgeData.target) {
            alert("All fields required!");
            return;
        }

        onAddEdge(edgeData);

        setEdgeData({ id: "", source: "", target: "", type: "smoothstep" });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h3>Add Edge</h3>

            <label>ID:</label>
            <input name="id" value={edgeData.id} onChange={handleChange} />

            <label>Source:</label>
            <input name="source" value={edgeData.source} onChange={handleChange} />

            <label>Target:</label>
            <input name="target" value={edgeData.target} onChange={handleChange} />

            <label>Type:</label>
            <select name="type" value={edgeData.type} onChange={handleChange}>
                <option value="smoothstep">Smooth Step</option>
                <option value="straight">Straight</option>
                <option value="step">Step</option>
            </select>

            <button type="submit">Add Edge</button>
        </form>
    );
};

export default EdgeForm;
