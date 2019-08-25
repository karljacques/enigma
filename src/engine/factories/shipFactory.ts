import {Ship} from '@/engine/entities/ship'
import {PositionComponent} from '@/engine/components/positionComponent'
import {RenderComponent} from '@/engine/components/renderComponent'
import {VelocityComponent} from '@/engine/components/velocityComponent'

class ShipFactory {
    public static createShip(): Ship {
        const ship = new Ship()

        ship.putComponent(PositionComponent)
        ship.putComponent(RenderComponent)
        ship.putComponent(VelocityComponent)

        ship.id = 1701

        return ship
    }
}

export {ShipFactory}
