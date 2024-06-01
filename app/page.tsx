import Leaderboard from '@/components/Leaderboard';

export default async function Index() {
	return (
		<div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl py-3 px-3">
			<Leaderboard />
		</div>
	);
}
