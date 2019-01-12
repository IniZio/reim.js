import {Component} from 'react'

import {Mutation, Getter, Plugin, Store, State} from 'reim'

export type Setter = State | {(state: State):  void | State}

export function pipeTo(store: Store, mutation: Mutation): Component

export function context(): Plugin
export const createContext: Plugin

export const State: Component

export function connect(store: Store, getter?: Getter): {(Wrapped: Component): Component}
export function useReim(store: Store, getter?: Getter): [State, (mutation?: Mutation, ...args: any[]) => State, Store]
