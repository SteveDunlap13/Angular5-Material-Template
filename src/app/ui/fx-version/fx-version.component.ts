
import { Component } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';



@Component({
    selector: 'fx-version',
    template: `
      <div style="width: 100%; font-size:1em; color:red; margin: 0 auto; text-align: center;">
        {{activeMediaQuery}}
      </div>
  `
})
export class FxVersionComponent {

    activeMediaQuery = '';

    constructor(private media: ObservableMedia) {

        media.subscribe((change: MediaChange) => {

            if (change.mediaQuery.indexOf('orientation') > -1) {
                return;
            }
            let value = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
            this.activeMediaQuery = value;
        });
    }
}
