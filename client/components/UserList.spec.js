/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import UserList from './UserList'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserList', () => {
  let userList

  beforeEach(() => {
    const wrapper = shallow(
      <UserList firstName="Cody" lastName="Cody" email="cody@email.com" />
    )
  })

  it('renders the email in an h3', () => {
    expect(wrapper.text()).to.be.include(' cody@email.com')
  })
})
