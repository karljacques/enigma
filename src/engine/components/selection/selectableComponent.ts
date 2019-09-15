import {Component} from '@nova-engine/ecs';

class SelectableComponent implements Component {
    public static tag = 'SelectableComponent';

    public onSelection() {
        console.log('Generic Selection');
    }

    public onDeselection() {
        console.log('Generic Deselection');
    }
}

export {SelectableComponent};
