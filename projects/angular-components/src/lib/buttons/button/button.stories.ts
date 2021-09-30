import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { moduleMetadata, storiesOf } from '@storybook/angular';

import { ButtonsModule } from '../buttons.module';

import { buttonHeights, buttonTypes, buttonWidths } from './button.component';

storiesOf('Components/Button', module)
    .addDecorator(
        moduleMetadata({
            imports: [
                ButtonsModule
            ]
        })
    )
    .add('Button with knobs', () =>
        ({
            template: `
            <div [style.width.px]="200" [style.height.px]="70" style="display:flex; border: 1px solid black">
                <mycustom-button [buttonType]="buttonType" [height]="height" [width]="width" [outline]="outline" [appended]="appended" [disabled]="disabled" [noHover]="noHover" [noTextWrap]="noTextWrap" (click)="onClick($event)">
                    <mycustom-button-label *ngIf="hasLabel">{{labelName}}</mycustom-button-label>
                </mycustom-button>
            </div>
            `,
            props: {
                disabled: boolean('Is disabled', false),
                hasLabel: boolean('Has label', true),
                labelName: text('Label', 'Button'),
                buttonType: select('Button type', buttonTypes, 'primary'),
                outline: boolean('Outline', false),
                height: select('Height', buttonHeights, 'medium'),
                width: select('Width', buttonWidths, 'medium'),
                appended: boolean('Appended', false),
                noHover: boolean('No hover', false),
                noTextWrap: boolean('without text wrap', false),
                onClick: action('click event fired...')
            }
        }));
