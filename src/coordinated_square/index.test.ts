import {
  getVertecies,
  getArea,
  containsPoint,
  getAspectRatio,
  overlaps,
} from '.'

describe('getArea', () => {
  it('returns the area of a square', () => {
    const coodinatedSquare = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    expect(getArea(coodinatedSquare)).toBe(50)
  })
})

describe('getVertecies', () => {
  it('returns the vertecies of a square', () => {
    const coodinatedSquare = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const expected = [
      { x: 0, y: 0 }, // top left
      { x: 5, y: 0 }, // top right
      { x: 5, y: 10 }, // bottom right
      { x: 0, y: 10 }, // bottom left
    ]
    expect(getVertecies(coodinatedSquare)).toEqual(expected)
  })
})

describe('getAspectRatio', () => {
  it('returns the aspect ratio of a square', () => {
    const coodinatedSquare = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    expect(getAspectRatio(coodinatedSquare)).toBe(0.5)
  })
})

describe('containsPoint', () => {
  it('returns true if the point is in the square', () => {
    const coodinatedSquare = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const point = { x: 2, y: 5 }
    expect(containsPoint(coodinatedSquare, point)).toBe(true)
  })
  it('returns false if the point is not in the square', () => {
    const coodinatedSquare = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const point = { x: 6, y: 5 }
    expect(containsPoint(coodinatedSquare, point)).toBe(false)
  })
})

describe('overlaps', () => {
  it('returns true if the two squares overlap', () => {
    const coodinatedSquare = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const otherCoodinatedSquare = {
      origin: { x: 2, y: 5 },
      size: { width: 5, height: 10 },
    }
    // ovelaps is commutative
    expect(overlaps(coodinatedSquare, otherCoodinatedSquare)).toBe(true)
    expect(overlaps(otherCoodinatedSquare, coodinatedSquare)).toBe(true)
  })

  it('returns false if the two squares do not overlap', () => {
    const coodinatedSquare = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const otherCoodinatedSquare = {
      origin: { x: 6, y: 5 },
      size: { width: 5, height: 10 },
    }
    // ovelaps is commutative
    expect(overlaps(coodinatedSquare, otherCoodinatedSquare)).toBe(false)
    expect(overlaps(otherCoodinatedSquare, coodinatedSquare)).toBe(false)
  })
})
