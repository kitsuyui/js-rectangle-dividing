export interface rectangle {
  width: number
  height: number
}

/**
 * getArea returns area of rectangle
 * @param rectangle
 * @returns
 */
export const getArea = (rectangle: rectangle): number =>
  rectangle.width * rectangle.height

/**
 * getAspectRatio returns aspect ratio of rectangle
 * @param rectangle
 * @returns aspect ratio of rectangle
 */
export const getAspectRatio = (rectangle: rectangle): number =>
  rectangle.width / rectangle.height

/**
 * create rectangle from width and height
 * @param width
 * @param height
 * @returns rectangle
 */
export const rotate = (rectangle: rectangle): rectangle => ({
  width: rectangle.height,
  height: rectangle.width,
})
