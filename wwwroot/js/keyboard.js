
const devices = ['kb']

//keyboard
// document.addEventListener('keydown', function(e) {
//   logs.kb.innerText = `
//     Last interval: ${performance.now() - data.kb.timeStamp}`

//   data.kb.timeStamp = performance.now()
// })

document.addEventListener('keyup', function(e) {
  if (charts.kb.active) {
    const interval = performance.now() - data.kb.timeStamp
    if (interval > 0 && interval < 200) {
      data.kb.samples.push(interval)
    }
    const len = data.kb.samples.length
    const intervals = []
    for (let i = len - 1; i >= len - 5 && i >= 0; i--) {
      intervals.push(data.kb.samples[i])
    }
    intervals.reverse()
    logs.kb.innerText = `
      Last intervals: ${intervals}`

    data.kb.timeStamp = performance.now()
  }
})
