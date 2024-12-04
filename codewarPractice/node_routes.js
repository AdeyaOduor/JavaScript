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
