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
import {HealthComponent} from '@/engine/components/ship/healthComponent';
import {LoadoutComponent} from '@/engine/components/ship/LoadoutComponent';
import {LaserWeapon} from '@/engine/class/laserWeapon';
import {AU} from '@/engine/scalingHelper';

class ShipFactory {
    protected id = 1;

    public constructor(protected renderer: Renderer, protected engine: Engine) {

    }

    public createShip(team: number = 1, mass: number = 1000, enginePower: number = 1000): Ship {
        const ship = new Ship();
        ship.team  = team;

        ship.name = shipNames[Math.floor(Math.random() * shipNames.length)];

        ship.putComponent(PositionComponent);
        ship.putComponent(RenderComponent);
        ship.putComponent(VelocityComponent);
        ship.putComponent(FlightComputerComponent).initialise(ship);
        ship.putComponent(HealthComponent);

        const loadout = ship.putComponent(LoadoutComponent);

        const weapon = new LaserWeapon(50, 50, 0.1 * AU, 1000);
        loadout.weapons.push(weapon);

        ship.mass        = mass;
        ship.enginePower = enginePower;

        if (team === 1) {
            ship.putComponent(ShipSelectableComponent);
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
