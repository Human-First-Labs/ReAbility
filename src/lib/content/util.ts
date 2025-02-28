export const navigationOrder = ['/', '/research', '/reboot', '/resources', '/reach-out'];

export const directionCheck = (previous: string, current: string) => {
	const previousIndex = navigationOrder.indexOf(previous);

	if (previousIndex === -1) {
		return null;
	}

	const currentIndex = navigationOrder.indexOf(current);

	return previousIndex < currentIndex
		? {
				out: {
					y: 50,
					duration: 500
				},
				in: {
					y: -50,
					duration: 500
				}
			}
		: {
				out: {
					y: -50,
					duration: 500
				},
				in: {
					y: 50,
					duration: 500
				}
			};
};
