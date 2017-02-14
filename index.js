const {ipcRenderer, shell} = require('electron')
const moment = require('moment')

let offset = 0;

document.addEventListener('click', (event) => {
  if (event.target.href) {
    // Open links in external browser
    shell.openExternal(event.target.href)
    event.preventDefault()
  } else if (event.target.classList.contains('js-refresh-action')) {
    updateTime()
  } else if (event.target.classList.contains('js-quit-action')) {
    window.close()
  }
})

const setupEvents = () => {
  console.log("vancouver: " + document.querySelector('.js-vancouver-local-time'));  
}
/*
 
*/ 


const updateView = (zones) => {
  document.querySelector('.js-vancouver-local-time').textContent = zones.pacific;
  document.querySelector('.js-victoria-local-time').textContent = zones.pacific;
  document.querySelector('.js-toronto-local-time').textContent = zones.eastern;
  document.querySelector('.js-halifax-local-time').textContent = zones.atlantic;
}

const updateTime = () => {
  time = moment.utc();
  time.add(offset, 'hours');
  zones = {
    pacific: time.add('-8', 'hours').format('LT'),
    eastern: time.add('3', 'hours').format('LT'),
    atlantic: time.add('1', 'hours').format('LT')
  }
  updateView(zones)
}

// Refresh weather every 10 minutes
const second = 1000
//setInterval(updateTime, second)

setupEvents();

// Update initial weather when loaded
document.addEventListener('DOMContentLoaded', updateTime)
