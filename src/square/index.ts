export interface Square {
  width: number
  height: number
}

/**
 * getArea returns area of square
 * @param square
 * @returns
 */
export const getArea = (square: Square): number => square.width * square.height

/**
 * getAspectRatio returns aspect ratio of square
 * @param square
 * @returns aspect ratio of square
 */
export const getAspectRatio = (square: Square): number =>
  square.width / square.height

/**
 * create Square from width and height
 * @param width
 * @param height
 * @returns Square
 */
export const rotate = (square: Square): Square => ({
  width: square.height,
  height: square.width,
})
