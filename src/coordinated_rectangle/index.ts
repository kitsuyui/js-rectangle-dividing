import { Point } from '../point'
import * as rectangle from '../rectangle'

export interface Coodinatedrectangle {
  origin: Point
  size: rectangle.rectangle
}

/**
 * getArea returns area of coodinatedrectangle
 * @param coodinatedrectangle
 * @returns
 */
export const getArea = (coodinatedrectangle: Coodinatedrectangle): number =>
  rectangle.getArea(coodinatedrectangle.size)

/**
 * getVertecies returns vertecies of coodinatedrectangle
 * @param coodinatedrectangle
 * @returns vertecies of coodinatedrectangle (top left, top right, bottom right, bottom left)
 */
export const getVertecies = (
  coodinatedrectangle: Coodinatedrectangle
): Point[] => {
  const { origin, size } = coodinatedrectangle
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
 * getAspectRatio returns aspect ratio of coodinatedrectangle
 * @param coodinatedrectangle
 * @returns aspect ratio of coodinatedrectangle
 */
export const getAspectRatio = (
  coodinatedrectangle: Coodinatedrectangle
): number => rectangle.getAspectRatio(coodinatedrectangle.size)

/**
 * create Coodinatedrectangle from rectangle
 * @param rectangle
 * @returns  Coodinatedrectangle
 */
export const fromrectangle = (
  rectangle: rectangle.rectangle
): Coodinatedrectangle => ({
  origin: { x: 0, y: 0 },
  size: rectangle,
})

/**
 * containsPoint returns true if coodinatedrectangle contains point
 * @param coordinatedrectangle
 * @param point
 * @returns true if coodinatedrectangle contains point
 */
export const containsPoint = (
  coordinatedrectangle: Coodinatedrectangle,
  point: Point
): boolean => {
  const { x, y } = point
  const {
    origin: { x: x2, y: y2 },
    size: { width, height },
  } = coordinatedrectangle
  const containsX = x2 < x && x < x2 + width
  const containsY = y2 < y && y < y2 + height
  return containsX && containsY
}

/**
 * overlaps returns true if coodinatedrectangle1 overlaps coodinatedrectangle2
 * @param coodinatedrectangle1
 * @param coodinatedrectangle2
 * @returns true if coodinatedrectangle1 overlaps coodinatedrectangle2
 */
export const overlaps = (
  coodinatedrectangle1: Coodinatedrectangle,
  coodinatedrectangle2: Coodinatedrectangle
): boolean => {
  const vertecies1 = getVertecies(coodinatedrectangle1)
  for (const point of vertecies1) {
    if (containsPoint(coodinatedrectangle2, point)) {
      return true
    }
  }
  return false
}

/**
 * rotate coodinatedrectangle 90 degree
 * @param coodinatedrectangle
 * @returns coodinatedrectangle rotated 90 degree
 */
export const rotate = (
  coodinatedrectangle: Coodinatedrectangle
): Coodinatedrectangle => ({
  origin: {
    x: coodinatedrectangle.origin.y,
    y: coodinatedrectangle.origin.x,
  },
  size: {
    width: coodinatedrectangle.size.height,
    height: coodinatedrectangle.size.width,
  },
})
