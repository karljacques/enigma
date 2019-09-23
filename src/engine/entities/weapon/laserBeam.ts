import {Entity} from '@nova-engine/ecs';

class LaserBeam extends Entity {
    protected firedAt: number  = Date.now();
    protected lifetime: number = 100;

    public isExpired(): boolean {
        return Date.now() - this.firedAt > this.lifetime;
    }


}

export {LaserBeam};
