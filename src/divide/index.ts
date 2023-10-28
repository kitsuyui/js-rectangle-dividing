import * as coordinateSquare from '../coordinated_square'
import * as square from '../square'

const sum = (arr: number[]): number => arr.reduce((a, b) => a + b, 0)
const getTotalWeight = (weights: number[]) => sum(weights)

export const divideAreaVertically = (
  size: square.Square,
  weights: number[]
): coordinateSquare.CoodinatedSquare[] => {
  // Divide area into n parts (weights.length) by weights (big weight has big area)
  const totalWeight = getTotalWeight(weights)
  const { width, height } = size
  // split vertically only
  const divided = []
  let x = 0
  for (const weight of weights) {
    const itemWidth = (width * weight) / totalWeight
    divided.push({
      origin: { x, y: 0 },
      size: { width: itemWidth, height },
    })
    x += itemWidth
  }
  return divided
}

export const divideAreaHorizontally = (
  size: square.Square,
  weights: number[]
): coordinateSquare.CoodinatedSquare[] => {
  return divideAreaVertically(square.rotate(size), weights).map(
    coordinateSquare.rotate
  )
}

export const divideAreaBoth = (
  size: square.Square,
  weights: number[],
  tobeAspectRatio: number = 1.78 // default 16:9 = 1.78
): coordinateSquare.CoodinatedSquare[] => {
  // Divide area into n parts (weights.length) by weights (big weight has big area)
  const { width, height } = size
  const totalWeight = getTotalWeight(weights)
  const totalArea = width * height
  const areaPerWeight = totalArea / totalWeight
  const inAreas: coordinateSquare.CoodinatedSquare[] = []
  let remainArea = { width, height, x: 0, y: 0 }
  const remainWeights = weights.slice() // copy
  while (remainWeights.length > 0) {
    const { width, height, x, y } = remainArea
    const splitVertical = width > height
    const pickedWeights: number[] = []

    while (remainWeights.length > 0) {
      pickedWeights.push(remainWeights.shift()!)
      const pickedWeightsTotal = sum(pickedWeights)
      const allocatedArea = pickedWeightsTotal * areaPerWeight
      const allocatedWidth = splitVertical ? allocatedArea / height : width
      const allocatedHeight = splitVertical ? height : allocatedArea / width
      if (
        Math.max(allocatedWidth, allocatedHeight * tobeAspectRatio) /
          Math.min(allocatedWidth, allocatedHeight * tobeAspectRatio) <
        pickedWeights.length + 1
      ) {
        break
      }
    }
    const pickedWeightsTotal = sum(pickedWeights)
    const allocatedArea = pickedWeightsTotal * areaPerWeight
    const allocatedWidth = splitVertical ? allocatedArea / height : width
    const allocatedHeight = splitVertical ? height : allocatedArea / width
    const splitInAllocatedArea = allocatedWidth > allocatedHeight
    let x2 = remainArea.x
    let y2 = remainArea.y
    for (const pickedWeight of pickedWeights) {
      const w = (allocatedWidth * pickedWeight) / pickedWeightsTotal
      const h = (allocatedHeight * pickedWeight) / pickedWeightsTotal
      inAreas.push({
        origin: {
          x: splitInAllocatedArea ? x2 : x,
          y: splitInAllocatedArea ? y : y2,
        },
        size: {
          width: splitInAllocatedArea ? w : allocatedWidth,
          height: splitInAllocatedArea ? allocatedHeight : h,
        },
      })
      if (splitInAllocatedArea) {
        x2 += w
      } else {
        y2 += h
      }
    }
    remainArea = {
      width: splitVertical ? width - allocatedWidth : width,
      height: splitVertical ? height : height - allocatedHeight,
      x: splitVertical ? x + allocatedWidth : x,
      y: splitVertical ? y : y + allocatedHeight,
    }
  }
  return inAreas
}
