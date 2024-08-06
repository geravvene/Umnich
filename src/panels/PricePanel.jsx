import { useState } from "react";
import { useForm } from "react-hook-form";
import calculate from "./func";
import CalcTable from "./CalcTable";
import CalcText from "./CalcText";

const style = {
  input: {
    margin: "10px",
    padding: "5px",
    width: "100%",
  },
};

function PricePanel() {
  const [state, setState] = useState(0);
  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
    resetOptions: {
      keepDirty: true,
    },
  });

  function onSubmit(data) {
    const { dprice, dbuy, dvolume, dstop, itog, form } = data;

    setState({
      form: form == "true" ? true : false,
      ...calculate({
        price: +dprice,
        volume_: +dvolume,
        stop: +dstop / 10000,
        buy: dbuy == "true" ? true : false,
        price_of_punkt: +dvolume * 10,
        itog: itog,
      }),
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue={state.price}
          type="number"
          step="any"
          {...register("dprice", { required: true })}
          placeholder="цена входа"
          style={style.input}
        />
        <input
          defaultValue={state.volume}
          type="number"
          step="any"
          {...register("dvolume", { required: true })}
          placeholder="объём"
          style={style.input}
        />
        <input
          defaultValue={state.stop}
          type="number"
          step="any"
          {...register("dstop", { required: true })}
          placeholder="стоп"
          style={style.input}
        />
        <input
          defaultValue={state.itog}
          type="number"
          step="any"
          {...register("itog", { required: true })}
          placeholder="итог"
          style={style.input}
        />
        <select name="тип" {...register("dbuy", { required: true })}>
          <option value="true">Buy</option>
          <option value="false">Sell</option>
        </select>

        <button style={{ margin: "20px", "background-color": "black", color: "white"}} type="submit">
          Алга!
        </button>
        <select name="тип" {...register("form", { required: true })}>
          <option value="true">Таблица</option>
          <option value="false">Текст</option>
        </select>
      </form>
      {state ? (
        <div>
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

export default PricePanel;
