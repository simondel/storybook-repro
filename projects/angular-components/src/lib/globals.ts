import { AbstractControl, FormGroup } from '@angular/forms';

import { Observable, OperatorFunction, of } from 'rxjs';
import { filter } from 'rxjs/operators';

export function observableOrValue<T>(value: Observable<T> | T): Observable<T> {
    return value instanceof Observable ? value : of(value);
  }

export function getObservableValueSynchronously<T>(observable: Observable<T>): T {
    let value: T | undefined;
    let subscribedInvoked = false;
    observable.subscribe(val => {
      value = val;
      subscribedInvoked = true;
    }).unsubscribe();

    if (!subscribedInvoked) throw new Error('You invoked getObservableValueSynchronously, but the observable didn\'t return a synchronous result');

    // The subscribedInvoked checks this condition. Therefore this cast is allowed in this case
    return value as unknown as T;
  }

export class Convert {
    static toString(val: any): string | undefined;
    static toString(val: any, opts: { allowUndefinedOrNull: false }): string;
    static toString(val: any, { allowUndefinedOrNull }: { allowUndefinedOrNull: boolean } = { allowUndefinedOrNull: true }): string | undefined {
        const throwError: () => never = () => { throw new Error(`Failed to convert value to a string. A string/number${allowUndefinedOrNull ? '/undefined/null' : ''} was expected`); };
        switch (typeof val) {
        case 'string':
          return val;
        case 'number':
        case 'bigint':
          return val.toString();
        case 'undefined':
          return allowUndefinedOrNull ? undefined : throwError();
        case 'object':
          if (val === null && allowUndefinedOrNull) {
            return undefined;
          }
          return val.toString();
        default:
          return throwError();
      }
    }

    static toSpecificString<T extends string>(val: unknown, options: Array<T>): T {
      // tslint:disable-next-line: strict-comparisons
      if (typeof val !== 'string' || !options.some(x => x === val)) {
        throw new Error(`Failed to convert string value to requires string in array. Received value ${String(val)}, options were: ${options.join(',')}`);
      }

      return val as T;
    }

    static toArray<T = any>(val: any, { fallbackToEmptyArrayWhenUndefined }: { fallbackToEmptyArrayWhenUndefined: boolean } = { fallbackToEmptyArrayWhenUndefined: false }): Array<T> {
      if (!(val instanceof Array)) {
        if ((val === undefined || val === null) && fallbackToEmptyArrayWhenUndefined) {
          return [];
        }
        throw new Error('Invalid parameter provided for ');
      }
      return val;
    }

    /**
     * Converts the given value
     */
    static toEnum<T>(val: any, _enum: any): T {
      for (const value of Object.values(_enum)) {
        if (value === val) {
          return val as T;
        }
      }

      throw new Error('The provided value did not match the provided enumeration');
    }
}

export function triggerFormValidation(form: FormGroup): void {
  Object.keys(form.controls).forEach(key => {
    const control = form.get(key);
    if (control instanceof FormGroup) {
      triggerFormValidation(control);
    } else if (control instanceof AbstractControl && control.enabled) {
      // only update controls that are enabled. otherwise when a disabled control is enabled, the validation is already triggered
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  });
}

// tslint:disable-next-line:no-null-undefined-union -- for exlcusion of filterTruthy they must both exist because they are both falsy
export type FalsyValues = null | undefined | '' | 0 | typeof NaN | 0n;

export function filterTruthy<TInput>(): OperatorFunction<TInput, Exclude<TInput, FalsyValues>> {
  return observable => observable.pipe(filter<Exclude<TInput, FalsyValues>>(val => Boolean(val)));
}

/**
 * Creates typesafety for components, so it only includes properties
 */
export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export type WithoutFunctions<T> = Pick<T, NonFunctionPropertyNames<T>>;
