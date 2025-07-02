import { Node, Edge, Connection } from "reactflow";

export interface LayoutProps {
  selectedNodeId: string | null;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  handleSave: () => void;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  onNodeClick: (event: unknown, node: Node) => void;
  nodeTypes: any;
  nodeTypeList: any[];
}
