
const devices = ['gp_a']

//gamepad
const gamepads = []
window.addEventListener("gamepadconnected", (e) => {
  logs.gp_a.innerText = `
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
document.querySelector('#button-gp_a').addEventListener('animationiteration', () => {
  if (gamepads.length > 0 && charts.gp_a.active) {
    const gp = navigator.getGamepads()[0]
    sum = 0
    gp.axes.forEach((axe) => {
      sum += axe
    })
    if (lastSum != sum) {
      const interval = performance.now() - data.gp_a.timeStamp
      if (interval < 2000) {
        data.gp_a.samples.push(interval)
      }
      logs.gp_a.innerText = `
        ${gp.id}
        Last interval: ${interval}`
    }

    lastSum = sum
    data.gp_a.timeStamp = performance.now()
    // data.gp_a.timeStamp = gp.timestamp
  }
})
