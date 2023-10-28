import * as coordinateSquare from '../coordinated_square'
import * as square from '../square'

import {
  divideCoordinatedSquareVertiacally,
  divideCoordinatedSquareHorizontally,
  divideCoordinatedSquareByAspectRatio,
} from '.'

const sum = (arr: number[]): number => arr.reduce((a, b) => a + b, 0)

test('divideCoordinatedSquareVertiacally', () => {
  // When divided vertically, the width of the divided area is the same as the width of the original area.
  const baseSize = { width: 180, height: 100 }
  const weights = [3, 2, 1]
  const dividedAreas = divideCoordinatedSquareVertiacally(baseSize, weights)
  const expected = [
    { origin: { x: 0, y: 0 }, size: { width: 90, height: 100 } },
    { origin: { x: 90, y: 0 }, size: { width: 60, height: 100 } },
    { origin: { x: 150, y: 0 }, size: { width: 30, height: 100 } },
  ]
  expect(dividedAreas).toEqual(expected)
  testBasis({ baseSize, weights, dividedAreas })
})

test('divideCoordinatedSquareHorizontally', () => {
  // When divided horizontally, the height of the divided area is the same as the height of the original area.
  const baseSize = { width: 100, height: 180 }
  const weights = [3, 2, 1]
  const dividedAreas = divideCoordinatedSquareHorizontally(baseSize, weights)
  const expected = [
    { origin: { x: 0, y: 0 }, size: { width: 100, height: 90 } },
    { origin: { x: 0, y: 90 }, size: { width: 100, height: 60 } },
    { origin: { x: 0, y: 150 }, size: { width: 100, height: 30 } },
  ]
  expect(dividedAreas).toEqual(expected)
  testBasis({ baseSize, weights, dividedAreas })
})

test('divideCoordinatedSquareByAspectRatio', () => {
  const baseSize = { width: 180, height: 180 }
  const weights = [3, 2, 1]
  const result = divideCoordinatedSquareByAspectRatio(baseSize, weights, 2.0)
  const expected = [
    { origin: { x: 0, y: 0 }, size: { width: 180, height: 90 } },
    { origin: { x: 0, y: 90 }, size: { width: 120, height: 90 } },
    { origin: { x: 120, y: 90 }, size: { width: 60, height: 90 } },
  ]
  expect(result).toEqual(expected)
  testBasis({ baseSize, weights, dividedAreas: result })
})

const testBasis = (items: {
  baseSize: square.Square
  weights: number[]
  dividedAreas: coordinateSquare.CoodinatedSquare[]
}) => {
  const { baseSize, weights, dividedAreas } = items
  // The sum of the weights is the same as the length of the weights.
  testSameLength({ weights, dividedAreas })
  // The sum of the divided area is the same as the original area.
  testSameArea({ baseSize, weights, dividedAreas })
  // The width of the divided area is proportional to the weight.
  testSameWeight({ weights, dividedAreas })
  // The divided areas do not overlap.
  testNoOverlaps(dividedAreas)
}

/**
 * The divided areas do not overlap.
 * @param dividedAreas
 */
const testNoOverlaps = (dividedAreas: coordinateSquare.CoodinatedSquare[]) => {
  // The divided areas do not overlap.
  for (const [i, dividedArea1] of dividedAreas.entries()) {
    for (const [j, dividedArea2] of dividedAreas.entries()) {
      if (i === j) {
        continue
      }
      expect(coordinateSquare.overlaps(dividedArea1, dividedArea2)).toBe(false)
    }
  }
}

/**
 * The sum of the divided area is the same as the original area.
 * @param items
 */
const testSameArea = (items: {
  baseSize: square.Square
  weights: number[]
  dividedAreas: coordinateSquare.CoodinatedSquare[]
}) => {
  // The sum of the divided area is the same as the original area.
  const { baseSize, dividedAreas } = items
  const tobeArea = square.getArea(baseSize)

  const sumOfArea = sum(dividedAreas.map((d) => square.getArea(d.size)))
  expect(sumOfArea).toEqual(tobeArea)
}

/**
 * The sum of the weights is the same as the length of the weights.
 * @param items
 */
const testSameLength = (items: {
  weights: number[]
  dividedAreas: coordinateSquare.CoodinatedSquare[]
}) => {
  const { weights, dividedAreas } = items
  expect(dividedAreas.length).toEqual(weights.length)
}

/**
 * The width of the divided area is proportional to the weight.
 * @param items
 */
const testSameWeight = (items: {
  weights: number[]
  dividedAreas: coordinateSquare.CoodinatedSquare[]
}) => {
  // The sum of the weights is the same as the length of the weights.
  const { weights, dividedAreas } = items
  const sumOfArea = sum(dividedAreas.map((d) => square.getArea(d.size)))
  const sumOfWeights = sum(weights)

  for (const [i, weight] of weights.entries()) {
    // The width of the divided area is proportional to the weight.
    expect(weight / sumOfWeights).toEqual(
      square.getArea(dividedAreas[i].size) / sumOfArea
    )
  }
}
