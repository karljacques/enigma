import {Component} from '@nova-engine/ecs'
import {Vector3} from 'three'

class PositionComponent implements Component {
    public name = 'Position Component'

    public position: Vector3 = new Vector3()
}

export {PositionComponent}
