import { Profile, Throw } from '@/types/common';
import { toThrowString } from '@/utils/common';

import { groupBy } from 'lodash';

type Props = {
	profiles: Profile[];
	throws: Throw[];
};

export default function GameTable(props: Props) {
	const { profiles, throws } = props;
	const throwsByRound = groupBy(throws, 'round');
	return (
		<table>
			<thead>
				<tr>
					<th>Round</th>
					{profiles.map((profile) => (
						<th key={profile.id}>{profile.username ?? profile.id}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{Object.entries(throwsByRound).map(([round, throws]) => (
					<tr key={round}>
						<td>{round}</td>
						{profiles.map((profile) => {
							const userThrows = throws.filter((t) => t.user_id === profile.id);
							const userValues = userThrows
								.map((t) =>
									toThrowString({ sector: t.sector as any, multiplier: t.multiplier as any }),
								)
								.join(', ');
							const total = userThrows.reduce((acc, t) => acc + t.value, 0);
							return (
								<td key={profile.id}>
									{total} ({userValues})
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}
