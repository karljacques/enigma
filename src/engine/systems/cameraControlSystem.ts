import {Camera, Plane, Raycaster, Vector2, Vector3} from 'three';
import {Engine, System} from '@nova-engine/ecs';

class CameraControlSystem extends System {
    protected mouse = new Vector2();
    protected raycaster = new Raycaster();

    protected plane = new Plane(new Vector3(0.0, 1.0, 0.0), 0);

    protected intersect = new Vector3();

    protected moveUpPressed: boolean = false;
    protected moveDownPressed: boolean = false;

    protected moveLeftPressed: boolean = false;
    protected moveRightPressed: boolean = false;

    protected velocity: Vector3 = new Vector3(0, 0, 0);
    protected zoomVelocity: number = 0.0;

    protected readonly MAX_ZOOM_SPEED = 50.0;

    constructor(protected camera: Camera) {
        super();

        window.addEventListener('wheel', (event: WheelEvent) => this.onMouseWheel(event));
        window.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event));

        window.addEventListener('keydown', (event: KeyboardEvent) => this.onKeyDown(event));
        window.addEventListener('keyup', (event: KeyboardEvent) => this.onKeyUp(event));

        // If the current tab loses focus, it won't detect key-ups
        window.onblur = () => {
            this.moveLeftPressed = false;
            this.moveRightPressed = false;
            this.moveUpPressed = false;
            this.moveDownPressed = false;
        };

        // Similarly, if the user accidentally triggers a contextmenu, camera will keep moving
        window.oncontextmenu = () => {
            this.moveLeftPressed = false;
            this.moveRightPressed = false;
            this.moveUpPressed = false;
            this.moveDownPressed = false;
        };
    }

    public update(engine: Engine, delta: number): void {

        const speed = this.camera.position.y / 10.0;

        if (this.moveUpPressed) {
            this.velocity.z -= delta * speed;
        }

        if (this.moveDownPressed) {
            this.velocity.z += delta * speed;
        }

        if (this.moveRightPressed) {
            this.velocity.x += delta * speed;
        }

        if (this.moveLeftPressed) {
            this.velocity.x -= delta * speed;
        }

        this.camera.position.add(this.velocity);

        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.raycaster.ray.intersectPlane(this.plane, this.intersect);

        this.camera.position.lerp(this.intersect, 0.001 * this.zoomVelocity);

        this.velocity.lerp(new Vector3(0, 0, 0), delta * 3);
        this.zoomVelocity = this.lerp(this.zoomVelocity, 0, delta * 3);
    }

    protected lerp(start: number, end: number, amt: number): number {
        return (1 - amt) * start + amt * end;
    }

    protected onMouseWheel(event: WheelEvent): void {
        this.zoomVelocity -= event.deltaY / 10.0;

        if (Math.abs(this.zoomVelocity) > this.MAX_ZOOM_SPEED) {
            this.zoomVelocity = this.MAX_ZOOM_SPEED * ((this.zoomVelocity > 0) ? 1 : -1);
        }
    }

    protected onMouseMove(event: MouseEvent): void {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    protected onKeyUp(event: KeyboardEvent): void {
        this.onKeyChange(event.key, false);
    }

    protected onKeyDown(event: KeyboardEvent): void {
        this.onKeyChange(event.key, true);
    }

    protected onKeyChange(key: string, pressed: boolean): void {
        switch (key) {
            case 'ArrowLeft':
                this.moveLeftPressed = pressed;
                break;
            case 'ArrowRight':
                this.moveRightPressed = pressed;
                break;
            case 'ArrowUp':
                this.moveUpPressed = pressed;
                break;
            case 'ArrowDown':
                this.moveDownPressed = pressed;
                break;
        }
    }


}

export {CameraControlSystem};
