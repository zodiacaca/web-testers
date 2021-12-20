
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
    if (interval < 2000) {
      data.kb.samples.push(interval)
    }
    logs.kb.innerText = `
      Last interval: ${interval}`

    data.kb.timeStamp = performance.now()
  }
})
