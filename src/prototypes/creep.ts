export {};

declare global {
  interface Creep {
    /** Checks if a creep had a specific state (task) this tick. */
    hadState(state: number): boolean;
    /** Checks if a creep currently has a specific state (task). */
    hasState(state?: number): boolean;
    /** Changes the current state (task) for a creep. */
    setState(state: number): void;
    /** Checks if a creep is carrying the max amount of resources. */
    isFull(): boolean;
    isEmpty(): boolean;
    getHomeroom(): string | undefined;
    isInHomeroom(): boolean;

    /** @private */
    _states?: number[];
  }
}

Creep.prototype.hadState = function (state) {
  if (!this._states) {
    this._states = [];
  }
  return this._states.includes(state);
};

Creep.prototype.hasState = function (state) {
  if (state === undefined) {
    return this.memory.state !== state;
  }
  return this.memory.state === state;
};

Creep.prototype.setState = function (state) {
  if (!this._states) {
    this._states = [];
  }
  this._states.push(state);
  this.memory.state = state;
};
Creep.prototype.isFull = function () {
  return !this.store.getFreeCapacity();
};

Creep.prototype.isEmpty = function () {
  return !this.store.getUsedCapacity();
};

Creep.prototype.getHomeroom = function () {
  return this.memory.homeroom;
};

Creep.prototype.isInHomeroom = function () {
  return this.memory.homeroom === this.room.name;
};

Creep.prototype.toString = function (htmlLink = true) {
  if (htmlLink) {
    let onClick = '';
    if (this.id)
      onClick +=
        `angular.element('body').injector().get('RoomViewPendingSelector').set('${this.id}');` +
        `angular.element($('body')).scope().$broadcast('roomObjectSelected', _.filter(angular.element(document.getElementsByClassName('room ng-scope')).scope().Room.objects, (o)=>o._id==='${this.id}')[0]);`;
    return `<a href="#!/room/${Game.shard.name}/${this.room.name}" onClick="${onClick}">[${
      this.name ? this.name : this.id
    }]</a>`;
  }
  return `[${this.name ? this.name : this.id}]`;
};
