import { getArea } from '.'
import { getAspectRatio } from '.'

describe('getArea', () => {
  it('returns the area of a square', () => {
    const square = { width: 5, height: 10 }
    expect(getArea(square)).toBe(50)
  })
})

describe('getAspectRatio', () => {
  it('returns the aspect ratio of a square', () => {
    const square = { width: 5, height: 10 }
    expect(getAspectRatio(square)).toBe(0.5)
  })
})
