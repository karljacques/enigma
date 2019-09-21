import {Engine, System} from '@nova-engine/ecs';
import {Camera, Plane, Raycaster, Vector2, Vector3} from 'three';
import {InputEventListener} from '@/engine/systems/input/inputEventListener';
import {WorldMouseEvent} from '@/engine/systems/input/WorldMouseEvent';

class InputSystem extends System {
    protected plane     = new Plane(new Vector3(0.0, 1.0, 0.0), 0);
    protected mouse     = new Vector2();
    protected raycaster = new Raycaster();

    protected eventListeners: InputEventListener[] = [];
    protected planeIntersectionPoint               = new Vector3();

    protected keymap: Record<string, boolean> = {};

    constructor(protected camera: Camera) {
        super();

        window.addEventListener('contextmenu', (event: MouseEvent) => this.onRightClick(event));
        window.addEventListener('click', (event: MouseEvent) => this.onClick(event));
        window.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event));

        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }

    public addEventListener(listener: InputEventListener): void {
        this.eventListeners.push(listener);
    }

    public update(engine: Engine, delta: number): void {

    }

    public isKeyPressed(key: string): boolean {
        key = key.toLowerCase();

        if (key in this.keymap) {
            return this.keymap[key];
        }

        return false;
    }

    protected onKeyUp(event: KeyboardEvent): void {
        const key = event.key.toLowerCase();

        this.keymap[key] = false;
    }

    protected onKeyDown(event: KeyboardEvent): void {
        const key = event.key.toLowerCase();

        this.keymap[key] = true;
    }

    protected onMouseMove(event: MouseEvent): void {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.dispatch('mousemove', event);
    }

    protected onRightClick(event: MouseEvent): void {
        if (!event.composedPath().map((x: any) => x.id).includes('renderer')) {
            return;
        }

        event.preventDefault();

        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.raycaster.ray.intersectPlane(this.plane, this.planeIntersectionPoint);

        const worldMouseEvent = new WorldMouseEvent('rightclick',
                                                    event.button,
                                                    this.mouse,
                                                    this.planeIntersectionPoint,
                                                    this.raycaster);

        this.dispatch('rightclick', worldMouseEvent);
    }

    protected onClick(event: MouseEvent): void {
        // This requires a polyfill on Edge/IE
        if (!event.composedPath().map((x: any) => x.id).includes('renderer')) {
            return;
        }

        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.raycaster.ray.intersectPlane(this.plane, this.planeIntersectionPoint);

        const worldMouseEvent = new WorldMouseEvent('click',
                                                    event.button,
                                                    this.mouse,
                                                    this.planeIntersectionPoint,
                                                    this.raycaster);

        this.dispatch('click', worldMouseEvent);
    }


    protected dispatch(type: string, event: Event): void {
        this.eventListeners.forEach((eventListener: InputEventListener) => {
            eventListener.onInputEvent(type, event);
        });
    }


}

export {InputSystem};
