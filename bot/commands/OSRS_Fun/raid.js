const { Command } = require('klasa');
const RaidsItems = require('../../../data/monsters/raids').drops;

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 1,
			description: 'Roll on the raids drop table based on the number of points specified',

			// Allow rolls to 1,710,000 points, which is the value that all 3
			// loot rolls cap at 80% chance for a drop
			usage: '<points:int{1,1710000}>'
		});
	}

	async run(msg, [points]) {
		return msg.send(RaidsUtil.raid(points));
	}

};

class RaidsUtil {

	static raid(points) {
		const chances = RaidsUtil.calculateChance(points);
		const loot = RaidsUtil.rollLoot(chances);
		return RaidsUtil.formatReply(points, chances, loot);
	}

	static calculateChance(points) {
		const chances = [];
		let cumulativeChance = points * LootChance.perPoint;
		for (let i = 0; i < LootChance.maxDrops; i++) {
			if (cumulativeChance > LootChance.cap) {
				chances.push(LootChance.cap);
				cumulativeChance -= LootChance.cap;
			} else {
				chances.push(cumulativeChance);
				break;
			}
		}
		return chances;
	}

	static rollLoot(chances) {
		return chances.map(chance => {
			if (Math.random() < chance) {
				const drop = RaidsUtil.pickFromTable();
				drop.olmlet = RaidsUtil.rollOlmlet();
				return drop;
			}
			return null;
		});
	}

	static pickFromTable() {
		const rnd = Math.floor(Math.random() * LootChance.totalWeight);
		return Object.values(RaidsItems).find(i => i.shortName === LootTable[rnd]);
	}

	static formatReply(points, chances, loot) {
		const plural = chances.length > 1 ? 's' : '';
		const reply = [
			`You finished a raid with ${points} points.`,
			`You get ${chances.length} roll${plural} on the loot table.`
		];

		chances.forEach((chance, i) => {
			const drop = loot[i] ? `${loot[i].name} ${RaidsItems[loot[i].shortName].emoji}` : 'You no lucky';
			const prefix = chances.length > 1 ? `Roll ${i + 1}: ` : '';
			const dropChance = Math.round(chance * 100);
			reply.push(`${prefix}${dropChance}% chance for a drop - ${drop}`);

			if (loot[i] && loot[i].olmlet) {
				reply.push(`${RaidsItems.pet.emoji}`);
			}
		});

		return reply.join('\n');
	}

	static rollOlmlet() {
		return Math.random() < LootChance.olmlet;
	}

}

const LootTable = ((lootWeights) => {
	const table = [];
	lootWeights.forEach(item => {
		for (let i = 0; i < item.weighting; i++) {
			table.push(item.shortName);
		}
	});
	return table;
})(Object.values(RaidsItems));

const LootChance = {
	// 1% per 7125 points
	perPoint: 0.01 / 7125,

	// 80% chance of an item
	cap: 0.8,

	// max 3 loot rolls per raid
	maxDrops: 3,
	totalWeight: LootTable.length,
	olmlet: 1 / 65
};
