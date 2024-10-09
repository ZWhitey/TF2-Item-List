<script async script lang="ts">
	import _ from 'lodash';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export const prerender = true;
	let tabSet: number = 0;

	type Item = {
		defindex: number;
		item_class: string;
		item_name: string;
		item_name_zh: string;
		used_by_classes: string[];
		name: string;
		attributes: any[];
	};

	type Unusual = {
		id: number;
		name: string;
		name_zh: string;
		system: string;
	};

	type Paint = {
		id: number;
		name: string;
		name_zh: string;
		colorRed: string;
		colorBlue: string;
		codeRed: string;
		codeBlue: string;
	};

	async function fetchUnusualData() {
		const res = await fetch('/effects.json');
		return await res.json();
	}
	async function fetchItemData() {
		const res = await fetch(`/items.json`);
		const items: Item[] = await res.json();

		_.forEach(items, (item) => {
			if (item.name.includes('Paint Can') && item.item_name !== 'Paint Can') {
				if (item.attributes.length < 2) {
					const cr = getColorHax(item.attributes[0].value);
					paintArr.push({
						id: item.defindex,
						name: item.item_name,
						name_zh: item.item_name_zh,
						colorRed: cr,
						colorBlue: cr,
						codeRed: item.attributes[0].value,
						codeBlue: item.attributes[0].value
					});
				} else {
					const cr = getColorHax(item.attributes[0].value);
					const cb = getColorHax(item.attributes[1].value);
					paintArr.push({
						id: item.defindex,
						name: item.item_name,
						name_zh: item.item_name_zh,
						colorRed: cr,
						colorBlue: cb,
						codeRed: item.attributes[0].value,
						codeBlue: item.attributes[1].value
					});
				}
			}
		});
		return items;
	}
	function getColorHax(color: any) {
		const r = (color & 0xff0000) >>> 16;
		const g = (color & 0x00ff00) >>> 8;
		const b = (color & 0x0000ff) >>> 0;
		const rs = r.toString(16).length < 2 ? `0${r.toString(16)}` : r.toString(16);
		const gs = g.toString(16).length < 2 ? `0${g.toString(16)}` : g.toString(16);
		const bs = b.toString(16).length < 2 ? `0${b.toString(16)}` : b.toString(16);
		return `#${rs}${gs}${bs}`;
	}

	onMount(() => {
		fetchItemData().then((data) => (tableArr = data));
		fetchUnusualData().then((data) => (unusualArr = data));
	});

	let tableArr: Item[] = [];
	let paintArr: Paint[] = [];
	let unusualArr: Unusual[] = [];
</script>

<div class="w-2/3 h-full mx-auto my-10 flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Team Fortress 2 Item List</h1>
		<TabGroup justify="justify-center">
			<Tab bind:group={tabSet} name="tab1" value={0}>物品</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>異常效果</Tab>
			<Tab bind:group={tabSet} name="tab3" value={2}>油漆</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<div class="table-container">
						<!-- Native Table Element -->
						<table class="table table-hover">
							<thead>
								<tr>
									<th class="table-cell-fit">DefIndex</th>
									<th class="table-cell-fit">Name</th>
									<th class="table-cell-fit">名稱</th>
									<th class="table-cell-fit">Class</th>
									<th class="table-cell-fit">可用職業</th>
								</tr>
							</thead>
							<tbody>
								{#each tableArr as row, i}
									<tr>
										<td class="table-cell-fit">{row.defindex}</td>
										<td class="table-cell-fit">{row.item_name}</td>
										<td class="table-cell-fit">{row.item_name_zh}</td>
										<td class="table-cell-fit">{row.item_class}</td>
										{#if row.used_by_classes?.length === 9 || !row.used_by_classes}
											<td class="table-cell-fit">全職業</td>
										{:else}
											<td class="table-cell-fit">
												<div class="flex">
													{#each row.used_by_classes ?? [] as cls}
														<img src={`/imgs/classes/${cls}.png`} alt={cls} class="w-6 h-6" />
													{/each}
												</div>
											</td>
										{/if}
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{:else if tabSet === 1}
					<div class="table-container">
						<!-- Native Table Element -->
						<table class="table table-hover">
							<thead>
								<tr>
									<th class="table-cell-fit">Id</th>
									<th class="table-cell-fit">Name</th>
									<th class="table-cell-fit">名稱</th>
									<th class="table-cell-fit">Particle System</th>
								</tr>
							</thead>
							<tbody>
								{#each unusualArr as row, i}
									<tr>
										<td class="table-cell-fit">{row.id}</td>
										<td class="table-cell-fit">{row.name}</td>
										<td class="table-cell-fit">{row.name_zh}</td>
										<td class="table-cell-fit">{row.system}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{:else if tabSet === 2}
					<div class="table-container">
						<!-- Native Table Element -->
						<table class="table table-hover">
							<thead>
								<tr>
									<th class="table-cell-fit">DefIndex</th>
									<th class="table-cell-fit">Name</th>
									<th class="table-cell-fit">名稱</th>
									<th class="table-cell-fit">Red</th>
									<th class="table-cell-fit">Blue</th>
								</tr>
							</thead>
							<tbody>
								{#each paintArr as row, i}
									<tr>
										<td class="table-cell-fit">{row.id}</td>
										<td class="table-cell-fit">{row.name}</td>
										<td class="table-cell-fit">{row.name_zh}</td>
										<td class="table-cell-fit" style="background-color: {row.colorRed};"
											>{row.codeRed}</td
										>
										<td class="table-cell-fit" style="background-color: {row.colorBlue};"
											>{row.codeBlue}</td
										>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</div>
