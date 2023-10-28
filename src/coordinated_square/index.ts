import { Point } from '../point'
import {
  Square,
  getArea as getSquareArea,
  getAspectRatio as getSquareAspectRatio,
} from '../square'

export interface CoodinatedSquare {
  origin: Point
  size: Square
}

export const getArea = (coodinatedSquare: CoodinatedSquare): number =>
  getSquareArea(coodinatedSquare.size)

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

export const getAspectRatio = (coodinatedSquare: CoodinatedSquare): number =>
  getSquareAspectRatio(coodinatedSquare.size)

export const fromSquare = (square: Square): CoodinatedSquare => ({
  origin: { x: 0, y: 0 },
  size: square,
})

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
