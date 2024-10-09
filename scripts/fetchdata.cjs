const fs = require('node:fs/promises');
const _ = require('lodash');

const key = process.argv[2];
(async () => {
	await Promise.all([getItems(), getUnusual()]);
})();

async function getItems() {
	let start = 0;
	const items = [];
	while (true) {
		const url = `http://api.steampowered.com/IEconItems_440/GetSchemaItems/v0001/?key=${key}&language=en&start=${start}`;
		const data = await fetch(url).then((res) => res.json());

		const url2 = `http://api.steampowered.com/IEconItems_440/GetSchemaItems/v0001/?key=${key}&language=zh-TW&start=${start}`;
		const data2 = await fetch(url2).then((res) => res.json());

		items.push(
			..._.map(_.zip(data.result.items, data2.result.items), (it) => {
				const r = _.pick(it[0], [
					'defindex',
					'item_class',
					'item_name',
					'name',
					'used_by_classes',
					'image_url',
					'attributes'
				]);
				r.item_name_zh = it[1].item_name;
				return r;
			})
		);
		if (data.result.next) {
			start = data.result.next;
		} else {
			break;
		}
	}
	await fs.writeFile('./items.json', JSON.stringify(items, null, 2));
}

async function getUnusual() {
	const url = `http://api.steampowered.com/IEconItems_440/GetSchemaOverview/v0001/?key=${key}&language=en`;
	const data = await fetch(url).then((res) => res.json());

	const url2 = `http://api.steampowered.com/IEconItems_440/GetSchemaOverview/v0001/?key=${key}&language=zh-TW`;
	const data2 = await fetch(url2).then((res) => res.json());

	const effects = _.map(
		_.zip(
			data.result.attribute_controlled_attached_particles,
			data2.result.attribute_controlled_attached_particles
		),
		(it) => {
			const r = _.pick(it[0], ['id', 'name', 'system']);
			r.name_zh = it[1].name;
			return r;
		}
	);
	await fs.writeFile('./effects.json', JSON.stringify(effects, null, 2));
}
