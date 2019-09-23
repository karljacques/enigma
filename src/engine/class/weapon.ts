import {Entity} from '@nova-engine/ecs';

abstract class Weapon {
    abstract fire(attacker: Entity, defender: Entity): void;
}

export {Weapon};
