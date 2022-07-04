let requestId
const tasks = new Set()
const hiddenTasks = new Set()

function run() {
  requestId = requestAnimationFrame(tick)
}

function stop() {
  cancelAnimationFrame(requestId)
}

function add(task) {
  tasks.add(task)
  if (tasks.size === 1) run()
}

function remove(task) {
  const deletedTask = tasks.delete(task)
  if (tasks.size === 0) stop()
  return deletedTask
}

function clear() {
  stop()
  tasks.clear()
  hiddenTasks.clear()
}

function tick(time) {
  tasks.forEach(task => task.tick(time))
  if (tasks.size > 0) run()
}

function hide(task) {
  if (remove(task)) {
    hiddenTasks.add(task)
  }
}

function restore(task) {
  task.startTime = performance.now() - task.progress * task.duration
  add(task)
}

function hideAll() {
  tasks.forEach(hide)
}

function restoreAll() {
  hiddenTasks.forEach(task => {
    hiddenTasks.delete(task)
    restore(task)
  })
}

document.addEventListener('visibilitychange', () => {
  ({
    'hidden': hideAll,
    'visible': restoreAll
  })[document.visibilityState]()
})

export {
  run,
  stop,
  add,
  remove,
  clear,
  restore
}