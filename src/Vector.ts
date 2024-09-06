export default class Vector2 {
  x: number
  y: number

  constructor(x: number, y?: number) {
    this.x = x || 0
    this.y = y || 0
  }

  toString() {
    return `vector Object: [${this.x}, ${this.y}]`
  }

  copy() {
    return new Vector2(this.x, this.y)
  }

  add(x: number | Vector2, y?: number) {
    if (x instanceof Vector2) {
      this.x += x.x || 0
      this.y += x.y || 0
      return this
    }
    this.x += x || 0
    this.y += y || 0
    return this
  }

  sub(x: number | Vector2, y?: number) {
    if (x instanceof Vector2) {
      this.x -= x.x || 0
      this.y -= x.y || 0
      return this
    }
    this.x -= x || 0
    this.y -= y || 0
    return this
  }

  mult(...args: Array<number>) {
    let [x, y] = args
    if (args.length === 1) {
      this.x *= x
      this.y *= x
    }
    if (args.length === 2) {
      this.x *= x
      this.y *= y
    }
    return this
  }

  div(...args: Array<number>) {
    let [x, y] = args
    if (args.length === 1) {
      this.x /= x || 1
      this.y /= x || 1
    }
    if (args.length === 2) {
      this.x /= x || 1
      this.y /= y || 1
    }
    return this
  }

  mag() {
    return Math.sqrt(this.magSq())
  }

  magSq() {
    const x = this.x
    const y = this.y
    return x * x + y * y
  }

  dot(x: number | Vector2, y: number): number {
    if (x instanceof Vector2) {
      return this.dot(x.x, x.y)
    }
    return this.x * (x || 0) + this.y * (y || 0)
  }

  dist(v: Vector2) {
    return v.copy().sub(this).mag()
  }

  normalize() {
    const len = this.mag()
    if (len !== 0) this.mult(1 / len)
    return this;
  }

  limit(max: number) {
    const mSq = this.magSq();
    if (mSq > max * max) {
      this.div(Math.sqrt(mSq)).mult(max);
    }
    return this;
  }

  setMag(n: number) {
    return this.normalize().mult(n)
  }

  lerp(x: number | Vector2, y?: number, amt?: number): Vector2 {
    if (x instanceof Vector2) {
      return this.lerp(x.x, x.y, y);
    }
    this.x += (x - this.x) * (amt || 0)
    this.y += (x - this.y) * (amt || 0)
    return this
  }

  equals(x: number | Vector2, y?: number) {
    let a, b
    if (x instanceof Vector2) {
      a = x.x;
      b = x.y;
    }
    else {
      a = x
      b = y
    }
    return this.x === a && this.y === b
  }
}
