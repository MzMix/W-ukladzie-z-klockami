export class ShortcutManager {
    /**
     * @param {'Alt' | 'Control' | 'AltGraph' | 'OS' | 'Shift'} modifier
     * @param {String} key
     * @param {Function} callback
     * @param {Function[]} toogle
    */


    constructor(modifier, key, callback, toogle = [() => { return true; }]) {

        if (!(modifier && key && callback)) console.warn('Check params for ShortcutManager');

        this.listener;

        this.modifier = modifier;
        this.key = key.toLowerCase();

        this.callback = callback;
        this.toogle = toogle;

        this.EventAction = (e) => {

            if (!this.CheckToogle()) return;

            if (e.getModifierState(this.modifier) && e.key === this.key) {
                this.callback();
            }
        };

        this.listener = document.addEventListener('keyup', this.EventAction);
    }

    CheckToogle() {
        let result = true;

        this.toogle.forEach((val) => {
            result *= val();
        });

        return result;
    }

    destructor() {
        this.listener.removeEventListener('keyup', this.EventAction);
    }

}