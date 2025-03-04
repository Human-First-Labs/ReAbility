export type SiteSection = '' | 'research' | 'reboot' | 'resources' | 'reach-out';
export const siteSections: SiteSection[] = ['', 'research', 'reboot', 'resources', 'reach-out'];

export const navigationOrder = [
	`/${siteSections[0]}`,
	`/${siteSections[1]}`,
	`/${siteSections[2]}`,
	`/${siteSections[3]}`,
	`/${siteSections[4]}`
];

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
