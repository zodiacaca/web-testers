
const devices = ['mouse']

// mouse
document.addEventListener('mousemove', function(e) {
  if (charts.mouse.active) {
    const interval = performance.now() - data.mouse.timeStamp
    if (interval < 2000) {
      data.mouse.samples.push(interval)
    }
    logs.mouse.innerText = `
      Screen X/Y: ${e.screenX}, ${e.screenY}
      Client X/Y: ${e.clientX}, ${e.clientY}
      Last interval: ${interval}`

    data.mouse.timeStamp = performance.now()
  }
})
