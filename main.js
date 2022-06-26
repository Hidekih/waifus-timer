console.log("v1.0.0")

const KEY_MINUTE = 39
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

const rollsSwitchEl = document.querySelector('#rolls-switch')
const claimsSwitchEl = document.querySelector('#claims-switch')
const pokemonSwitchEl = document.querySelector('#pokemon-switch')
const loginButton = document.querySelector('#login')

const rollsNotificator = {
  isActive: JSON.parse(localStorage.getItem('@WaifusTimer:rolls')),
  timer: undefined
}

const claimsNotificator = {
  isActive: JSON.parse(localStorage.getItem('@WaifusTimer:claims')),
  timer: undefined
}

const pokemonNotificator = {
  isActive: JSON.parse(localStorage.getItem('@WaifusTimer:pokemon')),
  timer: undefined
}

function rollsResetInterval() {
  return setInterval(() => {
    const currentMinutes = new Date().getMinutes()
    const currentSeconds = new Date().getSeconds()

    if (currentMinutes === KEY_MINUTE && currentSeconds < 1) {
      console.log('Your rolls are reseted right now!')
      if (new Date().getMinutes() === 39 && new Date().getSeconds() < 1) {
        new Notification('Waifus Timer', {
          body: 'Your rolls are reseted right now!'
        })
      }
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
      console.log('Claim and rolls are reseted!')
      new Notification('Waifus Timer', {
        body: 'Claim and rolls are reseted!'
      })
    }
  }, 1000 * 60)
}

function pokemonResetInterval() {
  return setInterval(() => {
    const currentHour = new Date().getHours()
    const currentMinutes = new Date().getMinutes()

    if (currentHour % 2 !== 0 && currentMinutes === 0) {
      console.log("Gotta catch 'em all")
      new Notification('Waifus Timer', {
        body: "Gotta catch 'em all"
      })
    }
  }, 1000 * 60)
}

if (rollsNotificator.isActive) {
  rollsSwitchEl.firstElementChild.classList.add('activated')
  rollsNotificator.timer = rollsResetInterval()
  console.log('Claims timer activated!')
}

if (claimsNotificator.isActive) {
  claimsSwitchEl.firstElementChild.classList.add('activated')
  claimsNotificator.timer = claimsResetInterval()
  console.log('Claims timer activated!')
}

rollsSwitchEl.addEventListener('click', () => {
  rollsSwitchEl.firstElementChild.classList.toggle('activated')

  if (rollsNotificator.isActive) {
    clearInterval(rollsNotificator.timer)

    localStorage.setItem('@WaifusTimer:rolls', false)
  } else {
    rollsNotificator.timer = rollsResetInterval()
    console.log('Rolls timer activated!')
    notifyMe()
    localStorage.setItem('@WaifusTimer:rolls', true)
  }
})

claimsSwitchEl.addEventListener('click', () => {
  claimsSwitchEl.firstElementChild.classList.toggle('activated')

  if (claimsNotificator.isActive) {
    clearInterval(claimsNotificator.timer)

    localStorage.setItem('@WaifusTimer:claims', false)
  } else {
    claimsNotificator.timer = claimsResetInterval()
    console.log('Claims timer activated!')
    notifyMe()
    localStorage.setItem('@WaifusTimer:claims', true)
  }
})

pokemonSwitchEl.addEventListener('click', () => {
  pokemonSwitchEl.firstElementChild.classList.toggle('activated')

  if (pokemonNotificator.isActive) {
    clearInterval(pokemonNotificator.timer)

    localStorage.setItem('@WaifusTimer:pokemon', false)
  } else {
    pokemonNotificator.isActive = true
    pokemonNotificator.timer = pokemonResetInterval()
    notifyMe()
    localStorage.setItem('@WaifusTimer:pokemon', true)
  }
})

window.onclose = () => {
  rollsSwitchEl.removeEventListener('click')
  claimsSwitchEl.removeEventListener('click')
}
