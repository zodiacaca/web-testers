// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const data = {
}
const charts = {
  max: 200,
  range: 20
}
const logs = {
}
const drawDelay = 500
if (typeof devices !== 'undefined' && Array.isArray(devices)) {
  devices.forEach((dvc) => {
    data[dvc] = {}
    data[dvc]["samples"] = []
    data[dvc]["timeStamp"] = performance.now() - drawDelay
    charts[dvc] = {}
    charts[dvc]["button"] = document.querySelector(`#button-${dvc}`)
    charts[dvc]["active"] = false
    charts[dvc]["canvas"] = document.querySelector(`#chart-${dvc}`)
    charts[dvc]["context"] = charts[dvc]["canvas"].getContext('2d')
    charts[dvc].button.addEventListener('click', function(e) {
      charts[dvc].button.classList.toggle('active')
      charts[dvc].active = charts[dvc].button.classList.contains('active')
      if (charts[dvc].active) {
        charts[dvc].button.textContent = "Stop"
      } else {
        charts[dvc].button.textContent = "Start"
      }
    })
    logs[dvc] = document.querySelector(`#screen-log-${dvc}`)
  })
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

  ctx.font = '8px Verdana'
  ctx.textAlign = 'end'
  ctx.fillStyle = `hsl(0, 0%, 25%)`
  ctx.fillText('10ms', canvas.width, unit * range / 2 - 0.5)
}

setInterval(() => {
  devices.forEach((dvc) => {
    if (performance.now() - data[dvc].timeStamp > drawDelay) {
      drawChart(dvc)
    }
  })
}, 1000 / 60)
