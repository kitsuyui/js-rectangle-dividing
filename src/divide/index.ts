import { coordinatedrectangle } from '..'
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
export const divideVertically = (
  size: rectangle.Rectangle,
  weights: number[],
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

/**
 * divideAreaHorizontally divides area horizontally
 * @param size
 * @param weights
 * @returns divided area
 */
export const divideHorizontally = (
  size: rectangle.Rectangle,
  weights: number[],
): coordinateRectangle.CoodinatedRectangle[] => {
  return divideVertically(rectangle.rotate(size), weights).map(
    coordinateRectangle.rotate,
  )
}

type AspectRatioDivideDirection =
  | 'left-top'
  | 'right-top'
  | 'left-bottom'
  | 'right-bottom'

/**
 * divideAreaByAspectRatio divides area by aspect ratio
 * @param size size of area
 * @param weights weights of each area
 * @param tobeAspectRatio default 16:9 = 1.78
 * @param direction default left-top
 * @returns divided area
 */
export const divideByAspectRatio = (params: {
  size: rectangle.Rectangle
  weights: number[]
  tobeAspectRatio?: number // default 16:9 = 1.78
  direction?: AspectRatioDivideDirection // default left-top
}): coordinateRectangle.CoodinatedRectangle[] => {
  const tobeAspectRatio = params.tobeAspectRatio || 1.78
  const direction = params.direction || 'left-top'
  const { width, height } = params.size
  const base = divideByAspectRatioBase(
    { width, height },
    params.weights,
    tobeAspectRatio,
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

const divideByAspectRatioBase = (
  size: rectangle.Rectangle,
  weights: number[],
  tobeAspectRatio = 1.78, // default 16:9 = 1.78
): coordinateRectangle.CoodinatedRectangle[] => {
  // Divide area into n parts (weights.length) by weights (big weight has big area)
  const dividedAreas = []
  let remainWeights = [...weights]
  let remainArea = coordinateRectangle.fromRectangle(size)
  while (remainWeights.length > 0) {
    const result = divideByAspectUntilAspectRatio(
      remainArea,
      remainWeights,
      tobeAspectRatio,
    )
    remainArea = result.remainArea
    remainWeights = result.remainWeights
    dividedAreas.push(...result.divided)
  }
  return dividedAreas
}

interface DividedResult {
  divided: coordinateRectangle.CoodinatedRectangle[]
  remainArea: coordinateRectangle.CoodinatedRectangle
  remainWeights: number[]
}

const divideByAspectUntilAspectRatio = (
  size: coordinatedrectangle.CoodinatedRectangle,
  weights: number[],
  tobeAspectRatio: number,
): DividedResult => {
  const divided: coordinateRectangle.CoodinatedRectangle[] = []
  const remainWeights = [...weights] // copy
  const { width, height } = size.size
  const totalWeight = getTotalWeight(weights)
  const totalArea = rectangle.getArea(size.size)
  const areaPerWeight = totalArea / totalWeight
  const totalAspectRatio = width / height
  const splitVertical = totalAspectRatio >= tobeAspectRatio

  const tobeAspectRatioInSplitDirection = splitVertical
    ? tobeAspectRatio
    : 1 / tobeAspectRatio
  const pickedWeights: number[] = []
  const constantSideLength = splitVertical ? height : width

  // pick weights until aspect ratio is over
  while (remainWeights.length > 0) {
    // biome-ignore lint/style/noNonNullAssertion: non-null check is done by while condition
    pickedWeights.push(remainWeights.shift()!)
    const pickedWeightsTotal = getTotalWeight(pickedWeights)
    const allocatedArea = pickedWeightsTotal * areaPerWeight
    const aspectRatioInDirection =
      allocatedArea / constantSideLength / constantSideLength
    const isAspectRatioOver =
      aspectRatioInDirection >= tobeAspectRatioInSplitDirection
    if (isAspectRatioOver) {
      break
    }
  }

  const pickedWeightsTotal = getTotalWeight(pickedWeights)
  const allocatedArea = pickedWeightsTotal * areaPerWeight
  const variableSideLength = allocatedArea / constantSideLength
  const cutWidth = splitVertical ? variableSideLength : constantSideLength
  const cutHeight = splitVertical ? constantSideLength : variableSideLength
  const { x, y } = size.origin
  let [dx, dy] = [0, 0]
  for (const pickedWeight of pickedWeights) {
    const pickedRatio = pickedWeight / pickedWeightsTotal
    const w = cutWidth * pickedRatio
    const h = cutHeight * pickedRatio
    divided.push({
      origin: {
        x: x + dx,
        y: y + dy,
      },
      size: {
        width: splitVertical ? w : cutWidth,
        height: splitVertical ? cutHeight : h,
      },
    })
    dx += splitVertical ? w : 0
    dy += splitVertical ? 0 : h
  }
  const remainArea = {
    size: {
      width: splitVertical ? width - cutWidth : width,
      height: splitVertical ? height : height - cutHeight,
    },
    origin: {
      x: splitVertical ? x + cutWidth : x,
      y: splitVertical ? y : y + cutHeight,
    },
  }
  return {
    divided,
    remainArea,
    remainWeights,
  }
}
