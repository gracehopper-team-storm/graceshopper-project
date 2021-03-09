//load state from local storage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    console.log(serializedState)
    //NEEDS TO CREATE ACTION CREATOR AND DISPATCH IT
    dispatch(gotCart(JSON.parse(serializedState)))
  } catch (err) {
    console.log(err)
    return undefined
  }
}

//puts state in local storage
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
    //NEEDS TO CREATE ACTION CREATOR AND DISPATCH IT
  } catch {
    // ignore write errors
    console.log('uh ohh')
  }
}
