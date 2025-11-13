import React, { useState } from "react";
import NodeForm from "./NodeFrom";
import EdgeForm from "./EdgeForm";

const Sidebar = ({ onAddNode, onAddEdge }) => {
    const [activeTab, setActiveTab] = useState("node");

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Sidebar</h2>

            <div className="tab-buttons">
                <button
                    className={activeTab === "node" ? "active" : ""}
                    onClick={() => setActiveTab("node")}
                >
                    Add Node
                </button>

                <button
                    className={activeTab === "edge" ? "active" : ""}
                    onClick={() => setActiveTab("edge")}
                >
                    Add Edge
                </button>
            </div>

            {activeTab === "node" ? (
                <NodeForm onAddNode={onAddNode} />
            ) : (
                <EdgeForm onAddEdge={onAddEdge} />
            )}
        </div>
    );
};

export default Sidebar;
