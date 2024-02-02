export {};

declare global {
  interface Room {
    creeps: Creep[];
    getMySpawns: StructureSpawn[];
    /** Finds the first owned spawn in a room if available. */
    getMyFirstSpawn: StructureSpawn | undefined;
    getSources: Source[];
    getMineral: Mineral | undefined;
    hostiles: Creep[];
    invaders: Creep[];
    sourceKeepers: Creep[];
    playerHostiles: Creep[];
    dangerousHostiles: Creep[];
    dangerousPlayerHostiles: Creep[];
    /** @private */
    _creeps: Creep[];
    _mySpawns?: StructureSpawn[];
    _firstSpawn?: StructureSpawn;
    _sources?: Source[];
    _mineral?: Mineral;
    _hostiles?: Creep[];
    _invaders?: Creep[];
    _sourceKeepers?: Creep[];
    _playerHostiles?: Creep[];
    _dangerousHostiles?: Creep[];
    _dangerousPlayerHostiles?: Creep[];
  }
}

Object.defineProperty(Room.prototype, 'creeps', {
  get(this: Room) {
    if (!this._creeps) {
      this._creeps = this.find(FIND_MY_CREEPS);
    }
    return this._creeps;
  },
  configurable: true
});

Object.defineProperty(Room.prototype, 'getMySpawns', {
  get(this: Room) {
    if (!this._mySpawns) {
      this._mySpawns = this.find(FIND_MY_SPAWNS);
    }
    return this._mySpawns;
  },
  configurable: true
});

Object.defineProperty(Room.prototype, 'getMyFirstSpawn', {
  get(this: Room) {
    if (!this._firstSpawn) {
      this._firstSpawn = this.getMySpawns?.[0];
    }
    return this._firstSpawn;
  },
  configurable: true
});

Object.defineProperty(Room.prototype, 'getSources', {
  get(this: Room) {
    if (!this._sources) {
      this._sources = this.find(FIND_SOURCES);
    }
    return this._sources;
  },
  configurable: true
});

Object.defineProperty(Room.prototype, 'getMineral', {
  get(this: Room) {
    if (!this._mineral) {
      this._mineral = this.find(FIND_MINERALS)[0];
    }
    return this._mineral;
  },
  configurable: true
});

Object.defineProperty(Room.prototype, 'hostiles', {
  get(this: Room) {
    if (!this._hostiles) {
      this._hostiles = this.find(
        FIND_HOSTILE_CREEPS
        /*, {
				filter: (creep: Creep) => !isAlly(creep.owner.username),
			}*/
      );
    }
    return this._hostiles;
  },
  configurable: true
});

Object.defineProperty(Room.prototype, 'invaders', {
  get(this: Room) {
    if (!this._invaders) {
      this._invaders = _.filter(this.hostiles, (creep: Creep) => creep.owner.username == 'Invader');
    }
    return this._invaders;
  },
  configurable: true
});

Object.defineProperty(Room.prototype, 'sourceKeepers', {
  get(this: Room) {
    if (!this._sourceKeepers) {
      this._sourceKeepers = _.filter(this.hostiles, (creep: Creep) => creep.owner.username === 'Source Keeper');
    }
    return this._sourceKeepers;
  },
  configurable: true
});

Object.defineProperty(Room.prototype, 'playerHostiles', {
  get(this: Room) {
    if (!this._playerHostiles) {
      this._playerHostiles = _.filter(
        this.hostiles,
        (creep: Creep) => creep.owner.username !== 'Invader' && creep.owner.username !== 'Source Keeper'
      );
    }
    return this._playerHostiles;
  },
  configurable: true
});

Object.defineProperty(Room.prototype, 'dangerousHostiles', {
  get(this: Room) {
    if (!this._dangerousHostiles) {
      this._dangerousHostiles = _.filter(
        this.hostiles,
        (creep: Creep) =>
          creep.getActiveBodyparts(ATTACK) > 0 ||
          creep.getActiveBodyparts(WORK) > 0 ||
          creep.getActiveBodyparts(RANGED_ATTACK) > 0 ||
          creep.getActiveBodyparts(HEAL) > 0
      );
    }
    return this._dangerousHostiles;
  },
  configurable: true
});

Object.defineProperty(Room.prototype, 'dangerousPlayerHostiles', {
  get(this: Room) {
    if (!this._dangerousPlayerHostiles) {
      this._dangerousPlayerHostiles = _.filter(
        this.playerHostiles,
        (c: Creep) =>
          c.getActiveBodyparts(ATTACK) > 0 ||
          c.getActiveBodyparts(WORK) > 0 ||
          c.getActiveBodyparts(RANGED_ATTACK) > 0 ||
          c.getActiveBodyparts(HEAL) > 0
      );
    }
    return this._dangerousPlayerHostiles;
  },
  configurable: true
});

Room.prototype.toString = function (htmlLink = true) {
  if (htmlLink) {
    return `<a href="#!/room/${Game.shard.name}/${this.name}">[${this.name}]</a>`;
  }
  return `[(${this.name}) #${this.name}]`;
};
