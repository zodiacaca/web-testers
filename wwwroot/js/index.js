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
    button: document.querySelector('#button-mouse'),
    active: false,
    canvas: document.querySelector('#chart-mouse'),
    context: document.querySelector('#chart-mouse').getContext('2d')
  },
  kb: {
    drawCount: 0,
    button: document.querySelector('#button-keyboard'),
    active: false,
    canvas: document.querySelector('#chart-keyboard'),
    context: document.querySelector('#chart-keyboard').getContext('2d')
  },
  gp: {
    drawCount: 0,
    button: document.querySelector('#button-gamepad'),
    active: false,
    canvas: document.querySelector('#chart-gamepad'),
    context: document.querySelector('#chart-gamepad').getContext('2d')
  }
}
devices.forEach((dvc) => {
  charts[dvc].button.addEventListener('click', function(e) {
    charts[dvc].button.classList.toggle('active')
    charts[dvc].active = charts[dvc].button.classList.contains('active')
    if (charts[dvc].active) {
      charts[dvc].button.textContent = "Stop"
    } else {
      charts[dvc].button.textContent = "Start"
    }
  })
})
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
  ctx.moveTo(0, canvas.height)
  ctx.lineTo(canvas.width, canvas.height)
  ctx.lineWidth = 1
  ctx.strokeStyle = `hsl(0, 0%, 75%)`
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(0, unit * range / 2 - 0.5)
  ctx.lineTo(canvas.width, unit * range / 2 - 0.5)
  ctx.lineWidth = 1
  ctx.strokeStyle = `hsl(0, 35%, 80%)`
  ctx.stroke()
  ctx.font = '8px Verdana'
  ctx.textAlign = 'end'
  ctx.fillStyle = `hsl(0, 0%, 25%)`
  ctx.fillText('10ms', canvas.width, unit * range / 2 - 0.5)

  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(canvas.width, 0)
  ctx.lineWidth = 1
  ctx.strokeStyle = `hsl(0, 0%, 75%)`
  ctx.stroke()

  data[device].samples.forEach((ntrvl) => {
    charts[device].drawCount++
    const pos = charts[device].drawCount - offset
    if (pos >= 0) {
      ntrvl = ntrvl * unit
      ctx.fillStyle = `hsl(0, 0%, 60%)`
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

//keyboard
// document.addEventListener('keydown', function(e) {
//   logs.kb.innerText = `
//     Last interval: ${performance.now() - data.kb.timeStamp}`

//   data.kb.timeStamp = performance.now()
// })

document.addEventListener('keyup', function(e) {
  if (charts.kb.active) {
    const interval = performance.now() - data.kb.timeStamp
    if (interval < 2000) {
      data.kb.samples.push(interval)
    }
    logs.kb.innerText = `
      Last interval: ${interval}`

    data.kb.timeStamp = performance.now()
  }
})

//gamepad
let gp = null
window.addEventListener("gamepadconnected", (e) => {
  logs.gp.innerText = `
    ${e.gamepad.id}`

  gp = navigator.getGamepads()[e.gamepad.index]
  console.log(gp)
})

let sum = 0
let lastSum = 0
animation.addEventListener('animationiteration', () => {
  if (gp) {
    sum = 0
    gp.axes.forEach((axe) => {
      sum += axe
    })
    if (lastSum != sum) {
      const interval = performance.now() - data.gp.timeStamp
      if (interval < 2000) {
        data.gp.samples.push(interval)
      }
    }
    lastSum = sum
    data.gp.timeStamp = performance.now()
  }
})
