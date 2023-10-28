import { Point } from '../point'
import * as square from '../square'

export interface CoodinatedSquare {
  origin: Point
  size: square.Square
}

/**
 * getArea returns area of coodinatedSquare
 * @param coodinatedSquare
 * @returns
 */
export const getArea = (coodinatedSquare: CoodinatedSquare): number =>
  square.getArea(coodinatedSquare.size)

/**
 * getVertecies returns vertecies of coodinatedSquare
 * @param coodinatedSquare
 * @returns vertecies of coodinatedSquare (top left, top right, bottom right, bottom left)
 */
export const getVertecies = (coodinatedSquare: CoodinatedSquare): Point[] => {
  const { origin, size } = coodinatedSquare
  const { width, height } = size
  const { x, y } = origin
  return [
    { x, y }, // top left
    { x: x + width, y }, // top right
    { x: x + width, y: y + height }, // bottom right
    { x, y: y + height }, // bottom left
  ]
}

/**
 * getAspectRatio returns aspect ratio of coodinatedSquare
 * @param coodinatedSquare
 * @returns aspect ratio of coodinatedSquare
 */
export const getAspectRatio = (coodinatedSquare: CoodinatedSquare): number =>
  square.getAspectRatio(coodinatedSquare.size)

/**
 * create CoodinatedSquare from square
 * @param square
 * @returns  CoodinatedSquare
 */
export const fromSquare = (square: square.Square): CoodinatedSquare => ({
  origin: { x: 0, y: 0 },
  size: square,
})

/**
 * containsPoint returns true if coodinatedSquare contains point
 * @param coordinatedSquare
 * @param point
 * @returns true if coodinatedSquare contains point
 */
export const containsPoint = (
  coordinatedSquare: CoodinatedSquare,
  point: Point
): boolean => {
  const { x, y } = point
  const {
    origin: { x: x2, y: y2 },
    size: { width, height },
  } = coordinatedSquare
  const containsX = x2 < x && x < x2 + width
  const containsY = y2 < y && y < y2 + height
  return containsX && containsY
}

/**
 * overlaps returns true if coodinatedSquare1 overlaps coodinatedSquare2
 * @param coodinatedSquare1
 * @param coodinatedSquare2
 * @returns true if coodinatedSquare1 overlaps coodinatedSquare2
 */
export const overlaps = (
  coodinatedSquare1: CoodinatedSquare,
  coodinatedSquare2: CoodinatedSquare
): boolean => {
  const vertecies1 = getVertecies(coodinatedSquare1)
  for (const point of vertecies1) {
    if (containsPoint(coodinatedSquare2, point)) {
      return true
    }
  }
  return false
}

/**
 * rotate coodinatedSquare 90 degree
 * @param coodinatedSquare
 * @returns coodinatedSquare rotated 90 degree
 */
export const rotate = (
  coodinatedSquare: CoodinatedSquare
): CoodinatedSquare => ({
  origin: {
    x: coodinatedSquare.origin.y,
    y: coodinatedSquare.origin.x,
  },
  size: {
    width: coodinatedSquare.size.height,
    height: coodinatedSquare.size.width,
  },
})
