/* eslint react/prop-types: 0 */
/* eslint-disable-next-line import/no-extraneous-dependencies  */
import renderer from 'react-test-renderer'
import React, {Component} from 'react'
import {register} from '../../reim/src'
import {createContext, pipeTo} from '../src'

test('pipeTo should pipe props to store', () => {
  const store = register({yer: 43}).plugin(createContext)

  const PipeToStore = pipeTo(store)

  class PipeSource extends Component {
    state = {
      magic: 100,
      deeply: {
        nested: 'thing'
      }
    }

    render() {
      return (
        <div>
          <PipeToStore {...this.state}/>
        </div>
      )
    }
  }

  const component = renderer.create(<PipeSource/>)
  const {instance} = component.root

  instance.setState(state => ({
    magic: state.magic + 8888
  }))
  expect(store.state.magic).toEqual(100 + 8888)
})
