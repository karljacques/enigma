import {Camera, Vector3} from 'three';
import {Engine, System} from '@nova-engine/ecs';
import {InputEventListener} from '@/engine/systems/input/inputEventListener';
import {UserInputSystem} from '@/engine/systems/userInputSystem';

class CameraControlSystem extends System implements InputEventListener {
    protected velocity: Vector3 = new Vector3(0, 0, 0);

    constructor(protected camera: Camera, protected inputSystem: UserInputSystem) {
        super();
    }

    public update(engine: Engine, delta: number): void {

        const speed = this.camera.position.y / 10.0;

        if (this.inputSystem.isKeyPressed('W') || this.inputSystem.isKeyPressed('ArrowUp')) {
            this.velocity.z -= delta * speed;
        }

        if (this.inputSystem.isKeyPressed('S') || this.inputSystem.isKeyPressed('ArrowDown')) {
            this.velocity.z += delta * speed;
        }

        if (this.inputSystem.isKeyPressed('D') || this.inputSystem.isKeyPressed('ArrowRight')) {
            this.velocity.x += delta * speed;
        }

        if (this.inputSystem.isKeyPressed('A') || this.inputSystem.isKeyPressed('ArrowLeft')) {
            this.velocity.x -= delta * speed;
        }

        this.camera.position.add(this.velocity);
        if (this.camera.position.y < 0.1) {
            this.camera.position.y = 0.1;
            this.velocity.multiplyScalar(0);
        }

        this.velocity.lerp(new Vector3(0, 0, 0), delta * 3);
    }

    public onInputEvent(type: string, event: Event): void {
        if (type === 'wheel') {
            this.onMouseWheel(event as WheelEvent);
        }
    }

    protected onMouseWheel(event: WheelEvent): void {
        const multiplier = -event.deltaY * 0.005 * (this.camera.position.y * 0.01);

        if (event.deltaY < 0) {
            const mouseIntersection = this.inputSystem.planeIntersectionPoint;
            this.velocity.add(mouseIntersection.sub(this.camera.position).normalize().multiplyScalar(multiplier));
        } else {
            const centerIntersection = this.inputSystem.centerPlaneIntersectionPoint;
            this.velocity.add(centerIntersection.sub(this.camera.position).normalize().multiplyScalar(multiplier));
        }
    }
}

export {CameraControlSystem};
