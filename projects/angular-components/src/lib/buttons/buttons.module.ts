import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonLabelComponent } from './button/button-label/button-label.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [ButtonComponent, ButtonLabelComponent],
  imports: [
    CommonModule
  ],
  exports: [ButtonComponent, ButtonLabelComponent]
})
export class ButtonsModule { }
