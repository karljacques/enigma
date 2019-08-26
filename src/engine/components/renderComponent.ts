import {Component} from '@nova-engine/ecs'
import {Mesh} from 'three'

class RenderComponent implements Component {
    public name = 'RenderComponent'

    public mesh: Mesh

    public getMesh(): Mesh {
        return this.mesh
    }
}

export {RenderComponent}
