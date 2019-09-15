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

    protected holdingRotationTrigger: boolean = false;

    protected velocity: Vector3 = new Vector3(0, 0, 0);

    constructor(protected camera: Camera) {
        super();

        window.addEventListener('wheel', (event: WheelEvent) => this.onMouseWheel(event));
        window.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event));

        window.addEventListener('keydown', (event: KeyboardEvent) => this.onKeyDown(event));
        window.addEventListener('keyup', (event: KeyboardEvent) => this.onKeyUp(event));

        window.addEventListener('mousedown', (event: MouseEvent) => this.onMouseDown(event));
        window.addEventListener('mouseup', (event: MouseEvent) => this.onMouseUp(event));

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
        if (this.camera.position.y < 0.1) {
            this.camera.position.y = 0.1;
            this.velocity.multiplyScalar(0);
        }

        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.raycaster.ray.intersectPlane(this.plane, this.intersect);

        this.velocity.lerp(new Vector3(0, 0, 0), delta * 3);
    }

    protected onMouseWheel(event: WheelEvent): void {
        this.velocity.add(this.intersect.sub(this.camera.position).normalize().multiplyScalar(-event.deltaY * 0.005));
    }

    protected onMouseMove(event: MouseEvent): void {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        if (this.holdingRotationTrigger) {
            const x = this.camera.position.x;
            const z = this.camera.position.z;

            const movementX = event.movementX / 100.0;
            const movementY = -event.movementY / 100.0;

            this.camera.rotateX(movementX);
            this.camera.rotateY(movementY);

        }
    }

    protected onMouseDown(event: MouseEvent): void {
        switch (event.which) {
            case 2:
                event.preventDefault();
                this.holdingRotationTrigger = true;
                break;
        }
    }

    protected onMouseUp(event: MouseEvent): void {
        switch (event.which) {
            case 2:
                event.preventDefault();
                this.holdingRotationTrigger = false;
                break;
        }
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
            case 'a':
            case 'A':
                this.moveLeftPressed = pressed;
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                this.moveRightPressed = pressed;
                break;
            case 'ArrowUp':
            case 'W':
            case 'w':
                this.moveUpPressed = pressed;
                break;
            case 's':
            case 'S':
            case 'ArrowDown':
                this.moveDownPressed = pressed;
                break;
        }
    }
}

export {CameraControlSystem};
