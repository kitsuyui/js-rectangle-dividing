import {
  getVertecies,
  getArea,
  containsPoint,
  getAspectRatio,
  overlaps,
} from '.'

describe('getArea', () => {
  it('returns the area of a rectangle', () => {
    const coodinatedrectangle = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    expect(getArea(coodinatedrectangle)).toBe(50)
  })
})

describe('getVertecies', () => {
  it('returns the vertecies of a rectangle', () => {
    const coodinatedrectangle = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const expected = [
      { x: 0, y: 0 }, // top left
      { x: 5, y: 0 }, // top right
      { x: 5, y: 10 }, // bottom right
      { x: 0, y: 10 }, // bottom left
    ]
    const asis = getVertecies(coodinatedrectangle)
    expect(asis).toEqual(expected)
    expect(asis.length).toBe(4)
  })
})

describe('getAspectRatio', () => {
  it('returns the aspect ratio of a rectangle', () => {
    const coodinatedrectangle = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    expect(getAspectRatio(coodinatedrectangle)).toBe(0.5)
  })
})

describe('containsPoint', () => {
  it('returns true if the point is in the rectangle', () => {
    const coodinatedrectangle = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const point = { x: 2, y: 5 }
    expect(containsPoint(coodinatedrectangle, point)).toBe(true)
  })
  it('returns false if the point is not in the rectangle', () => {
    const coodinatedrectangle = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const point = { x: 6, y: 5 }
    expect(containsPoint(coodinatedrectangle, point)).toBe(false)
  })
})

describe('overlaps', () => {
  it('returns true if the two rectangles overlap', () => {
    const coodinatedrectangle = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const otherCoodinatedrectangle = {
      origin: { x: 2, y: 5 },
      size: { width: 5, height: 10 },
    }
    // ovelaps is commutative
    expect(overlaps(coodinatedrectangle, otherCoodinatedrectangle)).toBe(true)
    expect(overlaps(otherCoodinatedrectangle, coodinatedrectangle)).toBe(true)
  })

  it('returns false if the two rectangles do not overlap', () => {
    const coodinatedrectangle = {
      origin: { x: 0, y: 0 },
      size: { width: 5, height: 10 },
    }
    const otherCoodinatedrectangle = {
      origin: { x: 6, y: 5 },
      size: { width: 5, height: 10 },
    }
    // ovelaps is commutative
    expect(overlaps(coodinatedrectangle, otherCoodinatedrectangle)).toBe(false)
    expect(overlaps(otherCoodinatedrectangle, coodinatedrectangle)).toBe(false)
  })
})
