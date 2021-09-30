import { Component, ContentChild, HostBinding, Input } from '@angular/core';

import { ButtonLabelComponent } from './button-label/button-label.component';

export const buttonTypes = ['primary', 'cancel', 'danger', 'ghost', 'success'] as const;
export type ButtonType = typeof buttonTypes[number];

export const buttonHeights = ['fill', 'micro', 'small', 'medium'] as const;
export type ButtonHeight = typeof buttonHeights[number];

export const buttonWidths = ['fill', 'wrap', 'small', 'medium'] as const;
export type ButtonWidth = typeof buttonWidths[number];

@Component({
  selector: 'mycustom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonType: ButtonType = 'primary';
  @Input() height: ButtonHeight = 'medium';
  @Input() width: ButtonWidth = 'medium';
  @Input() title: string = '';  @Input() outline: boolean = false;
  @Input() disabled: boolean;
  @Input() loading: boolean;
  @Input() appended: boolean = false;
  @Input() noHover: boolean = false;
  @Input() noTextWrap: boolean = false;

  @HostBinding('class.disabled')
  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }


  @HostBinding('class.fill')
  get hostFillClass(): boolean {
    return this.width === 'fill';
  }

  @ContentChild(ButtonLabelComponent) buttonLabelComponent: ButtonLabelComponent;

  @HostBinding('attr.role')
  readonly role = 'button';
}
