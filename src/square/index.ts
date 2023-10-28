export interface Square {
  width: number
  height: number
}

export const getArea = (square: Square): number => square.width * square.height
export const getAspectRatio = (square: Square): number =>
  square.width / square.height
export const rotate = (square: Square): Square => ({
  width: square.height,
  height: square.width,
})
