
import { ReactFlowProvider } from "reactflow";
import FlowEditor from "./components/FlowEditor";
import "reactflow/dist/style.css";
import "./components/styles.css";

const App = () => {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
};

export default App;
