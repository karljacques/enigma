import {Engine, System} from '@nova-engine/ecs';
import {EventBus} from '@/eventBus';
import {LaserBeamInstanceFactory} from '@/engine/factories/weapon/instance/laserBeamInstanceFactory';
import {LaserFiredEvent} from '@/events/weapon/laserFiredEvent';
import {LaserBeam} from '@/engine/entities/weapon/laserBeam';

class LaserHandlingSystem extends System {
    protected laserBeams: LaserBeam[] = [];

    public onAttach(engine: Engine): void {
        EventBus.$on('laser-fired', (event: LaserFiredEvent) => {
            const entity = LaserBeamInstanceFactory.create(event.source, event.destination, event.colour);

            this.laserBeams.push(entity);
            engine.addEntity(entity);
        });
    }

    public update(engine: Engine, delta: number): void {
        this.laserBeams.forEach((laser) => {
            if (laser.isExpired()) {
                engine.removeEntity(laser);
            }
        });
    }
}

export {LaserHandlingSystem};
