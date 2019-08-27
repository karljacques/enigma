import {Ship} from '@/engine/entities/ship'
import {PositionComponent} from '@/engine/components/positionComponent'
import {RenderComponent} from '@/engine/components/renderComponent'
import {VelocityComponent} from '@/engine/components/velocityComponent'
import * as THREE from 'three'

class ShipFactory {
    public static createShip(): Ship {
        const ship = new Ship()

        ship.putComponent(PositionComponent)
        ship.putComponent(RenderComponent)
        ship.putComponent(VelocityComponent)

        const geometry = new THREE.ConeGeometry(0.25, 1, 32)
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
        ship.getComponent(RenderComponent).mesh = new THREE.Mesh(geometry, material)

        ship.id = 1701

        return ship
    }
}

export {ShipFactory}
