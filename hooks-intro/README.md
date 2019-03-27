# How to change version of React

manually change "next" on JSON file
or
npm i react@next react-dom@next

# Hook

## Basics

- Enable to use state in functional component
- Bye Bye to class component (Personally I like class component as I feel like using OOP)
- But you can still use class component, of course.

## useState

- instead of creating state, we can useState
- RULE1 : this is function. Needs to use top of component
- RULE2 : set into 2 variables. (1)Snapshot of current state, (2)setState only for this particular value.
- can use prevCount to ensure previous value has been updated
- When related state, define initialState outside of function component.
- When unRelated state, define separately

## useEffect (Effect means side effect)

In order to change our title, we will need to interact with the browser API, in particular, the document API. But interacting with API is traditionally something we could only do with class components.
Can do so by using 'useEffect'.

- useEffect takes function as argument
- useEffect is executed every time after render

### 2 types of side effects

(1) Require cleanup
mouse move => dont' want to listen when component unmounted. This will cause memory leak
(2) Does not Require cleanup
document.title, network request ==> run side-effect and leave it

### Geolocation
can get latitude and longitude. Watch our current positoin and see if it changes. If we are moving, we can get current speed as it is watching.
Navigator.online = true # connected to internet
