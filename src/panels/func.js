function toFixed(num, size) {
  return Math.round(num * Math.pow(10, size)) / Math.pow(10, size);
}

function calculate(data) {
  const { price, buy, volume_, stop, price_of_punkt, itog } = data;
  const dollar = 10;

  let flag = +itog;
  let step;

  let risk_dollar = Math.floor(price_of_punkt * stop * 10000);
  let zabrali = [];
  let volume = [volume_];
  let stop_loss = [buy ? price - stop : price + stop];
  let take_profit = [buy ? price + 3 * stop : price - 3 * stop];
  let price_after_stops = [];

  if (flag == 0) {
    zabrali[0] = -risk_dollar;
  } else {
    price_after_stops[0] = buy ? price + stop : price - stop;
    stop_loss[1] = buy ? price + 0.0001 : price - 0.0001;
    if (flag == 1) {
      zabrali[0] = 0.0001 * dollar * volume * 10000;
    } else {
      
      while (flag >= 1) {
        step = +itog - flag;
        price_after_stops[step + 1] = buy
          ? price + stop * (step + 2)
          : price - stop * (step + 2);

        if (step < 2) {
          zabrali[step] =
            Math.ceil((volume.at(-1) * 100) / 2) *
            dollar *
            (2 + step) *
            stop *
            100;
          volume[step + 1] = Math.floor((volume.at(-1) * 100) / 2) / 100;
        }
        if (step == 2) {
          zabrali[step] = volume.at(-1) * dollar * (+itog-1) * stop * 10000;
        }
        stop_loss[step + 2] = buy
          ? price + stop * (step + 1)
          : price - stop * (step + 1);
        take_profit[step + 1] = buy
          ? take_profit[step] + stop
          : take_profit[step] - stop;
        flag--;
      }
    }
  }

  let sum = 0;
  zabrali.forEach(function (num) {
    sum += num;
  });
  let zabrali_all = sum;
  let k_of_profit = zabrali_all / risk_dollar;

  let four = {
    price,
    stop,
    k_of_profit,
  };
  for (let el in four) four[el] = toFixed(four[el], 4);

  let two = {
    price_of_punkt,
    zabrali_all,
  };
  for (let el in two) two[el] = toFixed(two[el], 2);

  for (let i = 0; i < stop_loss.length; i++) {
    stop_loss[i] = toFixed(stop_loss[i], 4);
  }
  for (let i = 0; i < price_after_stops.length; i++) {
    price_after_stops[i] = toFixed(price_after_stops[i], 4);
    take_profit[i] = toFixed(take_profit[i], 4);
  }
  for (let i = 0; i < volume.length; i++) {
    volume[i] = volume[i].toFixed(2);
    zabrali[i] = toFixed(zabrali[i], 2);
  }
  four = { ...four, stop_loss, take_profit, price_after_stops };
  two = { ...two, zabrali, volume };

  return { ...four, ...two, risk_dollar, buy, itog: +itog };
}

export default calculate;
