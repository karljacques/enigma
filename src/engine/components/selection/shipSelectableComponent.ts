import {SelectableComponent} from '@/engine/components/selection/selectableComponent';

class ShipSelectableComponent extends SelectableComponent {
    protected onSelection() {
        console.log('Reporting for Duty!');
    }

    protected onDeselection() {
        console.log('awwww');
    }
}

export {ShipSelectableComponent};
