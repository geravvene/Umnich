function CalcText({data}) {
  return (
    <div>
      <p>{`тип=${data.buy ? `buy` : `sell`} `}</p>
      <p>{`цена входа=${data.price} `}</p>
      <p>{`объём=${data.volume[0]}`}</p>
      <p>{`стоп=${data.stop}`}</p>
      <p>{`s/l=${data.stop_loss[0]}`}</p>
      <p>{`t/p=${data.take_profit[0]}`}</p>
      <p>{`цена пункта=${data.price_of_punkt}`}</p>
      <p>{`риск=${data.risk_dollar}`}</p>
      {data.itog == 0 ? (
        <>
          <p>ушаталась</p>
        </>
      ) : (
        <>
          <p>{`прошли в сторону тп размер стопа=${data.price_after_stops[0]}`}</p>
          <p>{`переводим сделку в безубыточный s/l=${data.stop_loss[1]}`}</p>
          {Array(data.itog - 1)
            .fill()
            .map((_, i) => (
              <>
                <p>{`прошли в сторону t/p ещё стоп=${
                  data.price_after_stops[i + 1]
                }`}</p>
                {i <= 1 ? (
                  <>
                    <p>{`режем сделку новый объём=${data.volume[i + 1]}`}</p>
                    <p>{`забрали=${data.zabrali[i]}`}</p>
                  </>
                ) : (
                  <></>
                )}

                <p>{`углубляем безубыток на размер стопа новый s/l=${
                  data.stop_loss[i + 2]
                }`}</p>
                <p>{`углубляем  на размер стопа новый t/p=${
                  data.take_profit[i + 1]
                }`}</p>
              </>
            ))}
        </>
      )}
      <p>{`профит=${data.zabrali_all}`}</p>
      <p>{`коэф проф=${data.k_of_profit}`}</p>
    </div>
  );
}

export default CalcText;
