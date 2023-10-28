export interface Square {
  width: number
  height: number
}

export const getArea = (square: Square) => square.width * square.height
export const getAspectRatio = (square: Square) => square.width / square.height
