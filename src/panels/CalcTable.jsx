import style from "./table.module.css";

function CalcTable({ data }) {
  return (
    <>
      <table style={style.table}>
        <thead>
          <tr>
            <th>тип</th>
            <th>цена входа</th>
            <th>объём</th>
            <th>стоп</th>
            <th>s/l</th>
            <th>t/p</th>
            <th>цена пункта</th>
            <th>риск</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.buy ? `buy` : `sell`} </td>
            <td>{data.price} </td>
            <td>{data.volume[0]} </td>
            <td>{data.stop}</td>
            <td>{data.stop_loss[0]} </td>
            <td>{data.take_profit[0]} </td>
            <td>{data.price_of_punkt} </td>
            <td>{data.risk_dollar}</td>
          </tr>
        </tbody>
      </table>
      {data.itog == 0 ? (
        <>
          <p>ушаталась</p>
        </>
      ) : (
        <table style={style.table}>
          <thead>
            <tr>
              <th>стопы</th>
              <th>Уровень</th>
              <th>s/l</th>
              <th>t/p</th>
              <th>объём</th>
              <th>Забрали</th>
            </tr>
          </thead>
          <tbody>
            {Array(data.itog)
              .fill()
              .map((_, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data.price_after_stops[i]}</td>
                  <td>{data.stop_loss[i + 1]}</td>
                  <td>{data.take_profit[i]}</td>
                  {i <= 2 ? (
                    <>
                      <td>{data.volume[i]}</td>
                      <td>
                        {i == 0
                          ? ""
                          : `${
                              Math.ceil((data.volume[i - 1] * 100) / 2) / 100
                            } | ${data.zabrali[i - 1]}$`}
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{data.volume.at(-1)}</td>
                      <td></td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <p>{`конечный профит=${data.zabrali.at(-1)}$`}</p>
      <p>{`общий профит=${data.zabrali_all}$`}</p>
      <p>{`коэффицент профитности=${data.k_of_profit}`}</p>
    </>
  );
}

export default CalcTable;
