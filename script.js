class Countdown {
  constructor(selector, options) {
    this.element = document.querySelector(selector)
    this.options = options
    this.intervalId = null
    this.remainingTime = this.options.seconds
    this.onComplete = options.onComplete
  }

  start() {
    this.intervalId = setInterval(() => {
      this.remainingTime--
      this.update()
      if (this.remainingTime <= 0) {
        this.stop()
      }
    }, 1000)
  }

  stop() {
    clearInterval(this.intervalId)
    this.intervalId = null

    if (this.onComplete) {
      this.onComplete()
    }
  }

  update() {
    console.log(this.element)
    this.element.textContent = this.remainingTime
  }
}

class CountdownWithPause extends Countdown {
  constructor(selector, options) {
    super(selector, options)
    this.isPaused = false
  }

  pause() {
    if (!this.isPaused) {
      clearInterval(this.intervalId)
      this.isPaused = true
    }
  }

  resume() {
    if (this.isPaused) {
      this.start()
      this.isPaused = false
    }
  }
}

let countdown = new CountdownWithPause("#countdown", {
  seconds: 10,
})

countdown.start()

countdown.onComplete = () => {
  console.log("complete")
}
