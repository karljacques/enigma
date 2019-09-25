import {RepeatWrapping, Texture, TextureLoader} from 'three';

class BackgroundSpriteFactory {


    public static createBackgroundSprite(textureName: string): Texture {

        const bgTexture = new TextureLoader().load(textureName);

        bgTexture.wrapS = RepeatWrapping;
        bgTexture.wrapT = RepeatWrapping;

        bgTexture.repeat.x = 1.2;
        bgTexture.repeat.y = 1.2;

        return bgTexture;
    }
}

export {BackgroundSpriteFactory};
