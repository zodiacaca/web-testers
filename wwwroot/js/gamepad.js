
const devices = ['gp']

//gamepad
const gamepads = []
window.addEventListener("gamepadconnected", (e) => {
  logs.gp.innerText = `
    ${e.gamepad.id}
    Last interval: 0`

  gamepads.push(e.gamepad.index)
  gamepads.forEach((i) => {
    console.log(navigator.getGamepads()[i])
  })
})

window.addEventListener("gamepaddisconnected", (e) => {
})

let sum = 0
let lastSum = 0
document.querySelector('#button-gp').addEventListener('animationiteration', () => {
  if (gamepads.length > 0 && charts.gp.active) {
    const gp = navigator.getGamepads()[0]
    sum = 0
    gp.axes.forEach((axe) => {
      sum += axe
    })
    if (lastSum != sum) {
      const interval = performance.now() - data.gp.timeStamp
      if (interval < 2000) {
        data.gp.samples.push(interval)
      }
      logs.gp.innerText = `
        ${gp.id}
        Last interval: ${interval}`
    }

    lastSum = sum
    data.gp.timeStamp = performance.now()
    // data.gp.timeStamp = gp.timestamp
  }
})
