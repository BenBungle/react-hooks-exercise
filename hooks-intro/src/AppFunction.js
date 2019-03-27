import React, { useState, useEffect } from "react";

// declare initial location state
const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
};

const App = () => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  const [{latitude, longitude, speed}, setLocation] = useState(initialLocationState);
  let mounted = true;

  useEffect(() => {
    document.title = `You have clicked ${count} times`;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // geolocation API does not have clean up function. But we need to avoid memory leak
    // That's why use boolean and toggle
    navigator.geolocation.getCurrentPosition(handleGeolocation);
    // watchposiiton has opposite method that allows us to remove the listener that we set
    // set it in variable so it will be easy to monitor
    const watchId = navigator.geolocation.watchPosition(handleGeolocation);
    // clean up function. replicating ComponentWillUnMount
    // clean up from the previous render before running the effects again or the next time
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      mounted = false;
    };
    // to avoid effect every render, I can add dependencies in []
    // count needs to updated whenever changed, so add count
    // works for component mount and unmount
  }, [count]);

  const handleGeolocation = event => {
    if (mounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed
      });
    }
  };

  const handleOnline = () => {
    setStatus(true);
  };
  const handleOffline = () => {
    setStatus(false);
  };

  const handleMouseMove = event => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY
    });
  };
  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const toggleLight = () => {
    setIsOn(prevIsOn => !prevIsOn);
  };

  return (
    <>
      <h2>Counter(Function)</h2>
      <button onClick={incrementCount}>I was clicked {count} times</button>;
      <h2>Toggle Light</h2>
      <img
        src={
          isOn
            ? "https://icon.now.sh/highlight/fd0"
            : "https://icon.now.sh/highlight/aaa"
        }
        style={{
          heigh: "50px",
          width: "50px"
        }}
        alt="flashlight"
        onClick={toggleLight}
      />
      <h2>Mouse Position</h2>
      {JSON.stringify(mousePosition, null, 2)}
      <br />
      <h2>Network status</h2>
      <p>
        You are <strong>{status ? "online" : "offline"}</strong>
      </p>
      <h2>Geolocation</h2>
      <p> Latitude is {latitude}</p>
      <p> Longitude is {longitude}</p>
      <p> Your speed is {speed ? speed : "0"}</p>
    </>
  );
};

export default App;
