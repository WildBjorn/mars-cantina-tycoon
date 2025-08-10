import Phaser from 'phaser';

// Central event bus for decoupling systems. Scenes can import and emit/listen
// for events from this singleton instead of coupling directly to each other.
const events = new Phaser.Events.EventEmitter();

export default events;
