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
    data[dvc]["average"] = 0
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
  ctx.fillText('10ms', canvas.width, unit * range / 2 - 0.5 - 2)

  const darken = Math.ceil((performance.now() - data[device].timeStamp) / 10, 100)
  if (data[device].average > 0) {
    const h = canvas.height - (unit * Math.round(data[device].average) - 0.5)
    ctx.beginPath()
    ctx.moveTo(0, h)
    ctx.lineTo(canvas.width, h)
    ctx.lineWidth = 1
    ctx.strokeStyle = `hsl(0, 0%, ${120 - darken}%)`
    ctx.stroke()

    ctx.font = '10px Verdana'
    ctx.textAlign = 'end'
    ctx.strokeStyle = `hsl(0, 0%, 90%)`
    ctx.strokeText(`${Math.round(data[device].average)}ms`, canvas.width, h - 2)
    ctx.fillStyle = `hsl(0, 0%, ${120 - darken}%)`
    ctx.fillText(`${Math.round(data[device].average)}ms`, canvas.width, h - 2)
  }
}

const calcAvg = (dvc) => {
  let avg = 0
  let sum = 0
  let count = 1
  const len = data[dvc].samples.length
  if (len > 0) {
    count = len > 200 ? 200 : len
    for (let i = len - 1; len - i <= 200 && i >= 0; i--) {
      sum += data[dvc].samples[i]
    }
  }
  avg = sum / count
  if (len > 0) {
    sum = 0
    count = len > 200 ? 200 : len
    for (let i = len - 1; len - i <= 200 && i >= 0; i--) {
      if (data[dvc].samples[i] - avg < avg / 2) {
        sum += data[dvc].samples[i]
      } else {
        count--
      }
    }
  }
  avg = sum / count

  return avg
}

if (typeof devices !== 'undefined' && Array.isArray(devices)) {
  setInterval(() => {
    devices.forEach((dvc) => {
      if (performance.now() - data[dvc].timeStamp > drawDelay) {
        data[dvc].average = calcAvg(dvc)
        drawChart(dvc)
      }
    })
  }, 1000 / 60)
}


const items = document.getElementsByClassName("nav-main-item")
for (let i = 0; i <= 2; i += 2) {
  items[i].classList.add("unaccessible")
  items[i].setAttribute('href', "javascript:")
}
