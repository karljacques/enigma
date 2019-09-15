import {Component} from '@nova-engine/ecs';

class SelectableComponent implements Component {
    public static tag = 'SelectableComponent';

    protected selected: boolean = false;

    public select(): void {
        if (!this.selected) {
            this.selected = true;
            this.onSelection();
        }
    }

    public deselect(): void {
        if (this.selected) {
            this.selected = false;

            this.onDeselection();
        }
    }

    public isSelected(): boolean {
        return this.selected;
    }

    protected onSelection() {
        console.log('Generic Selection');
    }

    protected onDeselection() {
        this.selected = false;
        console.log('Generic Deselection');
    }
}

export {SelectableComponent};
