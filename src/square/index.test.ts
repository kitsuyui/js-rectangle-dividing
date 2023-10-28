import { getArea, getAspectRatio, rotate } from '.'

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

describe('rotate', () => {
  it('returns a rotated square', () => {
    const square = { width: 5, height: 10 }
    const expected = { width: 10, height: 5 }
    expect(rotate(square)).toEqual(expected)
  })
})
