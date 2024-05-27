import { groupBy } from 'lodash';
import { createClient } from '@/utils/supabase/server';

import GameSelectors from './GameSelectors';
import { notNull } from '@/utils/common';
import GameTable from './GameTable';

export default async function GamePage({ params: { id } }: { params: { id: string } }) {
	const supabase = createClient();

	const { data: game } = await supabase.from('games').select().match({ id }).single();

	const { data: users } = await supabase
		.from('game_participants')
		.select('*, profiles(*)')
		.match({ game_id: id });

	const profiles = users?.map((u) => u.profiles).filter(notNull);

	const { data: throws } = await supabase.from('throws').select().match({ game_id: id });

	const throwsByUser = groupBy(throws, 'user_id');

	const scoreByUser = Object.entries(throwsByUser).map(([userId, userThrows]) => {
		const score = userThrows.reduce((acc, t) => acc + t.value, 0);
		return { userId, score };
	});

	return (
		<div className="flex-1 w-full flex flex-col gap-8 items-center">
			<h2 className="font-bold text-4xl mb-4">Points left</h2>
			<div className="flex flex-col gap-2  w-full px-4 py-2">
				{scoreByUser.map(({ userId, score }) => (
					<div
						key={userId}
						className="flex items-center justify-between w-full px-4 py-2 bg-gray-100"
					>
						<span>{userId}</span>
						<span>{501 - score}</span>
					</div>
				))}
			</div>
			<div className="flex flex-col gap-4 py-3">
				<GameSelectors gameId={id} profiles={profiles ?? []} throws={throws ?? []} />
				<div>
					<h2 className="text-xl font-semibold mb-2">Throws</h2>
					<GameTable profiles={profiles ?? []} throws={throws ?? []} />
				</div>
			</div>
		</div>
	);
}
