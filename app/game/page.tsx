'use client';
import { SubmitButton } from '@/components/SubmitButton';
import { Profile } from '@/types/common';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Game({
	searchParams,
}: {
	searchParams: { type: string; message?: string };
}) {
	const supabase = createClient();
	const router = useRouter();
	const [remoteProfiles, setRemoteProfiles] = useState<Profile[]>([]);
	const [selectedProfiles, setSelectedProfiles] = useState<Profile[]>([]);

	useEffect(() => {
		const fetchProfiles = async () => {
			const { data: profiles } = await supabase.from('profiles').select();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				const findUser = profiles?.find((profile) => profile.id === user.id);
				setSelectedProfiles([findUser]);
			}
			setRemoteProfiles(profiles ?? []);
		};
		fetchProfiles();
	}, [supabase]);

	const handleToggleUser = (user: Profile) => {
		if (selectedProfiles.includes(user)) {
			setSelectedProfiles(selectedProfiles.filter((u) => u !== user));
		} else {
			setSelectedProfiles([...selectedProfiles, user]);
		}
	};

	const handleStartGame = async () => {
		if (!selectedProfiles.length) {
			return router.replace(
				`/game?type=${searchParams.type}&message=Please select at least one participant`,
			);
		}
		const { data: game } = await supabase
			.from('games')
			.insert([
				{
					type: searchParams.type,
					game_mode: searchParams.type === 'competitive' ? '501' : 'around_the_clock',
				},
			])
			.select('*')
			.single();
		if (!game) {
			return router.replace(`/game?type=${searchParams.type}&message=Could not start game`);
		} else {
			await supabase.from('game_participants').insert(
				selectedProfiles.map((profile) => ({
					game_id: game.id,
					participant_id: profile.id,
				})),
			);
			return router.push(`/game/${game.id}`);
		}
	};

	return (
		<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
			<form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
				<div className="sm:flex sm:items-start">
					<div className="mt-3 text-center sm:mt-0 sm:text-left">
						<h3 className="text-lg leading-6 font-medium text-gray-900">Select Participants</h3>
						<div className="mt-2">
							<ul className="space-y-2">
								{remoteProfiles.map((user) => (
									<li key={user.id} className="flex items-center">
										<input
											type="checkbox"
											checked={selectedProfiles.includes(user)}
											onChange={() => handleToggleUser(user)}
											className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
										/>
										<span className="ml-3 block text-sm font-medium text-gray-700">
											{user.username ?? user.id}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
					<SubmitButton
						formAction={handleStartGame}
						className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
						pendingText="Starting game..."
					>
						Start Game
					</SubmitButton>
				</div>
			</form>
			{searchParams?.message && (
				<p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
					{searchParams.message}
				</p>
			)}
		</div>
	);
}
