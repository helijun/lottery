
export function throttle(fn, period) {
  var bingo = true, timer = -1;
  return function() {
    if (bingo) {
        var args = Array.prototype.slice.call(arguments, 0);
        var ret = fn.call(this, args);
        bingo = false;
        clearTimeout(timer);
        timer = setTimeout(function() {
            bingo = true;
        }, period);
        return ret;
    }
  }
}