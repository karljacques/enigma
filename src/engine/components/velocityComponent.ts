import {Component} from '@nova-engine/ecs'
import {Vector3} from 'three'

class VelocityComponent implements Component {
    public tag = 'VelocityComponent'

    public velocity: Vector3 = new Vector3(0.0, 0, 0)
}

export {VelocityComponent}
