import { Point } from '../point'
import * as rectangle from '../rectangle'

export interface CoodinatedRectangle {
  origin: Point
  size: rectangle.Rectangle
}

/**
 * getArea returns area of coodinatedrectangle
 * @param rect
 * @returns
 */
export const getArea = (rect: CoodinatedRectangle): number =>
  rectangle.getArea(rect.size)

/**
 * getVertecies returns vertecies of coodinatedrectangle
 * @param rect
 * @returns vertecies of coodinatedrectangle (top left, top right, bottom right, bottom left)
 */
export const getVertecies = (rect: CoodinatedRectangle): Point[] => {
  const { origin, size } = rect
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
  coodinatedrectangle: CoodinatedRectangle
): number => rectangle.getAspectRatio(coodinatedrectangle.size)

/**
 * create Coodinatedrectangle from rectangle
 * @param rect
 * @returns  Coodinatedrectangle
 */
export const fromRectangle = (
  rect: rectangle.Rectangle
): CoodinatedRectangle => ({
  origin: { x: 0, y: 0 },
  size: rect,
})

/**
 * containsPoint returns true if coodinatedrectangle contains point
 * @param rect
 * @param point
 * @returns true if coodinatedrectangle contains point
 */
export const containsPoint = (
  rect: CoodinatedRectangle,
  point: Point
): boolean => {
  const { x, y } = point
  const {
    origin: { x: x2, y: y2 },
    size: { width, height },
  } = rect
  const containsX = x2 < x && x < x2 + width
  const containsY = y2 < y && y < y2 + height
  return containsX && containsY
}

/**
 * overlaps returns true if coodinatedrectangle1 overlaps coodinatedrectangle2
 * @param rect1
 * @param rect2
 * @returns true if coodinatedrectangle1 overlaps coodinatedrectangle2
 */
export const overlaps = (
  rect1: CoodinatedRectangle,
  rect2: CoodinatedRectangle
): boolean => {
  const vertecies1 = getVertecies(rect1)
  for (const point of vertecies1) {
    if (containsPoint(rect2, point)) {
      return true
    }
  }
  return false
}

/**
 * rotate coodinatedrectangle 90 degree
 * @param rect
 * @returns coodinatedrectangle rotated 90 degree
 */
export const rotate = (rect: CoodinatedRectangle): CoodinatedRectangle => ({
  origin: {
    x: rect.origin.y,
    y: rect.origin.x,
  },
  size: {
    width: rect.size.height,
    height: rect.size.width,
  },
})
