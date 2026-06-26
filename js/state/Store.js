import { EventBus } from './EventBus.js';

export class Store extends EventBus {
  constructor(initialState = {}) {
    super();
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.emit('stateChange', this.state);
  }
}

export const store = new Store({
  activeFilter: 'all'
});
