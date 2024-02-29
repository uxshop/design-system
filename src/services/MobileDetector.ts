const widthLessThan = (width: number) => {
	return window.innerWidth <= width
}

const detector = (width = 600) => {
	const regexMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
	return regexMobile.test(navigator.userAgent) || widthLessThan(width)
}

export default detector
