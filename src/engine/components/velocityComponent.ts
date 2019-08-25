import {Component} from '@nova-engine/ecs'

class VelocityComponent implements Component {
    name = 'VelocityComponent'

    public x: number = 0.01
    public y: number = 0
    public z: number = 0
}

export {VelocityComponent}
