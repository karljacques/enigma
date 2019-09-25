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

    public createShip(team: number = 1, type: string): Ship {
        const ship = new Ship();
        ship.team  = team;

        ship.name = shipNames[Math.floor(Math.random() * shipNames.length)];

        ship.putComponent(PositionComponent);
        ship.putComponent(RenderComponent);
        ship.putComponent(VelocityComponent);
        ship.putComponent(FlightComputerComponent).initialise(ship);
        ship.putComponent(HealthComponent);

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

        ship.id = this.id;
        this.id++;

        switch (type) {
            case 'battleship':
                this.createBattleship(ship, colour);
                break;
            case 'battlecruiser':
                this.createBattlecruiser(ship, colour);
                break;
            case 'destroyer':
                this.createDestroyer(ship, colour);
                break;
        }

        return ship;
    }

    protected createBattleship(ship: Ship, colour: number) {
        ship.mass        = 18000;
        ship.enginePower = 10000;

        const geometry = new THREE.CylinderGeometry(0.25, 0.25, 1);

        geometry.rotateX(Math.PI / 2);

        const material = new THREE.MeshBasicMaterial({color: colour});
        const mesh     = new THREE.Mesh(geometry, material);

        ship.getComponent(RenderComponent).mesh = mesh;

        ship.getComponent(HealthComponent).hull = 1000;

        const loadout = ship.putComponent(LoadoutComponent);

        const weapon = new LaserWeapon(50, 50, 0.1 * AU, 1000);
        loadout.weapons.push(weapon);

        const fastLaser = new LaserWeapon(20, 50, 0.2 * AU, 500);
        loadout.weapons.push(fastLaser);
    }

    protected createBattlecruiser(ship: Ship, colour: number) {

        ship.mass        = 12000;
        ship.enginePower = 8000;
        const geometry   = new THREE.BoxGeometry(0.25, 0.25, 1);

        ship.getComponent(HealthComponent).hull = 500;


        const material = new THREE.MeshBasicMaterial({color: colour});
        const mesh     = new THREE.Mesh(geometry, material);

        ship.getComponent(RenderComponent).mesh = mesh;


        const loadout = ship.putComponent(LoadoutComponent);

        const weapon = new LaserWeapon(50, 50, 0.1 * AU, 1000);
        loadout.weapons.push(weapon);

    }

    protected createDestroyer(ship: Ship, colour: number) {

        ship.mass        = 1000;
        ship.enginePower = 1000;

        const geometry = new THREE.ConeGeometry(0.1, 0.7, 32);
        geometry.rotateX(Math.PI / 2);
        const material = new THREE.MeshBasicMaterial({color: colour});
        const mesh     = new THREE.Mesh(geometry, material);

        ship.getComponent(RenderComponent).mesh = mesh;

        const loadout = ship.putComponent(LoadoutComponent);

        const weapon = new LaserWeapon(50, 50, 0.1 * AU, 1000);
        loadout.weapons.push(weapon);

    }
}

export {ShipFactory};
