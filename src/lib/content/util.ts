export type SiteSection = '' | 'research' | 'reboot' | 'resources' | 'reach-out';
export const siteSections: SiteSection[] = ['', 'research', 'reboot', 'resources', 'reach-out'];

export const navigationOrder = [
	`/${siteSections[0]}`,
	`/${siteSections[1]}`,
	`/${siteSections[2]}`,
	`/${siteSections[3]}`,
	`/${siteSections[4]}`
];
