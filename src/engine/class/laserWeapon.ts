import {EventBus} from '@/eventBus';
import {Entity} from '@nova-engine/ecs';
import {LaserFiredEvent} from '@/events/weapon/laserFiredEvent';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {Weapon} from '@/engine/class/weapon';
import {HealthComponent} from '@/engine/components/ship/healthComponent';
import {Vector3} from 'three';

class LaserWeapon extends Weapon {
    protected lastFired: number = 0;

    constructor(protected _damage: number,
                protected _accuracy: number,
                protected _range: number,
                protected _cooldown: number) {
        super();
    }

    get cooldown(): number {
        return this._cooldown;
    }

    set cooldown(value: number) {
        this._cooldown = value;
    }

    get damage(): number {
        return this._damage;
    }

    set damage(value: number) {
        this._damage = value;
    }

    get accuracy(): number {
        return this._accuracy;
    }

    set accuracy(value: number) {
        this._accuracy = value;
    }

    get range(): number {
        return this._range;
    }

    set range(value: number) {
        this._range = value;
    }

    public canFire(): boolean {
        return (Date.now() - this.lastFired) > this.cooldown;
    }

    public fire(attacker: Entity, defender: Entity): void {
        this.lastFired = Date.now();

        const variance = new Vector3(Math.random() * 0.1, Math.random() * 0.1, Math.random() * 0.1);


        if ((Math.random() * 100) < this.accuracy) {

            const laserFiredEvent: LaserFiredEvent = {
                source:      attacker.getComponent(PositionComponent).getPosition(),
                destination: defender.getComponent(PositionComponent).getPosition().add(variance),
                colour:      attacker.team === 1 ? 0x00FF00 : 0xFF0000
            };
            EventBus.$emit('laser-fired', laserFiredEvent);

            const damage = Math.random() * this.damage;
            defender.getComponent(HealthComponent).damage(damage);
        } else {
            const laserFiredEvent: LaserFiredEvent = {
                source:      attacker.getComponent(PositionComponent).getPosition(),
                destination: defender.getComponent(PositionComponent).getPosition().add(variance.multiplyScalar(20.0)),
                colour:      attacker.team === 1 ? 0x00FF00 : 0xFF0000
            };

            console.log('MISS');

            EventBus.$emit('laser-fired', laserFiredEvent);
        }
    }
}

export {LaserWeapon};
