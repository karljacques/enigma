import {Renderer} from '@/engine/renderer';
import {RepeatWrapping, TextureLoader} from 'three';

class BackgroundSpriteFactory {
    constructor(protected renderer: Renderer) {

    }

    public createBackgroundSprite(textureName: string): void {

        const bgTexture = new TextureLoader().load(textureName);

        bgTexture.wrapS = RepeatWrapping;
        bgTexture.wrapT = RepeatWrapping;

        bgTexture.repeat.x = 1.2;
        bgTexture.repeat.y = 1.2;
        this.renderer.getScene().background = bgTexture;
    }
}

export {BackgroundSpriteFactory};
