/**
 * @author HypnosNova / https://www.threejs.org.cn/gallery
 * Ported from three/examples/jsm/interactive/SelectionHelper.js by Karl Jacques
 */

import {Vector2, WebGLRenderer} from 'three';
import {SelectionBox} from 'three/examples/jsm/interactive/SelectionBox';

class SelectionHelper {

    protected element!: HTMLElement;

    protected startPoint: Vector2;
    protected pointTopLeft: Vector2;
    protected pointBottomRight: Vector2;

    protected isDown: boolean;

    constructor(selectionBox: SelectionBox, protected renderer: WebGLRenderer, cssClassName: string) {

        this.element = document.createElement('div');
        this.element.classList.add(cssClassName);
        this.element.style.pointerEvents = 'none';

        this.renderer = renderer;

        this.startPoint       = new Vector2();
        this.pointTopLeft     = new Vector2();
        this.pointBottomRight = new Vector2();

        this.isDown = false;

        document.addEventListener('mousedown', (event) => {
            if (event.button === 0) {
                this.isDown = true;
                this.onSelectStart(event);
            }
        }, false);

        document.addEventListener('mousemove', (event) => {

            if (this.isDown) {

                this.onSelectMove(event);

            }
        }, false);

        document.addEventListener('mouseup', (event: MouseEvent) => {
            this.isDown = false;
            this.onSelectOver();

        }, false);
    }


    public onSelectStart(event: MouseEvent) {

        document.body.appendChild(this.element);

        this.element.style.left   = event.clientX + 'px';
        this.element.style.top    = event.clientY + 'px';
        this.element.style.width  = '0px';
        this.element.style.height = '0px';

        this.startPoint.x = event.clientX;
        this.startPoint.y = event.clientY;
    }

    public onSelectMove(event: MouseEvent) {

        this.pointBottomRight.x = Math.max(this.startPoint.x, event.clientX);
        this.pointBottomRight.y = Math.max(this.startPoint.y, event.clientY);
        this.pointTopLeft.x     = Math.min(this.startPoint.x, event.clientX);
        this.pointTopLeft.y     = Math.min(this.startPoint.y, event.clientY);

        this.element.style.left   = this.pointTopLeft.x + 'px';
        this.element.style.top    = this.pointTopLeft.y + 'px';
        this.element.style.width  = (this.pointBottomRight.x - this.pointTopLeft.x) + 'px';
        this.element.style.height = (this.pointBottomRight.y - this.pointTopLeft.y) + 'px';
    }

    public onSelectOver() {
        if (this.element.parentElement) {
            this.element.parentElement.removeChild(this.element);
        }
    }
}

export {SelectionHelper};
