import {
  createSignal,
  Match,
  Suspense,
  Switch,
  type VoidComponent,
} from "solid-js";
import { add } from "~/server/queries";

const Home: VoidComponent = () => {
  const [num1, setNum1] = createSignal(1);
  const solution = add.createQuery(() => ({
    a: num1(),
    b: 2,
  }));

  return (
    <Suspense>
      <Switch>
        <Match when={solution.data}>
          <div class="font-bold">Num {solution.data}</div>
          <button
            class="border border-gray-300 p-3"
            onClick={() => setNum1((num) => num + 1)}
          >
            Increment
          </button>
        </Match>
        <Match when={solution.error}>
          <div>Error</div>
        </Match>
      </Switch>
    </Suspense>
  );
};

export default Home;
