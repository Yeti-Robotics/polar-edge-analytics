import { useEffect, useState } from "react";

export function useOnlineStatus() {
	const [isOnline, setIsOnline] = useState(false);

	useEffect(() => {
		const handleOnline = () => {
			setIsOnline(true);
		};

		const handleOffline = () => {
			setIsOnline(false);
		};

		const onlineListener = window.addEventListener("online", handleOnline);
		const offlineListener = window.addEventListener(
			"offline",
			handleOffline
		);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	return { isOnline };
}
