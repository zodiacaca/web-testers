// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const devices = ['mouse', 'kb', 'gp']
// data
const data = {
  mouse: {
    samples: [],
    timeStamp: performance.now()
  },
  kb: {
    samples: [],
    timeStamp: performance.now()
  },
  gp: {
    samples: [],
    timeStamp: performance.now()
  }
}
const charts = {
  max: 200,
  range: 20,
  mouse: {
    drawCount: 0,
    canvas: document.querySelector('#chart-mouse'),
    context: document.querySelector('#chart-mouse').getContext('2d')
  },
  kb: {
    drawCount: 0,
    canvas: document.querySelector('#chart-keyboard'),
    context: document.querySelector('#chart-keyboard').getContext('2d')
  },
  gp: {
    drawCount: 0,
    canvas: document.querySelector('#chart-gamepad'),
    context: document.querySelector('#chart-gamepad').getContext('2d')
  }
}
const logs = {
  mouse: document.querySelector('#screen-log-mouse'),
  kb: document.querySelector('#screen-log-keyboard'),
  gp: document.querySelector('#screen-log-gamepad')
}

const drawChart = (device) => {
  const canvas = charts[device].canvas
  const ctx = charts[device].context

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  charts[device].drawCount = 0

  const max = charts.max
  const range = charts.range
  const unit = canvas.height / range
  const offset = (data[device].samples.length - max) > 0 ? data[device].samples.length - max + 1 : 1

  ctx.beginPath()
  ctx.moveTo(0, unit * range / 2 - 0.5)
  ctx.lineTo(canvas.width, unit * range / 2 - 0.5)
  ctx.lineWidth = 1
  ctx.strokeStyle = `rgb(200, 200, 200)`
  ctx.stroke()

  data[device].samples.forEach((ntrvl) => {
    charts[device].drawCount++
    const pos = charts[device].drawCount - offset
    if (pos >= 0) {
      ntrvl = ntrvl * unit
      ctx.fillStyle = `rgb(150, 150, 150)`
      ctx.fillRect(2 + pos * 4, 200 - ntrvl, 2, ntrvl)
    }
  })
}

function draw(timeStamp) {
  devices.forEach((dvc) => {
    drawChart(dvc)
  })

  window.requestAnimationFrame(draw)
}
window.requestAnimationFrame(draw)

// mouse
document.addEventListener('mousemove', function(e) {
  const interval = performance.now() - data.mouse.timeStamp
  data.mouse.samples.push(interval)
  logs.mouse.innerText = `
    Screen X/Y: ${e.screenX}, ${e.screenY}
    Client X/Y: ${e.clientX}, ${e.clientY}
    Last interval: ${interval}`

  data.mouse.timeStamp = performance.now()
})

//keyboard
// document.addEventListener('keydown', function(e) {
//   logs.kb.innerText = `
//     Last interval: ${performance.now() - data.kb.timeStamp}`

//   data.kb.timeStamp = performance.now()
// })

document.addEventListener('keyup', function(e) {
  const interval = performance.now() - data.kb.timeStamp
  data.kb.samples.push(interval)
  logs.kb.innerText = `
    Last interval: ${interval / 8}`

  data.kb.timeStamp = performance.now()
})

//gamepad
let gp = null
window.addEventListener("gamepadconnected", (e) => {
  logs.gp.innerText = `
    ${e.gamepad.id}`

  gp = navigator.getGamepads()[e.gamepad.index]
})


// animation.addEventListener('animationstart', () => {

// })

// animation.addEventListener('animationiteration', () => {

// })

// animation.addEventListener('animationend', () => {

// })

// animation.addEventListener('animationcancel', () => {

// })
