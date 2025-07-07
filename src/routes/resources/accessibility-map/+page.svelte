<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import { onMount, onDestroy } from 'svelte';
	import { slide } from 'svelte/transition';
	import { chooseLanguage, getContent } from '$lib/text-translator/translator-state.svelte';
	import { goto } from '$app/navigation';
	import type { MapItem } from '$lib/content/accessibility-map';
	import { mapData } from '$lib/content/accessibility-map';

	const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

	let map: mapboxgl.Map;
	let mapContainer: HTMLElement;

	let initialState = {
		lng: 14.3754,
		lat: 35.9375,
		zoom: 10
	};

	let moveMap: (lng: number, lat: number, zoom: number) => void;

	let mapLoaded = $state(false);

	onMount(() => {
		map = new mapboxgl.Map({
			container: mapContainer,
			accessToken: MAPBOX_TOKEN,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});

		map.on('load', () => {
			map.resize();
			mapLoaded = true;
			map.loadImage(
				'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
				(error, image) => {
					if (error || !image) {
						throw error;
					}

					map.addImage('marker', image);

					map.addSource('places', {
						type: 'geojson',
						data: {
							type: 'FeatureCollection',
							features: mapData.map((point: MapItem) => {
								return {
									type: 'Feature',
									geometry: {
										type: 'Point',
										coordinates: [point.longitude, point.latitude]
									},
									properties: {
										id: point.id,
										title: chooseLanguage(point.name)
									}
								};
							})
						}
					});

					map.addLayer({
						id: 'places',
						type: 'symbol',
						source: 'places',
						layout: {
							'icon-image': 'marker', // reference the image
							'icon-size': 0.75
						}
					});

					const popup = new mapboxgl.Popup({
						closeOnClick: false,
						className: 'map-popup'
					});

					const onMouseEnter = (e: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent) => {
						// Change the cursor style as a UI indicator.
						map.getCanvas().style.cursor = 'pointer';

						if (!e.features) {
							return;
						}

						// Copy coordinates array.
						//ignore error
						// @ts-ignore
						const coordinates = e.features[0].geometry.coordinates.slice();
						const title = e.features[0].properties?.title;

						// Ensure that if the map is zoomed out such that multiple
						// copies of the feature are visible, the popup appears
						// over the copy being pointed to.
						if (['mercator', 'equirectangular'].includes(map.getProjection().name)) {
							while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
								coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
							}
						}

						// Populate the popup and set its coordinates
						// based on the feature found.
						popup.setLngLat(coordinates).setHTML(title).addTo(map);
					};

					const navigateToTarget = async (e: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent) => {
						if (!e.features) {
							return;
						}

						const id = e.features[0].properties?.id;

						// expandedPoint = '';
						// quickExpandedPoint = id;
						expandedPoint = id;
						await goto('/resources/accessibility-map#' + id + '-row');
					};

					map.on('mouseenter', 'places', onMouseEnter);

					map.on('mouseleave', 'places', () => {
						map.getCanvas().style.cursor = '';
						popup.remove();
					});

					map.on('touchstart', 'places', onMouseEnter);

					map.on('click', 'places', navigateToTarget);
					map.on('touched', 'places', navigateToTarget);
				}
			);

			moveMap = (lng: number, lat: number, zoom: number) => {
				map.flyTo({
					center: [lng, lat],
					zoom: zoom
				});
			};
		});
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});

	let expandedPoint = $state<string>('');
	// let quickExpandedPoint = $state<string>('');
</script>

{#snippet rowInside(props: { point: MapItem })}
	<div class="row">
		<div class="half-width column"></div>
		<div class="half-width column">
			<p>{chooseLanguage(props.point.description)}</p>
		</div>
	</div>

	<p>{chooseLanguage(props.point['accessibility-information'].text)}</p>
	<div class="row">
		{#each props.point['accessibility-information']['specific-issues'] as issue}
			<div class="card">
				<h4>{chooseLanguage(issue.name)}</h4>
				<p>{chooseLanguage(issue.description)}</p>
				<img src={issue.image} alt={chooseLanguage(issue.name)} />
			</div>
		{/each}
	</div>

	{#each Object.entries(props.point['accessibility-information']['accessibility-features-1-5']) as [key, value]}
		<div class="card">
			<h4>{key}</h4>
			<p>{value}</p>
		</div>
	{/each}
{/snippet}

<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }} class="fullscreen column">
	<p>
		{getContent('accessibility-map-part-1')}
	</p>
	<p>
		{getContent('accessibility-map-part-2')}
	</p>
	<div id="map-view" class="map-container">
		<div
			style={!mapLoaded ? 'visibility: hidden' : undefined}
			class="map"
			bind:this={mapContainer}
		></div>
	</div>
	<div class="column list">
		{#each mapData as point}
			<div class="column">
				<div id="{point.id}-row" class="row location-row">
					<div class="column">
						<h3 class="no-margin">{chooseLanguage(point.name)}</h3>
						<p class="no-margin">
							{getContent('accessibility-rating-title')}
							{point['accessibility-information']['overall-rating-1-5']}/5
						</p>
					</div>
					<div class="row action-row">
						<a href="#map-view" class="basic-a">
							<button
								class="normal-button basic-button"
								onclick={() => {
									moveMap(point.longitude, point.latitude, 15);
								}}
							>
								{getContent('accessibility-map-view-on-map')}
							</button>
						</a>
						<button
							class="normal-button basic-button"
							onclick={() => {
								// if (quickExpandedPoint === point.id) {
								// 	quickExpandedPoint = '';
								// } else {
								// 	expandedPoint = expandedPoint === point.id ? '' : point.id;
								// }

								expandedPoint = expandedPoint === point.id ? '' : point.id;
							}}
						>
							<!-- {expandedPoint === point.id || quickExpandedPoint === point.id -->
							{expandedPoint === point.id
								? getContent('accessibility-map-show-less')
								: getContent('accessibility-map-show-more')}
						</button>
					</div>
				</div>
				{#if expandedPoint === point.id}
					<div class="column" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
						{@render rowInside({
							point
						})}
					</div>
					<!-- {:else if quickExpandedPoint === point.id}
					<div class="column">
						{@render rowInside({
							point
						})}
					</div> -->
				{/if}
			</div>
			<hr class="basic-hr" />
		{/each}
	</div>
	<p>
		{getContent('accessibility-map-part-3')}
		<a href="/reach-out/contact-us" class="basic-a">{getContent('accessibility-map-reach-out')}</a>
	</p>
</div>

<style>
	.fullscreen {
		width: 100%;
		gap: 10px;
		padding: 10px 0;
	}

	.map-container {
		position: relative;
		width: 100%;
		height: 600px;
	}

	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.list {
		gap: 15px;
		width: 100%;
		padding: 15px 0;
	}

	.no-margin {
		margin: 0;
	}

	.half-width {
		width: 50%;
		justify-content: space-between;
	}

	button {
		width: fit-content;
	}

	.action-row {
		gap: 10px;
		align-items: center;
	}

	.location-row {
		justify-content: space-between;
	}

	.basic-a {
		color: var(--secondary-color);
	}
</style>
