const { Command } = require('klasa');
const osrs = require('osrs-wrapper');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 2,
			aliases: ['d'],
			description: 'Check which diaries your account has the required stats to complete',
			usage: '[user:user|username:str]',
			permLevel: 10
		});
	}

	async run(msg, [username]) {
		username = this.getUsername(username, msg);

		const { Skills } = await osrs.hiscores
			.getPlayer(username, 'Normal')
			.then(player => player)
			.catch(() => { throw this.client.notFound; });

		const Ardougne = this.canCompleteInDiary(Skills, ArdougneDiary);
		const Desert = this.canCompleteInDiary(Skills, DesertDiary);
		const Falador = this.canCompleteInDiary(Skills, FaladorDiary);
		const Fremennik = this.canCompleteInDiary(Skills, FremDiary);
		const Kandarin = this.canCompleteInDiary(Skills, KandDiary);
		const Karamja = this.canCompleteInDiary(Skills, KaramjaDiary);
		const Lumbridge = this.canCompleteInDiary(Skills, LumDiary);
		const Morytania = this.canCompleteInDiary(Skills, MoryDiary);
		const Varrock = this.canCompleteInDiary(Skills, VarrockDiary);
		const Western = this.canCompleteInDiary(Skills, WesternDiary);
		const Wilderness = this.canCompleteInDiary(Skills, WildyDiary);
		const embed = new this.client.methods.Embed()
			.setColor(11132490)
			.setThumbnail('https://i.imgur.com/wV9zvLM.png')
			.setDescription(username)
			.addField(
				'Diary',
				'Ardougne\nDesert\nFalador\nFremennik\nKandarin\nKaramja\nLumbridge/Draynor\nMorytania\nVarrock\nWestern Prov.\nWilderness',
				true
			)
			.addField(
				'You can complete:',
				`${this.canCompleteInDiary(Skills, ArdougneDiary)}\n${this.canCompleteInDiary(Skills, DesertDiary)}\n${this.canCompleteInDiary(Skills, FaladorDiary)}\n${Fremennik}\n${Kandarin}\n${Karamja}\n${Lumbridge}\n${Morytania}\n${Varrock}\n${Western}\n${Wilderness}`,
				true
			);
		return msg.send({ embed });
	}

	canCompleteInDiary(skills, diary) {
		const levelMap = ['Easy', 'Medium', 'Hard', 'Elite'];
		const canComplete = [];
		for (let i = 0; i < 4; i++) {
			for (const req of Object.keys(diary)) {
				if (req !== 'extraChecks') {
					const statLevel = skills[req].level;
					const statLevelRequirement = diary[req][i];
					if (statLevelRequirement === 0) continue;
					console.log(`has ${statLevel} ${req}, requirement is ${statLevelRequirement}`);
					console.log(`will break = ${(statLevel < statLevelRequirement).toString()}`);
					if (statLevel < statLevelRequirement) break;
				} else {
					if (!diary.extraChecks[i](skills)) break;
					canComplete.push(levelMap[i]);
				}
			}
		}
		return canComplete.length ? canComplete.join(', ') : '-';
	}

};


const ArdougneDiary = {
	Attack: [0, 50, 0, 0],
	Defence: [0, 0, 0, 0],
	Strength:	[0, 38, 0, 0],
	Hitpoints: [0, 0, 0, 0],
	Ranged: [0, 21, 0, 0],
	Prayer: [0, 0, 0, 0],
	Magic: [0, 51, 66, 94],
	Cooking: [0, 0, 0, 91],
	Woodcutting: [0, 0, 0, 0],
	Fletching: [0, 0, 0, 69],
	Fishing: [0, 0, 0, 81],
	Firemaking: [0, 50, 0, 0],
	Crafting: [0, 49, 0, 10],
	Smithing: [0, 0, 68, 91],
	Mining: [0, 0, 0, 0],
	Herblore: [0, 0, 0, 0],
	Agility: [0, 39, 0, 90],
	Thieving: [5, 38, 72, 82],
	Slayer: [0, 0, 0, 0],
	Farming: [0, 31, 70, 85],
	Runecrafting: [0, 0, 65, 0],
	Hunter: [0, 0, 59, 0],
	Construction: [0, 0, 50, 0],
	extraChecks: [
		() => true,
		() => true,
		() => true,
		() => true
	]
};

const DesertDiary = {
	Attack: [0, 0, 50, 0],
	Defence: [0, 0, 10, 0],
	Strength:	[0, 45, 0, 0],
	Hitpoints: [0, 0, 0, 0],
	Ranged: [0, 0, 0, 0],
	Prayer: [0, 0, 0, 85],
	Magic: [0, 0, 68, 94],
	Cooking: [0, 0, 0, 85],
	Woodcutting: [0, 35, 0, 0],
	Fletching: [0, 0, 0, 95],
	Fishing: [0, 0, 0, 0],
	Firemaking: [0, 0, 60, 0],
	Crafting: [0, 0, 55, 0],
	Smithing: [0, 0, 68, 0],
	Mining: [5, 0, 45, 0],
	Herblore: [0, 36, 0, 0],
	Agility: [0, 30, 70, 0],
	Thieving: [21, 25, 65, 91],
	Slayer: [0, 22, 65, 0],
	Farming: [0, 0, 0, 0],
	Runecrafting: [0, 0, 0, 0],
	Hunter: [5, 47, 0, 0],
	Construction: [0, 20, 0, 78],
	extraChecks: [
		() => true,
		() => true,
		() => true,
		() => true
	]
};

const FaladorDiary = {
	Attack: [0, 0, 0, 0],
	Defence: [0, 20, 50, 0],
	Strength:	[0, 37, 0, 0],
	Hitpoints: [0, 0, 0, 0],
	Ranged: [0, 19, 0, 0],
	Prayer: [0, 10, 70, 0],
	Magic: [0, 37, 0, 0],
	Cooking: [0, 0, 0, 0],
	Woodcutting: [0, 30, 0, 75],
	Fletching: [0, 0, 0, 0],
	Fishing: [0, 0, 0, 0],
	Firemaking: [0, 49, 0, 0],
	Crafting: [0, 40, 0, 0],
	Smithing: [13, 0, 0, 0],
	Mining: [10, 40, 60, 0],
	Herblore: [0, 0, 0, 81],
	Agility: [5, 42, 50, 80],
	Thieving: [0, 40, 50, 0],
	Slayer: [0, 32, 72, 0],
	Farming: [0, 23, 0, 91],
	Runecrafting: [0, 0, 56, 88],
	Hunter: [0, 0, 0, 0],
	Construction: [16, 0, 0, 0],
	extraChecks: [
		() => true,
		() => true,
		(atk, str) => atk + str >= 130 || (atk || str) === 99,
		() => 'Any 99 in a skill'
	]
};

const FremDiary = {
	Attack: [0, 0, 0, 0],
	Defence: [0, 0, 0, 0],
	Strength:	[0, 0, 0, 70],
	Hitpoints: [0, 0, 0, 70],
	Ranged: [0, 0, 0, 70],
	Prayer: [0, 0, 0, 0],
	Magic: [0, 0, 72, 0],
	Cooking: [0, 0, 0, 0],
	Woodcutting: [15, 0, 56, 0],
	Fletching: [0, 0, 0, 0],
	Fishing: [0, 0, 0, 0],
	Firemaking: [15, 0, 0, 0],
	Crafting: [23, 0, 0, 80],
	Smithing: [20, 0, 60, 0],
	Mining: [20, 40, 70, 0],
	Herblore: [0, 0, 66, 0],
	Agility: [0, 0, 0, 80],
	Thieving: [5, 42, 75, 0],
	Slayer: [0, 47, 0, 83],
	Farming: [0, 0, 0, 0],
	Runecrafting: [0, 0, 0, 82],
	Hunter: [11, 35, 55, 0],
	Construction: [0, 37, 0, 0],
	extraChecks: [
		() => true,
		() => true,
		() => 'cblevel >= 100',
		() => true
	]
};

const KandDiary = {
	Attack: [0, 0, 0, 0],
	Defence: [0, 0, 70, 0],
	Strength:	[0, 22, 50, 0],
	Hitpoints: [0, 0, 0, 0],
	Ranged: [0, 40, 0, 0],
	Prayer: [0, 0, 70, 0],
	Magic: [0, 45, 56, 87],
	Cooking: [0, 43, 80, 0],
	Woodcutting: [0, 0, 60, 0],
	Fletching: [0, 50, 70, 0],
	Fishing: [16, 46, 70, 76],
	Firemaking: [0, 0, 65, 85],
	Crafting: [0, 0, 10, 85],
	Smithing: [0, 0, 75, 90],
	Mining: [0, 0, 30, 0],
	Herblore: [0, 48, 0, 86],
	Agility: [20, 36, 60, 60],
	Thieving: [0, 47, 0, 0],
	Slayer: [0, 0, 0, 0],
	Farming: [13, 26, 0, 79],
	Runecrafting: [0, 0, 0, 0],
	Hunter: [0, 0, 0, 0],
	Construction: [0, 0, 50, 0],
	extraChecks: [
		() => true,
		() => true,
		() => true,
		() => true
	]
};

const KaramjaDiary = {
	Attack: [0, 0, 0, 0],
	Defence: [0, 0, 0, 0],
	Strength:	[0, 0, 50, 0],
	Hitpoints: [0, 0, 0, 0],
	Ranged: [0, 0, 42, 0],
	Prayer: [0, 0, 0, 0],
	Magic: [0, 0, 0, 0],
	Cooking: [0, 16, 30, 0],
	Woodcutting: [0, 50, 34, 0],
	Fletching: [0, 0, 0, 0],
	Fishing: [0, 65, 0, 0],
	Firemaking: [0, 0, 0, 0],
	Crafting: [0, 0, 0, 0],
	Smithing: [0, 0, 0, 0],
	Mining: [40, 40, 52, 0],
	Herblore: [0, 0, 0, 87],
	Agility: [15, 30, 53, 0],
	Thieving: [0, 0, 50, 0],
	Slayer: [0, 0, 50, 0],
	Farming: [0, 27, 0, 72],
	Runecrafting: [0, 0, 44, 91],
	Hunter: [0, 41, 0, 0],
	Construction: [0, 0, 0, 0],
	extraChecks: [
		() => true,
		() => true,
		() => 'cblevel >= 100',
		() => true
	]
};

const LumDiary = {
	Attack: [0, 0, 0, 0],
	Defence: [0, 0, 0, 0],
	Strength:	[0, 19, 0, 70],
	Hitpoints: [0, 0, 0, 0],
	Ranged: [0, 50, 0, 70],
	Prayer: [0, 0, 52, 0],
	Magic: [0, 31, 60, 0],
	Cooking: [0, 0, 0, 0],
	Woodcutting: [15, 30, 57, 75],
	Fletching: [0, 0, 0, 0],
	Fishing: [15, 30, 0, 0],
	Firemaking: [15, 0, 65, 0],
	Crafting: [0, 38, 70, 0],
	Smithing: [0, 0, 0, 88],
	Mining: [15, 0, 0, 0],
	Herblore: [0, 0, 0, 0],
	Agility: [10, 20, 46, 70],
	Thieving: [0, 38, 0, 78],
	Slayer: [7, 0, 0, 0],
	Farming: [0, 0, 63, 0],
	Runecrafting: [5, 23, 59, 76],
	Hunter: [0, 42, 0, 0],
	Construction: [0, 0, 0, 0],
	extraChecks: [
		() => true,
		() => 'cbLevel >= 70',
		() => true,
		() => true
	]
};

const MoryDiary = {
	Attack: [0, 0, 0, 70],
	Defence: [0, 0, 70, 70],
	Strength:	[0, 0, 0, 76],
	Hitpoints: [0, 0, 0, 0],
	Ranged: [0, 0, 0, 70],
	Prayer: [0, 0, 70, 0],
	Magic: [0, 0, 66, 83],
	Cooking: [12, 40, 0, 0],
	Woodcutting: [0, 45, 50, 0],
	Fletching: [0, 0, 0, 0],
	Fishing: [0, 0, 0, 96],
	Firemaking: [0, 0, 50, 80],
	Crafting: [15, 0, 0, 84],
	Smithing: [0, 35, 0, 0],
	Mining: [0, 0, 55, 0],
	Herblore: [0, 22, 0, 0],
	Agility: [0, 40, 71, 0],
	Thieving: [0, 0, 0, 0],
	Slayer: [15, 42, 58, 85],
	Farming: [23, 0, 53, 0],
	Runecrafting: [0, 0, 0, 0],
	Hunter: [0, 29, 0, 0],
	Construction: [0, 0, 50, 0],
	extraChecks: [
		() => 'cbLevel >= 20',
		() => true,
		() => true,
		() => true
	]
};

const VarrockDiary = {
	Attack: [0, 0, 0, 0],
	Defence: [0, 0, 0, 0],
	Strength:	[0, 0, 0, 0],
	Hitpoints: [0, 0, 0, 0],
	Ranged: [0, 0, 0, 0],
	Prayer: [0, 0, 52, 0],
	Magic: [0, 25, 54, 86],
	Cooking: [0, 0, 0, 95],
	Woodcutting: [0, 0, 60, 0],
	Fletching: [0, 0, 0, 81],
	Fishing: [20, 0, 0, 0],
	Firemaking: [0, 40, 60, 0],
	Crafting: [8, 0, 0, 0],
	Smithing: [0, 0, 0, 89],
	Mining: [15, 0, 0, 0],
	Herblore: [0, 10, 0, 90],
	Agility: [13, 30, 51, 0],
	Thieving: [5, 25, 0, 0],
	Slayer: [0, 0, 0, 0],
	Farming: [0, 25, 68, 0],
	Runecrafting: [9, 0, 0, 78],
	Hunter: [0, 0, 66, 0],
	Construction: [0, 0, 50, 0],
	extraChecks: [
		() => true,
		() => 'cbLevel >= 40',
		() => true,
		() => true
	]
};

const WildyDiary = {
	Attack: [0, 0, 0, 0],
	Defence: [0, 0, 0, 0],
	Strength:	[0, 0, 0, 60],
	Hitpoints: [0, 0, 0, 0],
	Ranged: [0, 0, 0, 0],
	Prayer: [0, 0, 0, 0],
	Magic: [21, 60, 66, 96],
	Cooking: [0, 0, 0, 90],
	Woodcutting: [0, 61, 0, 75],
	Fletching: [0, 0, 0, 0],
	Fishing: [0, 0, 53, 85],
	Firemaking: [0, 0, 0, 75],
	Crafting: [0, 0, 0, 0],
	Smithing: [0, 50, 75, 90],
	Mining: [15, 55, 0, 85],
	Herblore: [0, 0, 0, 0],
	Agility: [15, 0, 64, 60],
	Thieving: [0, 0, 0, 84],
	Slayer: [0, 50, 68, 83],
	Farming: [0, 0, 0, 0],
	Runecrafting: [0, 0, 0, 0],
	Hunter: [0, 0, 0, 0],
	Construction: [0, 0, 0, 0],
	extraChecks: [
		() => true,
		() => '60 Agility or 60 Strength',
		() => true,
		() => true
	]
};

const WesternDiary = {
	Attack: [0, 0, 0, 42],
	Defence: [0, 0, 0, 42],
	Strength:	[0, 0, 0, 42],
	Hitpoints: [0, 0, 0, 42],
	Ranged: [30, 30, 70, 42],
	Prayer: [0, 0, 0, 22],
	Magic: [0, 0, 64, 42],
	Cooking: [0, 42, 62, 0],
	Woodcutting: [0, 35, 50, 0],
	Fletching: [20, 5, 5, 85],
	Fishing: [0, 46, 62, 0],
	Firemaking: [0, 35, 50, 0],
	Crafting: [0, 0, 0, 0],
	Smithing: [0, 0, 0, 0],
	Mining: [15, 40, 70, 0],
	Herblore: [0, 0, 0, 0],
	Agility: [0, 37, 50, 85],
	Thieving: [0, 0, 75, 85],
	Slayer: [0, 0, 0, 93],
	Farming: [0, 0, 68, 75],
	Runecrafting: [0, 0, 0, 0],
	Hunter: [9, 31, 69, 0],
	Construction: [0, 0, 65, 0],
	extraChecks: [
		() => '40 combat',
		() => '70 combat',
		() => '100 combat',
		() => '40 combat'
	]
};
