function drawBmp(ctx, graphic, cx, cy, withAngle) {
    ctx.save(); // allows for an "undo translation/rotation" later?
    ctx.translate(cx, cy); // set the anchor point for the car graphic
    ctx.rotate(withAngle); // set the rotation of the car graphic
    ctx.drawImage(graphic, -graphic.width /2, -graphic.height / 2);
    ctx.restore(); // undo the translation/rotation since calling save()
}

function colorRect(ctx, x, y, width, height, color) {
  const prevColor = ctx.fillStyle;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  if (prevColor) {
    ctx.fillStyle = prevColor;
  }
}

function colorCircle(ctx, cx, cy, radius, color) {
  const prevColor = ctx.fillStyle;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, Math.PI*2, 0, true);
  ctx.fill();
  if (prevColor) {
    ctx.fillStyle = prevColor;
  }
}