export {};

declare global {
  interface Room {
    getMySpawns(): StructureSpawn[];
    /** Finds the first owned spawn in a room if available. */
    getMyFirstSpawn(): StructureSpawn | undefined;
    getSources(): Source[] | undefined;
    getMineral(): Mineral | undefined;
    hostiles(): Creep[] | undefined;
    invaders(): Creep[] | undefined;
    sourceKeepers(): Creep[] | undefined;
    playerHostiles(): Creep[] | undefined;
    dangerousHostiles(): Creep[] | undefined;
    dangerousPlayerHostiles(): Creep[] | undefined;
    /** @private */
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

Room.prototype.getMySpawns = function () {
  if (this._mySpawns === undefined) {
    this._mySpawns = this.find(FIND_MY_SPAWNS);
  }
  return this._mySpawns;
};

Room.prototype.getMyFirstSpawn = function () {
  if (!this._firstSpawn) {
    this._firstSpawn = this.getMySpawns()?.[0];
  }
  return this._firstSpawn;
};

Room.prototype.getSources = function () {
  if (!this._sources) {
    this._sources = this.find(FIND_SOURCES);
  }
  return this._sources;
};

Room.prototype.getMineral = function () {
  if (!this._mineral) {
    this._mineral = this.find(FIND_MINERALS)[0];
  }
  return this._mineral;
};

Room.prototype.hostiles = function () {
  if (!this._hostiles) {
    this._hostiles = this.find(FIND_HOSTILE_CREEPS);
  }
  return this._hostiles;
};

Room.prototype.invaders = function () {
  if (!this._invaders) {
    this._invaders = _.filter(this.hostiles, (creep: Creep) => creep.owner.username === 'Invader');
  }
  return this._invaders;
};

Room.prototype.sourceKeepers = function () {
  if (!this._sourceKeepers) {
    this._sourceKeepers = _.filter(this.hostiles, (creep: Creep) => creep.owner.username === 'Source Keeper');
  }
  return this._sourceKeepers;
};

Room.prototype.playerHostiles = function () {
  if (!this._playerHostiles) {
    this._playerHostiles = _.filter(
      this.hostiles,
      (creep: Creep) => creep.owner.username !== 'Invader' && creep.owner.username !== 'Source Keeper'
    );
  }
  return this._playerHostiles;
};

Room.prototype.dangerousHostiles = function () {
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
};

Room.prototype.dangerousPlayerHostiles = function () {
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
};

Room.prototype.toString = function (htmlLink = true) {
  if (htmlLink) {
    return `<a href="#!/room/${Game.shard.name}/${this.name}">[${this.name}]</a>`;
  }
  return `[(${this.name}) #${this.name}]`;
};
