import {Camera, Plane, Raycaster, Vector2, Vector3} from 'three'
import {Engine, System} from '@nova-engine/ecs'

class CameraControlSystem extends System {
    protected mouse = new Vector2()
    protected raycaster = new Raycaster()

    protected plane = new Plane(new Vector3(0.0, 1.0, 0.0), 0)

    private intersect = new Vector3()

    constructor(protected camera: Camera) {
        super()

        window.addEventListener('wheel', (event: WheelEvent) => this.onMouseWheel(event))
        window.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event))
    }

    public update(engine: Engine, delta: number): void {
        this.raycaster.setFromCamera(this.mouse, this.camera)

        this.raycaster.ray.intersectPlane(this.plane, this.intersect)
    }

    protected onMouseWheel(event: WheelEvent): void {
        this.camera.position.copy(this.camera.position.lerp(this.intersect, 0.001 * -event.deltaY))
    }

    protected onMouseMove(event: MouseEvent): void {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

}

export {CameraControlSystem}
