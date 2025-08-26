import {useEffect, useRef} from 'react';

/**
 * Custom React hook that sets up an interval to repeatedly call a callback function
 * @param callback - The function to be called at each interval
 * @param delay - The time in milliseconds between each call, or null to pause the interval
 */
function useInterval(callback: () => void, delay: number | null) {
	// Create a mutable ref to store the latest callback function
	// This allows us to always call the most recent version of the callback
	// without needing to restart the interval when the callback changes
	const savedCallback = useRef<() => void>();

	// Update the ref with the latest callback on every render
	// This effect runs after every render where callback changes
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Setup Interval
	useEffect(() => {
		// Define the tick function that will be called by setInterval
		// It calls the callback stored in the ref (if it exists)
		function tick() {
			// Use optional chaining (?.) to safely call the callback if it exists
			savedCallback.current?.();
		}

		// Only set up the interval if delay is not null
		// This allows pausing the interval by passing null as delay
		if (delay !== null) {
			// Create the interval and store its ID
			let id = setInterval(tick, delay);
			// Return a cleanup function that clears the interval
			// This runs when the component unmounts or when delay changes
			return () => clearInterval(id);
		}
		// If delay is null, return early without setting up an interval
		return;
	}, [delay]); // This effect re-runs whenever delay changes
}

export default useInterval;
