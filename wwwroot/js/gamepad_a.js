
const devices = ['gp_a']

//gamepad
let gp = null
window.addEventListener("gamepadconnected", (e) => {
  logs.gp_a.innerText = `
    ${e.gamepad.id}
    Last interval: 0`

  gp = navigator.getGamepads()[e.gamepad.index]
  console.log(gp)
})

let sum = 0
let lastSum = 0
document.querySelector('#button-gp_a').addEventListener('animationiteration', () => {
  if (gp && charts.gp_a.active) {
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
  }
})
