'use client';

import ThrowSelector from '@/components/ThrowSelector';
import { Profile, Throw } from '@/types/common';
import { useState } from 'react';

type Props = {
	gameId: string;
	profiles: Profile[];
	throws: Throw[];
};

export default function GameSelectors(props: Props) {
	const { gameId, profiles, throws } = props;
	const [userId, setUserId] = useState<string | null>(profiles[0]?.id ?? null);
	return (
		<div>
			<div className="flex space-x-4">
				{profiles.map((profile) => (
					<button
						key={profile.id}
						onClick={() => setUserId(profile.id)}
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						{profile.username ?? profile.id}
					</button>
				))}
			</div>
			{userId && <ThrowSelector gameId={gameId} throws={throws} userId={userId} />}
		</div>
	);
}
