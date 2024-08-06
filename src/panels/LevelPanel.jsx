import { useState } from "react";
import { useForm } from "react-hook-form";
import calculate from "./func";
import CalcTable from "./CalcTable";
import CalcText from "./CalcText";

const styles = {
  input: {
    margin: "10px",
    padding: "5px",
    width: "100%",
  },
};

function LevelPanel() {
  const [state, setState] = useState(0);
  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
    resetOptions: {
      keepDirty: true,
    },
  });

  function onSubmit(data) {
    const { dlevel, dbuy, drisk, dstop, ddeposit, itog, form } = data;
    let riskDollar = Math.floor((+ddeposit * +drisk) / 100);
    let buy = dbuy == "true" ? true : false;
    setState({
      form: form == "true" ? true : false, dlevel, ddeposit,
      ...calculate({
        price: buy ? +dlevel + 0.0002 : +dlevel - 0.0002,
        volume_: Math.floor((riskDollar / +dstop) * 10) / 100,
        stop: +dstop / 10000,
        buy,
        price_of_punkt: riskDollar / +dstop,
        itog: itog,
      }),
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue={state.deposit}
          type="number"
          step="any"
          {...register("ddeposit", { required: true })}
          placeholder="депозит"
          style={styles.input}
        />
        <input
          defaultValue={state.level}
          type="number"
          step="any"
          {...register("dlevel", { required: true })}
          placeholder="уровень"
          style={styles.input}
        />
        <input
          defaultValue={state.risk}
          type="number"
          step="any"
          {...register("drisk", { required: true })}
          placeholder="риск"
          style={styles.input}
        />
        <input
          defaultValue={state.stop}
          type="number"
          step="any"
          {...register("dstop", { required: true })}
          placeholder="стоп"
          style={styles.input}
        />
        <input
          defaultValue={state.itog}
          type="number"
          step="any"
          {...register("itog", { required: true })}
          placeholder="итог"
          style={styles.input}
        />
        <select name="тип" {...register("dbuy", { required: true })}>
          <option value="true">Buy</option>
          <option value="false">Sell</option>
        </select>

        <button style={{ margin: "20px", "background-color": "black"}} type="submit">
          Алга!
        </button>
        <select name="тип" {...register("form", { required: true })}>
          <option value="true">Таблица</option>
          <option value="false">Текст</option>
        </select>
      </form>
      {state ? (
        <div>
          <p>{`депозит=${state.ddeposit}`}</p>
          <p>{`уровень=${state.dlevel}`}</p>
          {state.form ? (
            <CalcTable data={state}></CalcTable>
          ) : (
            <CalcText data={state}></CalcText>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default LevelPanel;
