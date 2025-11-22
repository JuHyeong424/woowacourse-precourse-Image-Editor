export const READ_CENTER_PIXEL_FN = `
  (canvas) => {
    const ctx = canvas.getContext("2d");
    const cx = Math.floor(canvas.width / 2);
    const cy = Math.floor(canvas.height / 2);

    let r = 0, g = 0, b = 0;
    let count = 0;

    for (let dx = -2; dx <= 2; dx++) {
      for (let dy = -2; dy <= 2; dy++) {
        const { data } = ctx.getImageData(cx + dx, cy + dy, 1, 1);
        r += data[0];
        g += data[1];
        b += data[2];
        count++;
      }
    }

    return [
      Math.round(r / count),
      Math.round(g / count),
      Math.round(b / count)
    ];
  }
`;

export const READ_SINGLE_PIXEL_FN = `
  (canvas, x, y) => {
    const ctx = canvas.getContext("2d");
    const { data } = ctx.getImageData(x, y, 1, 1);
    return [data[0], data[1], data[2]];
  }
`;
