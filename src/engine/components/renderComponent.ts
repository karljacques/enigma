import {Component} from '@nova-engine/ecs'
import * as THREE from 'three'
import {Mesh} from 'three'

class RenderComponent implements Component {
    public name = 'RenderComponent'

    private readonly mesh: Mesh

    constructor() {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
        this.mesh = new THREE.Mesh(geometry, material)
    }

    public getMesh(): Mesh {
        return this.mesh
    }
}

export {RenderComponent}
