class TrafficLight {
  constructor() {
    this.states = {
      RED: 'red',
      YELLOW: 'yellow',
      GREEN: 'green',
    };

    this.currentState = this.states.RED; // Initial state is Red
    this.intervalId = null; // To store the interval ID

    // Get references to the light elements
    this.redLight = document.getElementById('red-light');
    this.yellowLight = document.getElementById('yellow-light');
    this.greenLight = document.getElementById('green-light');

    // Initially, show the red light
    this.updateLights();
  }

  // Update the lights based on the current state
  updateLights() {
    this.redLight.classList.toggle('active', this.currentState === this.states.RED);
    this.yellowLight.classList.toggle('active', this.currentState === this.states.YELLOW);
    this.greenLight.classList.toggle('active', this.currentState === this.states.GREEN);
  }

  // Simulated API call (asynchronous action)
  async fetchApproval() {
    // Simulating a delay and returning a success response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true); // Simulate a successful API response
      }, 1000); // 1-second delay to simulate network latency
    });
  }

  // Transition to the next state
  async transition() {
    console.log(`Attempting to transition from ${this.currentState.toUpperCase()}`);
    this.updateLights();

    try {
      // Wait for API approval before transitioning
      const approved = await this.fetchApproval();
      if (approved) {
        switch (this.currentState) {
          case this.states.RED:
            this.currentState = this.states.YELLOW;
            break;
          case this.states.YELLOW:
            this.currentState = this.states.GREEN;
            break;
          case this.states.GREEN:
            this.currentState = this.states.RED;
            break;
        }
        console.log(`Transitioned to: ${this.currentState.toUpperCase()}`);
        this.updateLights();
      } else {
        console.log('API did not approve transition.');
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  }

  // Start the state machine
  start() {
    if (this.intervalId === null) {
      this.intervalId = setInterval(() => {
        this.transition();
      }, 5000); // Every 5 seconds, attempt to transition to the next state
      console.log("Traffic light started.");
    }
  }

  // Stop the state machine
  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("Traffic light stopped.");
    } else {
      console.log("Traffic light is not running.");
    }
  }
}

// Instantiate the traffic light state machine
const trafficLight = new TrafficLight();
trafficLight.start();

// Event listener for stopping the state machine when pressing the "S" key
document.addEventListener('keydown', (event) => {
  if (event.key === 's' || event.key === 'S') {
    trafficLight.stop();
  }
});
