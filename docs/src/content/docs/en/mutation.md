---
title: 'mutation$'
description: 'API for the mutation$ function'
---

**API for the mutation$ function**

Converts the function to be a `server$` function and will add in zod validation if there is a zod object in the 2nd argument. Returns a `createMutation` is from `@adeora/solid-query`.

## Examples

### Without Zod

```ts
import { mutation$ } from '@prpc/solid'
import { isServer } from 'solid-js/web'

export const add = mutation$(
  (input: { a: number; b: number }) => {
    const result = input.a + input.b
    console.log(isServer)
    console.log('add', result)
    return result
  },
  () => ({
    key: 'add', // this will be used the mutation key for tanstack query
  })
)
```

### With Zod

```ts
export const decrease = mutation$(
  (input) => {
    const result = input.a + input.b
    console.log(isServer)
    console.log('add', result)
    return result
  },
  z.object({
    a: z.number(),
    b: z.number(),
  }),
  () => ({
    key: 'decrease',
  })
)
```

### Client Usage

```ts
import {
  createSignal,
  Match,
  Suspense,
  Switch,
  type VoidComponent,
} from 'solid-js'
import { add } from '~/server/mutations'

const Mutation: VoidComponent = () => {
  const [num1, setNum1] = createSignal(1)
  const mutationRes = add()
  return (
    <div>
      <Suspense>
        <Switch>
          <Match when={mutationRes.data}>
            <div>Num {mutationRes.data}</div>
          </Match>
          <Match when={mutationRes.error}>
            <div>Error</div>
          </Match>
        </Switch>
        <button onClick={() => setNum1((num) => num + 1)}>
          Increment {num1()}
        </button>
      </Suspense>
      <button
        onClick={() =>
          mutationRes.mutateAsync({
            a: num1(),
            b: 2,
          })
        }
      >
        Submit
      </button>
    </div>
  )
}
```

## API

### Creation

```ts
export function mutation$<
  ZObj extends ZodObject<any>,
  Fn extends ExpectedFn<z.infer<ZObj>>
>(
  queryFn: Fn,
  schema: ZObj,
  opts?: () => PRPCOptions
): (
  mutationOpts?: FCreateMutationOptions<InferReturnType<Fn>>
) => CreateMutationResult<InferReturnType<Fn>, Error, AsParam<Fn, false>>

export function mutation$<Fn extends ExpectedFn>(
  queryFn: Fn,
  opts?: () => PRPCOptions
): (
  mutationOpts?: FCreateMutationOptions<InferReturnType<Fn>>
) => CreateMutationResult<InferReturnType<Fn>, Error, AsParam<Fn, false>>
```

- First argument is the function to be wrapped with `server$`
- Second argument can either be the zod schema or key for `@adeora/solid-query`
- Third argument is only used when the 2nd is a zod schema, and needs to be the key.

### Usage

Returns a `createMutation` from `@adeora/solid-query`