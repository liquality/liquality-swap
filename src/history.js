import { createBrowserHistory } from 'history'

const history = createBrowserHistory({basename: window.location.pathname})

export default history
