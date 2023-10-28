import * as coordinateRectangle from '../coordinated_rectangle'
import * as rectangle from '../rectangle'

const sum = (arr: number[]): number => arr.reduce((a, b) => a + b, 0)
const getTotalWeight = (weights: number[]) => sum(weights)

/**
 * divideAreaVertically divides area vertically
 * @param size
 * @param weights
 * @returns divided area
 */
export const divideCoordinatedrectangleVertiacally = (
  size: rectangle.Rectangle,
  weights: number[]
): coordinateRectangle.CoodinatedRectangle[] => {
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

export const divideCoordinatedrectangleHorizontally = (
  size: rectangle.Rectangle,
  weights: number[]
): coordinateRectangle.CoodinatedRectangle[] => {
  return divideCoordinatedrectangleVertiacally(
    rectangle.rotate(size),
    weights
  ).map(coordinateRectangle.rotate)
}

export const divideCoordinatedrectangleByAspectRatio = (params: {
  size: rectangle.Rectangle
  weights: number[]
  tobeAspectRatio?: number // default 16:9 = 1.78
  direction?: 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom' // default left-top
}): coordinateRectangle.CoodinatedRectangle[] => {
  const tobeAspectRatio = params.tobeAspectRatio || 1.78
  const direction = params.direction || 'left-top'
  const { width, height } = params.size
  const base = divideCoordinatedrectangleByAspectRatioBase(
    { width, height },
    params.weights,
    tobeAspectRatio
  )
  switch (direction) {
    case 'right-top':
      return base.map((item) => ({
        origin: {
          x: width - item.origin.x - item.size.width,
          y: item.origin.y,
        },
        size: item.size,
      }))
    case 'left-bottom':
      return base.map((item) => ({
        origin: {
          x: item.origin.x,
          y: height - item.origin.y - item.size.height,
        },
        size: item.size,
      }))
    case 'right-bottom':
      return base.map((item) => ({
        origin: {
          x: width - item.origin.x - item.size.width,
          y: height - item.origin.y - item.size.height,
        },
        size: item.size,
      }))
    default:
      return base
  }
}

const divideCoordinatedrectangleByAspectRatioBase = (
  size: rectangle.Rectangle,
  weights: number[],
  tobeAspectRatio: number = 1.78 // default 16:9 = 1.78
): coordinateRectangle.CoodinatedRectangle[] => {
  // Divide area into n parts (weights.length) by weights (big weight has big area)
  const { width, height } = size
  const totalWeight = getTotalWeight(weights)
  const totalArea = width * height
  const areaPerWeight = totalArea / totalWeight
  const inAreas: coordinateRectangle.CoodinatedRectangle[] = []
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
