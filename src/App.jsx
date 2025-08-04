import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from "reactflow";
import { useState, useCallback } from "react";
import "reactflow/dist/style.css";
// import '@xyflow/react/dist/style.css';

const CustomNode = ({ data, isConnectable }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getNodeColor = (category) => {
    const colors = {
      prerequisites: "bg-blue-100 border-blue-300",
      basics: "bg-green-100 border-green-300",
      intermediate: "bg-yellow-100 border-yellow-300",
      advanced: "bg-purple-100 border-purple-300",
      deployment: "bg-red-100 border-red-300",
      performance: "bg-indigo-100 border-indigo-300",
    };
    return colors[category] || "bg-gray-100 border-gray-300";
  };

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg border-2 min-w-[200px] max-w-[300px] ${getNodeColor(
        data.category
      )}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />

      <div className="flex items-center justify-between">
        <div className="font-bold text-sm text-gray-800">{data.label}</div>
        {data.details && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 text-xs bg-white px-2 py-1 rounded hover:bg-gray-50"
          >
            {isExpanded ? "−" : "+"}
          </button>
        )}
      </div>

      {data.description && (
        <div className="text-xs text-gray-600 mt-1">{data.description}</div>
      )}

      {isExpanded && data.details && (
        <div className="mt-2 text-xs text-gray-700 bg-white p-2 rounded border">
          <ul className="space-y-1">
            {data.details.map((detail, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-1">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  // Prerequisites
  {
    id: "1",
    type: "custom",
    position: { x: 100, y: 50 },
    data: {
      label: "JavaScript ES6+",
      category: "prerequisites",
      description: "Modern JavaScript fundamentals",
      details: [
        "Arrow functions, destructuring",
        "Promises and async/await",
        "Modules (import/export)",
        "Template literals",
      ],
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 400, y: 50 },
    data: {
      label: "React Fundamentals",
      category: "prerequisites",
      description: "Core React concepts",
      details: [
        "Components and JSX",
        "Props and State",
        "Event handling",
        "Conditional rendering",
      ],
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 700, y: 50 },
    data: {
      label: "React Hooks",
      category: "prerequisites",
      description: "Modern React patterns",
      details: [
        "useState, useEffect",
        "useContext, useReducer",
        "Custom hooks",
        "Hook rules and patterns",
      ],
    },
  },

  // Basics
  {
    id: "4",
    type: "custom",
    position: { x: 250, y: 200 },
    data: {
      label: "Next.js Setup",
      category: "basics",
      description: "Getting started with Next.js",
      details: [
        "Create Next.js app",
        "Project structure",
        "Development server",
        "Build and start scripts",
      ],
    },
  },
  {
    id: "5",
    type: "custom",
    position: { x: 550, y: 200 },
    data: {
      label: "Pages & Routing",
      category: "basics",
      description: "File-based routing system",
      details: [
        "Pages directory",
        "Dynamic routes [id].js",
        "Nested routes",
        "Catch-all routes [...slug].js",
      ],
    },
  },

  // Intermediate
  {
    id: "6",
    type: "custom",
    position: { x: 100, y: 350 },
    data: {
      label: "App Router (v13+)",
      category: "intermediate",
      description: "Modern routing with app directory",
      details: [
        "app/ directory structure",
        "Layout components",
        "Loading and error pages",
        "Route groups",
      ],
    },
  },
  {
    id: "7",
    type: "custom",
    position: { x: 400, y: 350 },
    data: {
      label: "Data Fetching",
      category: "intermediate",
      description: "Multiple data fetching strategies",
      details: [
        "getStaticProps (SSG)",
        "getServerSideProps (SSR)",
        "getStaticPaths",
        "SWR and React Query",
      ],
    },
  },
  {
    id: "8",
    type: "custom",
    position: { x: 700, y: 350 },
    data: {
      label: "API Routes",
      category: "intermediate",
      description: "Backend API endpoints",
      details: [
        "pages/api/ directory",
        "HTTP methods handling",
        "Middleware",
        "Database connections",
      ],
    },
  },

  // Advanced
  {
    id: "9",
    type: "custom",
    position: { x: 50, y: 500 },
    data: {
      label: "Server Components",
      category: "advanced",
      description: "React Server Components",
      details: [
        "Server vs Client components",
        "Streaming and Suspense",
        "Server actions",
        "Data mutations",
      ],
    },
  },
  {
    id: "10",
    type: "custom",
    position: { x: 300, y: 500 },
    data: {
      label: "Middleware",
      category: "advanced",
      description: "Request/response interception",
      details: [
        "middleware.js file",
        "Authentication guards",
        "Redirects and rewrites",
        "Edge runtime",
      ],
    },
  },
  {
    id: "11",
    type: "custom",
    position: { x: 550, y: 500 },
    data: {
      label: "Authentication",
      category: "advanced",
      description: "User authentication patterns",
      details: [
        "NextAuth.js",
        "JWT tokens",
        "Session management",
        "Protected routes",
      ],
    },
  },
  {
    id: "12",
    type: "custom",
    position: { x: 800, y: 500 },
    data: {
      label: "Advanced Routing",
      category: "advanced",
      description: "Complex routing patterns",
      details: [
        "Parallel routes",
        "Intercepting routes",
        "Route handlers",
        "Custom 404/500 pages",
      ],
    },
  },

  // Performance
  {
    id: "13",
    type: "custom",
    position: { x: 150, y: 650 },
    data: {
      label: "Image Optimization",
      category: "performance",
      description: "Built-in image optimization",
      details: [
        "next/image component",
        "Automatic WebP conversion",
        "Lazy loading",
        "Responsive images",
      ],
    },
  },
  {
    id: "14",
    type: "custom",
    position: { x: 450, y: 650 },
    data: {
      label: "Performance",
      category: "performance",
      description: "Optimization techniques",
      details: [
        "Code splitting",
        "Bundle analyzer",
        "Web Vitals",
        "Lighthouse optimization",
      ],
    },
  },
  {
    id: "15",
    type: "custom",
    position: { x: 750, y: 650 },
    data: {
      label: "Caching Strategies",
      category: "performance",
      description: "Various caching approaches",
      details: [
        "Static generation",
        "Incremental Static Regeneration",
        "API route caching",
        "CDN integration",
      ],
    },
  },

  // Deployment
  {
    id: "16",
    type: "custom",
    position: { x: 200, y: 800 },
    data: {
      label: "Vercel Deployment",
      category: "deployment",
      description: "Native Next.js hosting",
      details: [
        "Git integration",
        "Preview deployments",
        "Environment variables",
        "Analytics and monitoring",
      ],
    },
  },
  {
    id: "17",
    type: "custom",
    position: { x: 500, y: 800 },
    data: {
      label: "Alternative Hosting",
      category: "deployment",
      description: "Other deployment options",
      details: [
        "Netlify, AWS, Azure",
        "Docker containerization",
        "Static export",
        "Self-hosted solutions",
      ],
    },
  },
  {
    id: "18",
    type: "custom",
    position: { x: 800, y: 800 },
    data: {
      label: "Production Setup",
      category: "deployment",
      description: "Production considerations",
      details: [
        "Environment configuration",
        "Error monitoring (Sentry)",
        "Analytics setup",
        "SEO optimization",
      ],
    },
  },
];

const initialEdges = [
  // Prerequisites flow
  { id: "e1-4", source: "1", target: "4" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e2-5", source: "2", target: "5" },
  { id: "e3-5", source: "3", target: "5" },

  // Basic to intermediate
  { id: "e4-6", source: "4", target: "6" },
  { id: "e5-6", source: "5", target: "6" },
  { id: "e5-7", source: "5", target: "7" },
  { id: "e5-8", source: "5", target: "8" },

  // Intermediate to advanced
  { id: "e6-9", source: "6", target: "9" },
  { id: "e6-10", source: "6", target: "10" },
  { id: "e7-9", source: "7", target: "9" },
  { id: "e8-11", source: "8", target: "11" },
  { id: "e6-12", source: "6", target: "12" },

  // Advanced to performance
  { id: "e9-13", source: "9", target: "13" },
  { id: "e9-14", source: "9", target: "14" },
  { id: "e7-15", source: "7", target: "15" },

  // Performance to deployment
  { id: "e13-16", source: "13", target: "16" },
  { id: "e14-16", source: "14", target: "16" },
  { id: "e14-17", source: "14", target: "17" },
  { id: "e15-18", source: "15", target: "18" },
  { id: "e16-18", source: "16", target: "18" },
  { id: "e17-18", source: "17", target: "18" },
];

export default function NextJSRoadmap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  return (
    <div className="fixed inset-0 flex flex-col">
      <div className="flex-shrink-0 p-4 bg-white shadow-sm border-b">
        <h1 className="text-2xl font-bold text-gray-800">
          Next.js Learning Roadmap
        </h1>
        <p className="text-gray-600 mt-1">
          Interactive roadmap to master Next.js development. Click + buttons to
          expand details.
        </p>

        <div className="flex gap-4 mt-3 text-xs text-gray-700">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
            <span>Prerequisites</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
            <span>Basics</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span>Intermediate</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-100 border border-purple-300 rounded"></div>
            <span>Advanced</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-indigo-100 border border-indigo-300 rounded"></div>
            <span>Performance</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
            <span>Deployment</span>
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-600">
          <strong>Ready for React Flow!</strong> This component now uses the
          official React Flow library from reactflow.dev with proper imports and
          hooks.
        </div>
      </div>

      <div className="flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-50"
        >
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              const colors = {
                prerequisites: "#dbeafe",
                basics: "#dcfce7",
                intermediate: "#fef3c7",
                advanced: "#e9d5ff",
                deployment: "#fecaca",
                performance: "#e0e7ff",
              };
              return colors[node.data.category] || "#f3f4f6";
            }}
          />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
