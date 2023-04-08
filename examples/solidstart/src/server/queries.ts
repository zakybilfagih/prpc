import {
  error$,
  hideRequest,
  middleware$,
  pipe$,
  query$,
  response$,
} from '@prpc/solid'
import { z } from 'zod'

const myMiddleware1 = middleware$(({ request$ }) => {
  console.log('ua', request$.headers.get('user-agent'))
  return { test: 'test' }
})

const middleWare2 = pipe$(myMiddleware1, (ctx) => {
  if (!ctx.test || ctx.test === 'tes') {
    return error$(`Expected test to be "test" but got ${ctx.test}`)
  }
  return {
    test: ctx.test,
    o: 1,
  }
})

const middleware3 = pipe$(middleWare2, (ctx) => {
  return {
    ...ctx,
    b: 2,
  }
})

export const cleanSyntaxQuery = query$({
  queryFn: async ({ payload, request$ }) => {
    console.log('called', request$.headers.get('user-agent'))
    return { result: payload.a + payload.b }
  },
  key: 'cleanSyntaxQuery',
  schema: z.object({
    a: z.number().max(5),
    b: z.number().max(10),
  }),
  middlewares: [middleware3],
})

const b = query$(
  ({ ctx$ }) => {
    ctx$.test
  },
  'b',
  myMiddleware1
)

export const authMw = middleware$(async ({ request$ }) => {
  const session = {} as null | { user: Record<string, string> | null }
  if (!session || !session.user) {
    return error$("You can't do that!")
  }
  return {
    session: {
      ...session,
      user: session.user,
    },
  }
})

const bb = query$(
  ({ ctx$ }) => {
    ctx$.session.user
  },
  'bb',
  authMw
)

const bb2 = query$({
  queryFn: ({ ctx$ }) => {
    ctx$.session.user
  },
  key: 'bb2',
  middlewares: [authMw],
})

export const add = query$(
  ({ payload, ctx$ }) => {
    console.log({ ctx$: hideRequest(ctx$) })
    const result = payload.a + payload.b
    return response$(
      { result },
      {
        headers: {
          'set-cookie': 'solid-testing=1',
        },
      }
    )
  },
  'add',
  z.object({
    a: z.number().max(5),
    b: z.number().max(10),
  }),
  middleware3
)

// async function test(){
//  const obj = z.object({
//     a: z.number().max(5),
//     b: z.number().max(10),
//   })
//   const res = await obj.safeParseAsync({a: 1, b: 2})
//   if(!res.success){
//     res.error.flatten().fieldErrors;
//   }
// }
export const decrease = query$(
  ({ payload }) => {
    const result = payload.a - payload.b
    return result
  },
  'decrease',
  z.object({
    a: z.number(),
    b: z.number(),
  })
)

export const noInputQuery = query$(
  ({ ctx$ }) => {
    return `Hello ${ctx$.test}`
  },
  'noInputQuery',
  myMiddleware1
)
