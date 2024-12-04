const Graph = require('./../util/Graph');
const Queue = require('./../util/Queue');

// Function to check if there exists a route between two nodes in a graph
const checkRoute = (startValue, endValue, graph) => {
    if (!graph.hasNode(startValue) || !graph.hasNode(endValue)) return false;

    const queueStart = new Queue();
    const queueEnd = new Queue();
    const visitedStart = {};
    const visitedEnd = {};

    // Initialize queues and visited objects
    visitedStart[startValue] = true;
    visitedEnd[endValue] = true;

    // Add edges from start and end nodes to their respective queues
    graph.findEdges(startValue).forEach(edge => queueStart.add(edge));
    graph.findEdges(endValue).forEach(edge => queueEnd.add(edge));

    // Perform bidirectional BFS
    while (!queueStart.isEmpty() || !queueEnd.isEmpty()) {
        if (processQueue(queueStart, visitedStart, endValue, graph)) {
            return true;
        }
        if (processQueue(queueEnd, visitedEnd, startValue, graph)) {
            return true;
        }
    }

    return false;
};

// Helper function to process a queue
const processQueue = (queue, visited, targetValue, graph) => {
    if (!queue.isEmpty()) {
        const currentNode = queue.remove();
        if (currentNode === targetValue) {
            return true;
        }
        if (!visited[currentNode]) {
            visited[currentNode] = true;
            graph.findEdges(currentNode).forEach(edge => queue.add(edge));
        }
    }
    return false;
};

// Test the implementation
const graph = new Graph();
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addNode('E');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');
graph.addEdge('D', 'E');

console.log(checkRoute('A', 'C', graph)); // true
console.log(checkRoute('A', 'E', graph)); // false
console.log(checkRoute('B', 'A', graph)); // true
console.log(checkRoute('D', 'E', graph)); // true

/*
Real-World Applications
1. Pathfinding in Maps and Navigation Applications

In applications like Google Maps or any GPS-based navigation system, determining whether there is a route between two locations 
(e.g., cities, landmarks) is crucial. The graph can represent intersections as nodes and roads as edges. The checkRoute function 
can help users find out if they can travel from one point to another, considering the road network.

Implementation:

    Graph Representation: Nodes represent locations, and edges represent roads or paths.
    User Query: When a user inputs a start and end location, the application can use checkRoute to determine connectivity and display 
    directions if a route exists.

2. Social Network Connections

In social media platforms, users are represented as nodes, and their connections (friends, followers) as edges. If a user wants to 
know if they can reach another user (directly or indirectly), the checkRoute function can be employed.

Implementation:

    Graph Structure: Each user is a node, and friendships are edges.
    Friend Suggestions: The system can suggest friends by checking if there is a path between the user and potential connections.

3. Network Traffic Management

In network management systems, routers and switches can be represented as a graph to monitor data flow. The function can determine 
if data can be routed from one device to another, helping identify potential issues in network configuration or data bottlenecks.

Implementation:

    Graph Representation: Devices as nodes and connections as edges.
    Traffic Analysis: The system can analyze traffic paths and optimize routing to avoid congested or faulty paths.
*/
