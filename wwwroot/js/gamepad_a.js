
const devices = ['gp_a']

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
document.querySelector('#button-gp_a').addEventListener('animationiteration', () => {
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
