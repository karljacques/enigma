import {Ship} from '@/engine/entities/ship';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {RenderComponent} from '@/engine/components/render/renderComponent';
import {VelocityComponent} from '@/engine/components/world/velocityComponent';
import * as THREE from 'three';
import {Renderer} from '@/engine/renderer';
import {Engine} from '@nova-engine/ecs';
import {ShipSelectableComponent} from '@/engine/components/selection/shipSelectableComponent';
import {FlightComputerComponent} from '@/engine/components/ship/flightComputerComponent';

class ShipFactory {
    protected id = 1;
    public constructor(protected renderer: Renderer, protected engine: Engine) {

    }

    public createShip(): Ship {
        const ship = new Ship();

        ship.putComponent(PositionComponent);
        ship.putComponent(RenderComponent);
        ship.putComponent(VelocityComponent);
        ship.putComponent(ShipSelectableComponent);
        ship.putComponent(FlightComputerComponent);

        const geometry = new THREE.ConeGeometry(0.25, 1, 32);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const mesh = new THREE.Mesh(geometry, material);
        ship.getComponent(RenderComponent).mesh = mesh;

        this.renderer.getScene().add(mesh);
        this.engine.addEntity(ship);

        ship.id = this.id;
        this.id++;

        return ship;
    }
}

export {ShipFactory};
