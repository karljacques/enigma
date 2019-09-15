import {SelectableComponent} from '@/engine/components/selectableComponent';

class ShipSelectableComponent extends SelectableComponent {
    public onSelection() {
        console.log('Reporting for Duty!');
    }

    public onDeselection() {
        console.log('awwww');
    }
}

export {ShipSelectableComponent};
