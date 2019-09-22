import {Engine} from '@nova-engine/ecs';

let engine = new Engine();

let resetEngine = () => {
    engine = new Engine();
};

export {engine, resetEngine};
