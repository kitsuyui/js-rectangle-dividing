import {
  getVertecies,
  getArea,
  containsPoint,
  getAspectRatio,
  overlaps,
} from '.'

describe('getArea', () => {
  it('returns the area of a rectangle', () => {
    const rect = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    expect(getArea(rect)).toBe(50)
  })
})

describe('getVertecies', () => {
  it('returns the vertecies of a rectangle', () => {
    const rect = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const expected = [
      { x: 0, y: 0 }, // top left
      { x: 5, y: 0 }, // top right
      { x: 5, y: 10 }, // bottom right
      { x: 0, y: 10 }, // bottom left
    ]
    const asis = getVertecies(rect)
    expect(asis).toEqual(expected)
    expect(asis.length).toBe(4)
  })
})

describe('getAspectRatio', () => {
  it('returns the aspect ratio of a rectangle', () => {
    const rect = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    expect(getAspectRatio(rect)).toBe(0.5)
  })
})

describe('containsPoint', () => {
  it('returns true if the point is in the rectangle', () => {
    const rect = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const point = { x: 2, y: 5 }
    expect(containsPoint(rect, point)).toBe(true)
  })
  it('returns false if the point is not in the rectangle', () => {
    const rect = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const point = { x: 6, y: 5 }
    expect(containsPoint(rect, point)).toBe(false)
  })
})

describe('overlaps', () => {
  it('returns true if the two rectangles overlap', () => {
    const rect = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const otherRect = {
      origin: { x: 2, y: 5 },
      size: { width: 5, height: 10 },
    }
    // ovelaps is commutative
    expect(overlaps(rect, otherRect)).toBe(true)
    expect(overlaps(otherRect, rect)).toBe(true)
  })

  it('returns false if the two rectangles do not overlap', () => {
    const rect = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const otherRect = {
      origin: { x: 6, y: 5 },
      size: { width: 5, height: 10 },
    }
    // ovelaps is commutative
    expect(overlaps(rect, otherRect)).toBe(false)
    expect(overlaps(otherRect, rect)).toBe(false)
  })
})
