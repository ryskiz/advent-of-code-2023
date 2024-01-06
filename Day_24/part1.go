package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	lines, _ := ReadInput("./Day_24/input.txt")
	numLines := 0
	for i := 0; i < len(lines); i++ {
		y, x, changeInX, slope := getParsedLine(lines[i])
		yIntercept := getYIntercept(slope, y, x)
		for j := i + 1; j < len(lines); j++ {
			y2, x2, changeInX2, slope2 := getParsedLine(lines[j])
			y2Intercept := getYIntercept(slope2, y2, x2)
			xIntersection := getXIntersection(y2Intercept, yIntercept, slope2, slope)
			yIntersection := getYIntersection(slope, xIntersection, yIntercept)
			if slope2 != slope {
				if isInRange(yIntersection, xIntersection) && lineWillIntersect(x, y, yIntersection, xIntersection, slope, changeInX) && lineWillIntersect(x2, y2, yIntersection, xIntersection, slope2, changeInX2) {
					numLines += 1
				}
			}
		}
	}

	fmt.Printf("\n Answer: %+v", numLines)
}

func getParsedLine(line string) (y float64, x float64, changeInX float64, slope float64) {
	split := strings.Split(line, " @ ")
	splitCoords := strings.Split(split[0], ", ")
	splitSlope := strings.Split(split[1], ", ")

	nx, _ := strconv.ParseFloat(strings.TrimSpace(splitCoords[0]), 64)
	ny, _ := strconv.ParseFloat(strings.TrimSpace(splitCoords[1]), 64)

	sRise, _ := strconv.Atoi(strings.TrimSpace(splitSlope[1]))
	sRun, _ := strconv.Atoi(strings.TrimSpace(splitSlope[0]))

	return ny, nx, float64(sRun), float64(sRise) / float64(sRun)
}

func getYIntercept(slope float64, y float64, x float64) float64 {
	return y - (slope * x)
}

func getXIntersection(b2, b1, m2, m1 float64) float64 {
	return (b2 - b1) / (m1 - m2)
}

func getYIntersection(slope1, xIntercept, yIntercept float64) float64 {
	return (slope1 * xIntercept) + yIntercept
}

func isInRange(y float64, x float64) bool {
	return x >= 200000000000000 && x <= 400000000000000 && y >= 200000000000000 && y <= 400000000000000
}

func lineWillIntersect(x, y, yIntersection, xIntersection, slope, changeInX float64) bool {
	if slope > 0 && xIntersection > x && changeInX > 0 { // positive slope
		return true
	}

	if slope > 0 && xIntersection < x && changeInX < 0 { // positive slope
		return true
	}

	if slope < 0 && xIntersection < x && changeInX < 0 {
		return true
	}

	if slope < 0 && xIntersection > x && changeInX > 0 {
		return true
	}

	return false
}

// ReadFileToSlice reads a file and returns its contents as a slice of strings.
func ReadInput(filename string) ([]string, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return lines, nil
}
