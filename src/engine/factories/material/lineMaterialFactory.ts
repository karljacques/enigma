import {LineMaterial} from 'three/examples/jsm/lines/LineMaterial';

class LineMaterialFactory {
    public static buildDottedMaterial(colour: number, lineWidth: number, dashScale: number = 0.5, gapSize: number = 1): LineMaterial {
        const material = new LineMaterial(
            {
                color:     colour,
                linewidth: lineWidth,
                dashed:    true,
                dashScale: dashScale,
                gapSize:   gapSize
            });

        material.defines.USE_DASH = '';

        material.resolution.set(window.innerWidth, window.innerHeight);

        return material;
    }

    public static buildSolidMaterial(colour: number, lineWidth: number): LineMaterial {
        const material = new LineMaterial(
            {
                color:     colour,
                linewidth: lineWidth,
                dashed:    false,
            });

        material.resolution.set(window.innerWidth, window.innerHeight);

        return material;
    }
}

export {LineMaterialFactory};
