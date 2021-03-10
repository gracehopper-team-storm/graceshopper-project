/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout, login, auth} from '../client/store/redux/user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../client/history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET USER action', async () => {
      const fakeUser = {email: 'Cody'}
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      await store.dispatch(me())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].user).to.be.deep.equal(fakeUser)
    })
  })

  describe('login', () => {
    it('log:in: dispatches the GET_USER action', async () => {
      let email = 'harryPotter@email.com'
      let password = '1234'
      let method = 'login'
      mockAxios.onPost('/auth/login').replyOnce(204)
      await store.dispatch(login(email, password, method))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
    })
  })

  describe('signup', () => {
    it('signup: if the same email exists in the database already send 401 error', async () => {
      let firstName = 'Harry'
      let lastName = 'Potter'
      let email = 'harryPotter@email.com'
      let password = '1234'
      let method = 'login'
      mockAxios.onPost('/auth/login').replyOnce(204)
      await store.dispatch(auth(firstName, lastName, email, password, method))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_USER')
      expect(history.location.pathname).to.be.equal('/login')
    })
  })
})
