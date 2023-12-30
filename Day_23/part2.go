package main

import (
	"fmt"
	"strings"
	"time"
)

var parsedLines [][]string
var junctions = map[string]Coords{}
var mappedJunctions = map[string]bool{}

var largestPath = 0

type Node struct {
	Value  string
	Coords Coords
}

type Graph struct {
	Nodes []*Node
	Edges map[Node]map[Node]int
}

func (g *Graph) AddNode(node *Node) {
	g.Nodes = append(g.Nodes, node)
}

func (g *Graph) AddEdge(node1, node2 *Node, weight int) {
	if g.Edges == nil {
		g.Edges = make(map[Node]map[Node]int)
	}

	if _, ok := g.Edges[*node1]; !ok {
		g.Edges[*node1] = make(map[Node]int)
	}
	g.Edges[*node1][*node2] = weight

	// Add the reverse edge for undirected graph
	if _, ok := g.Edges[*node2]; !ok {
		g.Edges[*node2] = make(map[Node]int)
	}
	g.Edges[*node2][*node1] = weight
}

// EdgeExists checks if there is an undirected edge between node1 and node2.
func (g *Graph) EdgeExists(node1, node2 *Node) bool {
	// Check if there's an edge from node1 to node2
	if _, ok := g.Edges[*node1]; ok {
		if _, ok := g.Edges[*node1][*node2]; ok {
			return true
		}
	}

	// Since it's an undirected graph, also check if there's an edge from node2 to node1
	if _, ok := g.Edges[*node2]; ok {
		if _, ok := g.Edges[*node2][*node1]; ok {
			return true
		}
	}

	return false
}

var largestWeight = 0

func (g *Graph) FindLargestPath(current, end Node, currWeight int, visited map[Node]bool) {
	visited[current] = true
	if current == end {
		if currWeight > largestWeight {
			largestWeight = currWeight
		}
		return
	}
	for neighbor, weight := range g.Edges[current] {
		if !visited[neighbor] {
			g.FindLargestPath(neighbor, end, currWeight+weight, cloneMap(visited))
		}
	}
}

func main() {
	defer timer("Day 23")()
	for i := range lines {
		split := strings.Split(lines[i], "")
		parsedLines = append(parsedLines, split)
	}

	findJunctions(Coords{Y: 0, X: 1}, map[string]bool{})

	junctionGraph := Graph{}
	for j, coords := range junctions {
		node := Node{Value: j, Coords: coords}
		junctionGraph.AddNode(&node)
	}

	startNodeKey := fmt.Sprintf("%d-%d", 0, 1)
	startNode := Node{Value: startNodeKey, Coords: Coords{Y: 0, X: 1}}
	endNodeKey := fmt.Sprintf("%d-%d", len(parsedLines)-1, len(parsedLines[0])-2)
	endNode := Node{Value: endNodeKey, Coords: Coords{Y: len(parsedLines) - 1, X: len(parsedLines[0]) - 2}}
	junctionGraph.AddNode(&startNode)
	junctionGraph.AddNode(&endNode)

	for _, node := range junctionGraph.Nodes {
		for _, node2 := range junctionGraph.Nodes {
			if node.Value != node2.Value && !junctionGraph.EdgeExists(node, node2) {
				weight := 0
				findPath(node.Coords, node2.Coords, []Coords{}, map[string]bool{}, &weight)
				if weight > 0 {
					junctionGraph.AddEdge(node, node2, weight)
				}
			}
		}
	}

	start := map[Node]bool{startNode: true}
	junctionGraph.FindLargestPath(startNode, endNode, 0, start)

	fmt.Printf("\nLargest path %+v", largestWeight)
}

type Coords struct {
	Y int
	X int
}

func findJunctions(coords Coords, visited map[string]bool) {
	key := fmt.Sprintf("%d-%d", coords.Y, coords.X)
	visited[key] = true

	if IsJunction(coords) {
		jKey := fmt.Sprintf("%d-%d", coords.Y, coords.X)
		junctions[jKey] = coords
	}

	neighbors := getNeighbors(coords)
	for i := range neighbors {
		n := neighbors[i]
		nKey := fmt.Sprintf("%d-%d", n.Y, n.X)
		if ok, _ := visited[nKey]; !ok {
			findJunctions(n, visited)
		}
	}
}

func findPath(coords Coords, endCoords Coords, path []Coords, visited map[string]bool, weight *int) {
	key := fmt.Sprintf("%d-%d", coords.Y, coords.X)
	visited[key] = true

	_, isJn := junctions[key]
	if isJn && len(path) > 1 && (coords.Y != endCoords.Y || coords.X != endCoords.X) {
		return
	}

	if coords.Y == endCoords.Y && coords.X == endCoords.X {
		pathLen := len(path)
		*weight = pathLen
		return
	}

	neighbors := getNeighbors(coords)
	for i := range neighbors {
		n := neighbors[i]
		nKey := fmt.Sprintf("%d-%d", n.Y, n.X)
		_, alreadyVisited := visited[nKey]
		if !alreadyVisited {
			newPath := []Coords{{Y: n.Y, X: n.X}}
			newPath = append(newPath, path...)
			findPath(n, endCoords, newPath, visited, weight)
		}
	}
}

func getNeighbors(coords Coords) []Coords {
	var neighbors []Coords
	if IsInBounds(coords.Y, coords.X-1) && parsedLines[coords.Y][coords.X-1] != "#" {
		neighbors = append(neighbors, Coords{Y: coords.Y, X: coords.X - 1})
	}

	if IsInBounds(coords.Y, coords.X+1) && parsedLines[coords.Y][coords.X+1] != "#" {
		neighbors = append(neighbors, Coords{Y: coords.Y, X: coords.X + 1})
	}

	if IsInBounds(coords.Y-1, coords.X) && parsedLines[coords.Y-1][coords.X] != "#" {
		neighbors = append(neighbors, Coords{Y: coords.Y - 1, X: coords.X})
	}

	if IsInBounds(coords.Y+1, coords.X) && parsedLines[coords.Y+1][coords.X] != "#" {
		neighbors = append(neighbors, Coords{Y: coords.Y + 1, X: coords.X})
	}

	return neighbors
}

var validArrows = map[string]bool{
	"<": true,
	"v": true,
	">": true,
	"^": true,
}

func IsJunction(coords Coords) bool {
	neighbors := getNeighbors(coords)
	arrowcount := 0
	for _, n := range neighbors {
		if _, ok := validArrows[parsedLines[n.Y][n.X]]; ok {
			arrowcount += 1
		}
	}

	return arrowcount >= 3
}

func IsInBounds(row int, col int) bool {
	if row >= 0 && row < len(parsedLines) && col >= 0 && col < len(parsedLines[row]) {
		return true
	}
	return false
}

func cloneMap(originalMap map[Node]bool) map[Node]bool {
	newMap := make(map[Node]bool)

	for key, value := range originalMap {
		newMap[key] = value
	}

	return newMap
}

func timer(name string) func() {
	start := time.Now()
	return func() {
		fmt.Printf("\n%s took %v", name, time.Since(start))
	}
}
