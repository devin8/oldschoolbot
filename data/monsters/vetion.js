const vetion = {
	drops: {
		pet: '<:Vetion_jr:324127378999738369>',
		curvedBone: '<:Curved_bone:405264444256681985>',
		skeletonChampionScroll: '<:Skeleton_champion_scroll:406002360742182913>',
		ringOfTheGods: '<:Ring_of_the_gods:406002360947703808>',
		dragon2hSword: '<:Dragon_2h_sword:405250171593818112>',
		dragonPickaxe: '<:Dragon_pickaxe:406000287841779716>'
	},
	kill(quantity) {
		const loot = [];
		for (let i = 0; i < quantity; i++) {
			if (this.roll(5000)) loot.push(this.drops.skeletonChampionScroll);
			if (this.roll(5000)) loot.push(this.drops.curvedBone);
			if (this.roll(2000)) loot.push(this.drops.pet);
			if (this.roll(512)) loot.push(this.drops.ringOfTheGods);
			if (this.roll(256)) loot.push(this.drops.dragon2hSword);
			if (this.roll(171)) loot.push(this.drops.dragonPickaxe);
		}
		return loot.join(' ');
	},
	roll(max) {
		return Math.floor((Math.random() * max) + 1) === 1;
	}
};

module.exports = vetion;
