// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const screenLog = document.querySelector('#screen-log')
let lastTimeStamp = 0
document.addEventListener('mousemove', function(e) {
  screenLog.innerText = `
    Screen X/Y: ${e.screenX}, ${e.screenY}
    Client X/Y: ${e.clientX}, ${e.clientY}
    Last interval: ${performance.now() - lastTimeStamp}`

  lastTimeStamp = performance.now()
})
