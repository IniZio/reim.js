import {Store, State} from 'reim'

export default function task(func: {(...args: any[]): any}, subscriber: {(state: State): any}): Store