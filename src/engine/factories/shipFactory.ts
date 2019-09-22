import {Ship} from '@/engine/entities/ship';
import {PositionComponent} from '@/engine/components/world/positionComponent';
import {RenderComponent} from '@/engine/components/render/renderComponent';
import {VelocityComponent} from '@/engine/components/world/velocityComponent';
import * as THREE from 'three';
import {Renderer} from '@/engine/renderer';
import {Engine} from '@nova-engine/ecs';
import {ShipSelectableComponent} from '@/engine/components/selection/shipSelectableComponent';
import {FlightComputerComponent} from '@/engine/components/ship/flightComputerComponent';
import shipNames from './../entities/ship/nameList';

class ShipFactory {
    protected id = 1;

    public constructor(protected renderer: Renderer, protected engine: Engine) {

    }

    public createShip(team: number = 1): Ship {
        const ship = new Ship();
        ship.team = team;

        ship.name = shipNames[Math.floor(Math.random() * shipNames.length)];

        ship.putComponent(PositionComponent);
        ship.putComponent(RenderComponent);
        ship.putComponent(VelocityComponent);

        if (team === 1) {
            ship.putComponent(ShipSelectableComponent);

            ship.putComponent(FlightComputerComponent).initialise(ship);
        }

        let colour = 0xffffff;

        switch (team) {
            case 1:
                colour = 0x00ff00;
                break;
            case 2:
                colour = 0xff0000;
                break;
            case 3:
                colour = 0x999999;
                break;
        }

        const geometry = new THREE.ConeGeometry(0.25, 1, 32);
        geometry.rotateX(Math.PI / 2);
        const material = new THREE.MeshBasicMaterial({color: colour});
        const mesh     = new THREE.Mesh(geometry, material);

        ship.getComponent(RenderComponent).mesh = mesh;

        this.renderer.getScene().add(mesh);
        this.engine.addEntity(ship);

        ship.id = this.id;
        this.id++;

        return ship;
    }
}

export {ShipFactory};
