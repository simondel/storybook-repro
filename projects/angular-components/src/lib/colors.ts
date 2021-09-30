// @dynamic
export class Colors {

  static get headerColor(): string {
    return getPropertyValue('--header-color');
  }

}

function getPropertyValue(name: string): string {
  const doc = document.getElementById('root') ?? document.getElementsByClassName('root')[0];
  const propertyValue = getComputedStyle(doc).getPropertyValue(name);

  if (!propertyValue) {
    throw new Error(`Couldn't retrieve value for property '${name}'.`);
  }

  return propertyValue;
}
