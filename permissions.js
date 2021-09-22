function notifyMe() {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification')
    return
  }

  if (Notification.permission === 'granted') return

  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') return
    })
  }
}

window.onload = () => {
  notifyMe()
}
