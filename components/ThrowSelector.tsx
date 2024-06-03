'use client';
import { Throw } from '@/types/common';
import { LegSchema, RoundSchema, ThrowSchema } from '@/types/schemas';
import { createClient } from '@/supabase/client/client';
import { useState } from 'react';

const ThrowSelector = ({
	gameId,
	userId,
	throws,
}: {
	gameId: string;
	userId: string;
	throws: Throw[];
}) => {
	const supabase = createClient();
	const [currentRound, setCurrentRound] = useState(1);
	const [currentThrow, setCurrentThrow] = useState({ number: 1, multiplier: 1 });

	const handleNumberChange = (e: any) => {
		setCurrentThrow((prev) => ({
			...prev,
			number: parseInt(e.target.value, 10),
		}));
	};

	const handleMultiplierChange = (e: any) => {
		setCurrentThrow((prev) => ({
			...prev,
			multiplier: parseInt(e.target.value, 10),
		}));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const legData = {
			game_id: gameId,
			leg_number: Math.ceil(throws.length / 3) + 1,
		};

		const legShema = LegSchema.safeParse(legData);

		if(!legShema.success) {
			throw new Error('Invalid leg data');
		}

		const { data: addedLeg} = await supabase
			.from('legs')
			.insert([legData])
			.select('*')
			.single();

		if(!addedLeg) {
			throw new Error('Failed to add leg');
		}

		const roundData = {
			game_id: gameId,
			user_id: userId,
			leg_id: addedLeg.id,
			round_number: currentRound,
		};

		const roundSchema = RoundSchema.safeParse(roundData);

		if(!roundSchema.success) {
			throw new Error('Invalid round data');
		}

		const { data: addedRound} = await supabase
			.from('rounds')
			.insert([roundData])
			.select('*')
			.single();
	
		if(!addedRound) {
			throw new Error('Failed to add round');
		}

			const throwData = {
				value: currentThrow.number * currentThrow.multiplier,
				sector: currentThrow.number,
				multiplier: currentThrow.multiplier,
				round: currentRound,
				user_id: userId,
				game_id: gameId,
				leg_id: addedLeg.id,
				round_id: addedRound.id,
			};
			const throwSchema = ThrowSchema.safeParse(throwData);
			if (!throwSchema.success) {
				throw new Error('Invalid throw data');
			}

		const { data: addedThrow } = await supabase
			.from('throws')
			.insert([throwSchema.data])
			.select('*')
			.single();
		setCurrentThrow({ number: 1, multiplier: 1 });
		setCurrentRound((prev) => (throws.length % 3 === 0 ? prev + 1 : prev));
	};
	return (
		<form onSubmit={handleSubmit} className="mb-4">
			<div className="mb-2">
				<label className="block text-sm font-medium text-gray-700">Sector</label>
				<select
					value={currentThrow.number}
					onChange={handleNumberChange}
					className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				>
					{[...Array(20)].map((_, i) => (
						<option key={i + 1} value={i + 1}>
							{i + 1}
						</option>
					))}
					<option value={25}>25</option>
				</select>
			</div>
			<div className="mb-2">
				<label className="block text-sm font-medium text-gray-700">Multiplier</label>
				<select
					value={currentThrow.multiplier}
					onChange={handleMultiplierChange}
					className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				>
					<option value={1}>1</option>
					<option value={2}>2</option>
					{currentThrow.number !== 25 && <option value={3}>3</option>}
				</select>
			</div>
			<button
				type="submit"
				className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Add Throw
			</button>
		</form>
	);
};

export default ThrowSelector;
