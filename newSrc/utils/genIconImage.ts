export enum IconType {
  QuestionCircle = '\ue63b',
  QuestionCircleO = '\uE63C',
  CloseCircle = '\ue62e',
  CloseCircleO = '\ue62f',
  UsergroupAdd = '\ue6dd',
  CheckCircle = '\uE630',
  CheckCircleO = '\uE631',
  ExclamationCircle = '\uE62C',
}

function genIconImage(text: IconType, color: string) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', '200');
  canvas.setAttribute('height', '200');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '200px anticon';
    ctx.fillStyle = color;
    ctx.fillText(text, 0, 0);
    return canvas.toDataURL();
  }
  return null;
}

export default genIconImage;
