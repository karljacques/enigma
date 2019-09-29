import {Component} from "@nova-engine/ecs";
import {Vector2} from "three";

class EntityLocationIndicatorComponent implements Component {
    public static tag = 'EntityLocationIndicatorComponent';

    screenPosition!: Vector2;
    name!: string;
}

export {EntityLocationIndicatorComponent};