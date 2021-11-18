// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// data
const data = {
  mouse: {
    count: 0,
    timeStamp: performance.now()
  },
  kb: {
    count: 0,
    timeStamp: performance.now()
  },
  gp: {
    count: 0,
    timeStamp: performance.now()
  }
}
const logs = {
  mouse: document.querySelector('#screen-log-mouse'),
  kb: document.querySelector('#screen-log-keyboard'),
  gp: document.querySelector('#screen-log-gamepad')
}
const charts = {
  mouse: new JSC.Chart("chart-mouse", {}),
  kb: new JSC.Chart("chart-keyboard", {})
}

// mouse
charts.mouse.options({
  series: [{
    name: "Intervals"
  }],
  yAxis: {
    scale: {
      range: [0, 10]
    }
  }
})
document.addEventListener('mousemove', function(e) {
  data.mouse.count += 1
  const interval = performance.now() - data.mouse.timeStamp
  logs.mouse.innerText = `
    Screen X/Y: ${e.screenX}, ${e.screenY}
    Client X/Y: ${e.clientX}, ${e.clientY}
    Last interval: ${interval}`
  charts.mouse.series(0).points.add({x: data.mouse.count, y: interval})

  data.mouse.timeStamp = performance.now()
})

//keyboard
charts.kb.options({
  series: [{
    name: "Durations"
  }],
  yAxis: {
    scale: {
      range: [0, 10]
    }
  }
})
document.addEventListener('keydown', function(e) {
  logs.kb.innerText = `
    Last interval: ${performance.now() - data.kb.timeStamp}`

  data.kb.timeStamp = performance.now()
})

document.addEventListener('keyup', function(e) {
  counts.kb += 1
  const duration = performance.now() - data.kb.timeStamp
  logs.kb.innerText = `
    Last duration: ${duration / 8}`
  charts.kb.series(0).points.add({x: counts.kb, y: duration / 8})

  data.kb.timeStamp = performance.now()
})

//gamepad
window.addEventListener("gamepadconnected", (e) => {
  logs.gp.innerText = `
    ${e.gamepad.id}`

  data.gp.timeStamp = e.gamepad.timestamp
})
