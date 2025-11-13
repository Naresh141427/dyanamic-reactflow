import React, { useCallback } from "react";
import ReactFlow from "reactflow";

const FlowCanvas = ({ nodes, setNodes, edges, setEdges, onPaneDoubleClick }) => {


    // DELETE NODE (Delete key)
    const onNodesDelete = useCallback((deletedNodes) => {
        setNodes((nds) => nds.filter((n) => !deletedNodes.some((d) => d.id === n.id)));

        // Remove edges connected to deleted node
        setEdges((eds) =>
            eds.filter(
                (e) => !deletedNodes.some((d) => e.source === d.id || e.target === d.id)
            )
        );
    }, [setNodes, setEdges]);

    // DELETE EDGE (Delete key)
    const onEdgesDelete = useCallback((deletedEdges) => {
        setEdges((eds) => eds.filter((e) => !deletedEdges.some((d) => d.id === e.id)));
    }, [setEdges]);

    // EDIT NODE (double-click)
    const onNodeDoubleClick = useCallback((event, node) => {
        const newLabel = prompt("Edit Label", node.data.label);
        if (!newLabel) return;

        setNodes((nds) =>
            nds.map((n) =>
                n.id === node.id ? { ...n, data: { label: newLabel } } : n
            )
        );
    }, [setNodes]);

    // EDIT EDGE (double-click)
    const onEdgeDoubleClick = useCallback((event, edge) => {
        const newType = prompt(
            "Enter new edge type: smoothstep / straight / step",
            edge.type
        );
        if (!newType) return;

        setEdges((eds) =>
            eds.map((e) =>
                e.id === edge.id ? { ...e, type: newType } : e
            )
        );
    }, [setEdges]);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onPaneDoubleClick={onPaneDoubleClick}
                onNodesDelete={onNodesDelete}
                onEdgesDelete={onEdgesDelete}
                onNodeDoubleClick={onNodeDoubleClick}
                onEdgeDoubleClick={onEdgeDoubleClick}
                fitView
            />
        </div>
    );
};

export default FlowCanvas;
