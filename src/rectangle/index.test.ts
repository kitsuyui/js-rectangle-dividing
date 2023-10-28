import { getArea, getAspectRatio, rotate } from '.'

describe('getArea', () => {
  it('returns the area of a rectangle', () => {
    const rectangle = { width: 5, height: 10 }
    expect(getArea(rectangle)).toBe(50)
  })
})

describe('getAspectRatio', () => {
  it('returns the aspect ratio of a rectangle', () => {
    const rectangle = { width: 5, height: 10 }
    expect(getAspectRatio(rectangle)).toBe(0.5)
  })
})

describe('rotate', () => {
  it('returns a rotated rectangle', () => {
    const rectangle = { width: 5, height: 10 }
    const expected = { width: 10, height: 5 }
    expect(rotate(rectangle)).toEqual(expected)
  })
})
