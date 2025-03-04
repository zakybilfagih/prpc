/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type zod from 'zod'

export type InferReturnType<T> = T extends (...args: any[]) => infer R
  ? R extends Promise<infer R2>
    ? R2
    : R
  : never

export type ValueOrAccessor<T = unknown> = T extends undefined
  ? void | undefined
  : T | (() => T)

export type FilterOutResponse<T> = T extends Response
  ? never
  : T extends object
  ? { [K in keyof T]: FilterOutResponse<T[K]> }
  : T

export type ExpectedInput<T = void | undefined, Ctx = any> = {
  payload: T
  request$: Request
  ctx$: Ctx
}

export type FlattenArray<T> = T extends (infer U)[] ? U : T
export type InferFinalMiddlware<Mw extends IMiddleware[] | IMiddleware> =
  (Mw extends [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...infer _Start,
    infer Last
  ]
    ? InferReturnType<Last>
    : Mw extends IMiddleware
    ? InferReturnType<Mw>
    : Mw extends any[]
    ? InferReturnType<FlattenArray<[...Mw]>>
    : InferReturnType<Mw>) & {
    request$: Request
  }

export type ExpectedFn<T = any, Mw extends IMiddleware[] = any[]> = (
  props: ExpectedInput<
    T,
    FilterOutResponse<InferFinalMiddlware<FlattenArray<Mw>>>
  >
) => any

export type AsParam<
  Fn extends ExpectedFn,
  CAccessor extends boolean = true
> = CAccessor extends true
  ? ValueOrAccessor<UnwrapFnInput<Parameters<Fn>[0]>>
  : UnwrapFnInput<Parameters<Fn>[0]>

export type UnwrapFnInput<T> = T extends ExpectedInput<infer B> ? B : T

export type OmitQueryData<T> = Omit<T, 'queryKey' | 'queryFn'>

export type IMiddleware<T = any> = (ctx$: T & { request$: Request }) => any

export type ObjectParams<
  ZObj extends zod.ZodSchema | undefined | void,
  Mw extends IMiddleware[],
  Fn extends ExpectedFn<
    ZObj extends void | undefined
      ? void | undefined
      : ZObj extends zod.ZodSchema
      ? zod.infer<ZObj>
      : void,
    Mw
  >,
  isMutation extends boolean = false
> = {
  key: string
  schema?: ZObj
  middlewares?: Mw
} & (isMutation extends true
  ? {
      mutationFn: Fn
    }
  : {
      queryFn: Fn
    })
