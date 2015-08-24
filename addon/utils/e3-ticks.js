const {abs, ceil, floor, pow, log, LN10} = Math;

export default function e3Ticks(domain, ticks) {
  if(domain) {
    return linearTickRange(domain, ticks);
  } else {
    return [];
  }
}

function linearTickRange(extent, m = 10) {
  let span = extent[1] - extent[0],
      step = pow(10, floor(log(span / m) / LN10)),
      err = m / span * step;

  // Filter ticks to get closer to the desired count.
  if (err <= .15) step *= 10;
  else if (err <= .35) step *= 5;
  else if (err <= .75) step *= 2;

  // Round start and stop values to step interval.
  return range(ceil(extent[0] / step) * step, floor(extent[1] / step) * step + step * .5, step);
}

function range(start, stop, step) {
  if (arguments.length < 3) {
    step = 1;
    if (arguments.length < 2) {
      stop = start;
      start = 0;
    }
  }
  if ((stop - start) / step === Infinity) throw new Error("infinite range");
  let range = [],
       k = integerScale(abs(step)),
       i = -1,
       j;
  start *= k, stop *= k, step *= k;
  if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k);
  else while ((j = start + step * ++i) < stop) range.push(j / k);
  return range;
}

function integerScale(x) {
  let k = 1;
  while (x * k % 1) k *= 10;
  return k;
}
