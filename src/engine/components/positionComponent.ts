import {Component} from '@nova-engine/ecs'

class PositionComponent implements Component {
    public name = 'Position Component'

    public x = 0
    public y = 0
    public z = 0
}

export {PositionComponent}
