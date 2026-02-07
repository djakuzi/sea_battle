import { useEffect, useRef, useState } from "react";

export interface IntrUseGetHeight {
	ref: React.RefObject<HTMLDivElement | null>;
	height: number;
	setHeight: React.Dispatch<React.SetStateAction<number>>
	updateHeight: () => void;
	updateIfNoHeight: () => void;
}

export function useGetHeight(): IntrUseGetHeight {
	const ref = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState<number>(0);

 	function updateHeight() {
		if (ref.current) {
			setHeight(ref.current.offsetHeight);
		}
	}

	function updateIfNoHeight() {
		if (!height) {
			updateHeight();
		}
	}

	useEffect(() => {
		updateHeight();
		window.addEventListener('resize', updateHeight)

		return () => {
			window.removeEventListener('resize', updateHeight)
		}
	}, [])

	return {
		ref,
		height,
		setHeight,
		updateHeight,
		updateIfNoHeight
	}
}