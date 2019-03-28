# Hooks Todo

## What did I use?

## What did I learn?

### React Context
React Context can pass state without using props
(1) createContext and export
export const UserContest = React.createCotnext()

(2) use Provider
<UserContext.Provider value={username}>
<App />
</UserContext.Provider>,

(3) Import
There are two ways.
<code>
const value = useContext(UserContext);
return <div>Hello, {value}!</div>
</code>
=====
<code>
<UserContext.Consumer>
{value => <div>Hello, {value}</div>}
</UserContext.Consumer>
</code>

### Global State Management
useReducer