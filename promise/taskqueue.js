class TaskQueue {
  constructor() {
    this.queue = []
    this.running = false
  }
  _addTask(task) {
    if (this.running == true) {
      this.queue.push(task)
    } else {
      this.running = true
      task(this._nextTask()) 
    }
  }
  _nextTask() {
    if (this.queue.length > 0) {
      let task = this.queue.shift()
      task(this._nextTask())
    } else {
      this.running = false
    }
  }
}
