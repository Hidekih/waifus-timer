const rollsSwitchEl = document.querySelector('#rolls-switch')
const claimsSwitchEl = document.querySelector('#claims-switch')

const resetClaim = [
  { hours: 0, minutes: 39 },
  { hours: 3, minutes: 39 },
  { hours: 6, minutes: 39 },
  { hours: 9, minutes: 39 },
  { hours: 12, minutes: 39 },
  { hours: 15, minutes: 39 },
  { hours: 18, minutes: 39 },
  { hours: 21, minutes: 39 }
]

let mudaeRollsResetTimer
let mudaeClaimResetTimer

function rollsResetInterval() {
  return setInterval(() => {
    if (new Date().getMinutes() === 39 && new Date().getSeconds() < 1) {
      new Notification('Waifus Timer', {
        body: 'Your rolls are reseted right now!'
      })
    }
  }, 1000)
}

function claimsResetInterval() {
  return setInterval(() => {
    const currentTime = {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    }

    if (resetClaim.includes(currentTime)) {
      new Notification('Waifus Timer', {
        body: 'Claim and rolls are reseted!'
      })
    }
  }, 1000)
}

if (JSON.parse(localStorage.getItem('@WaifusTimer:rolls'))) {
  rollsSwitchEl.firstElementChild.classList.add('activated')
  mudaeRollsResetTimer = rollsResetInterval()
}

if (JSON.parse(localStorage.getItem('@WaifusTimer:claims'))) {
  claimsSwitchEl.firstElementChild.classList.add('activated')
  mudaeClaimResetTimer = claimsResetInterval()
}

rollsSwitchEl.addEventListener('click', () => {
  rollsSwitchEl.firstElementChild.classList.toggle('activated')

  if (!mudaeRollsResetTimer) {
    mudaeRollsResetTimer = rollsResetInterval()

    localStorage.setItem('@WaifusTimer:rolls', true)
  } else {
    clearInterval(mudaeRollsResetTimer)

    localStorage.setItem('@WaifusTimer:rolls', false)
  }
})

claimsSwitchEl.addEventListener('click', () => {
  claimsSwitchEl.firstElementChild.classList.toggle('activated')

  if (!mudaeClaimResetTimer) {
    mudaeClaimResetTimer = claimsResetInterval()

    localStorage.setItem('@WaifusTimer:claims', true)
  } else {
    clearInterval(mudaeClaimResetTimer)

    localStorage.setItem('@WaifusTimer:claims', false)
  }
})

window.onload = () => {
  Notification.requestPermission()
}

window.onclose = () => {
  rollsSwitchEl.removeEventListener('click')
  claimsSwitchEl.removeEventListener('click')
}
