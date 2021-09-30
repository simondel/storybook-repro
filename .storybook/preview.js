import "../projects/angular-components/src/scss/all.scss";
import '@angular/localize/init';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';

setCompodocJson(docJson);
