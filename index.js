class Queue {
  constructor() {
    this._requestId = null
    this._tasks = new Set()
  }

  run() {
    this._requestId = requestAnimationFrame(this._tick)
  }

  stop() {
    cancelAnimationFrame(this._requestId)
  }

  add(task) {
    this._tasks.add(task)
    if (this._tasks.size === 1) {
      this.run()
    }
  }

  remove(task) {
    const deletedTask = this._tasks.delete(task)
    if (this._tasks.size === 0) {
      this.stop()
    }
    return deletedTask
  }

  destroy() {
    this.stop()
    this._tasks.clear()
  }

  _tick = (time) => {
    this._tasks.forEach(task => task(time))
    if (this._tasks.size > 0) {
      this.run()
    }
  }
}

export { Queue }
export default new Queue