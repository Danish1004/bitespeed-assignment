import { Node, Edge, Connection } from "reactflow";

export interface LayoutProps {
  selectedNode: Node | null;
  setSelectedNode: React.Dispatch<React.SetStateAction<Node | null>>;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  handleSave: () => void;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  onNodeClick: (event: unknown, node: Node) => void;
  nodeTypes: any;
  onDragOver: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
}
