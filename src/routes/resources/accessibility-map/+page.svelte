<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import { onMount, onDestroy } from 'svelte';
	import { slide } from 'svelte/transition';
	import mapPoints from '$lib/content/accessibility-map.json';
	import type { ContentSentence } from '$lib/text-translator/types';
	import { chooseLanguage } from '$lib/text-translator/translator-state.svelte';

	interface MapPoint {
		id: string;
		name: ContentSentence;
		description: ContentSentence;
		latitude: number;
		longitude: number;
		googleMapsLink: string;
		'accessibility-information': {
			'overall-rating-1-5': number;
			text: ContentSentence;
			'specific-issues': {
				name: ContentSentence;
				description: ContentSentence;
				image: string;
			}[];
			'accessibility-features-1-5': {
				parking: number;
				toilets: number;
				paths: number;
				seating: number;
				shelter: number;
				assistance: number;
			};
		};
	}

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
							features: mapPoints.map((point: MapPoint) => {
								return {
									type: 'Feature',
									geometry: {
										type: 'Point',
										coordinates: [point.longitude, point.latitude]
									},
									properties: {
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

						//TODO scroll to target on click
						popup.on('click', () => {});
					};

					map.on('mouseenter', 'places', onMouseEnter);

					map.on('mouseleave', 'places', () => {
						map.getCanvas().style.cursor = '';
						popup.remove();
					});

					map.on('touchstart', 'places', onMouseEnter);
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
</script>

<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }} class="fullscreen column">
	<p>
		Most life changing injury comes with some form or level of inability of movement. Be it the use
		of a wheelchair, or simply the inability to walk for very long, this can make it difficult to
		get around. This makes it important that before commiting to visiting somewhere, you would want
		to know how accessible it is. Unfortunately, while there is a lot of information out there, it
		is usually either outdated, not detailed enough, or incomplete.
	</p>
	<p>
		To help with this, we have created a map with the intention of building a list of places with
		very detailed accessibility information, so that you can know what to expect before you go.
	</p>
	<div id="map-view" class="map-container">
		<div
			style={!mapLoaded ? 'visibility: hidden' : undefined}
			class="map"
			bind:this={mapContainer}
		></div>
	</div>
	<div class="column list">
		{#each mapPoints as point}
			<div class="column">
				<div class="row location-row">
					<div class="column">
						<h3 class="no-margin">{chooseLanguage(point.name)}</h3>
						<p class="no-margin">
							Overall rating: {point['accessibility-information']['overall-rating-1-5']}/5
						</p>
					</div>
					<div class="row action-row">
						<a href="#map-view" class="hfl-a">
							<button
								class="normal-button hfl-button"
								onclick={() => {
									moveMap(point.longitude, point.latitude, 15);
								}}
							>
								View on Map
							</button>
						</a>
						<button
							class="normal-button hfl-button"
							onclick={() => (expandedPoint = expandedPoint === point.id ? '' : point.id)}
						>
							{expandedPoint === point.id ? 'Show Less' : 'Show More'}
						</button>
					</div>
				</div>
				{#if expandedPoint === point.id}
					<div class="column" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
						<div class="row">
							<div class="half-width column"></div>
							<div class="half-width column">
								<p>{chooseLanguage(point.description)}</p>
							</div>
						</div>

						<p>{chooseLanguage(point['accessibility-information'].text)}</p>
						<div class="row">
							{#each point['accessibility-information']['specific-issues'] as issue}
								<div class="card">
									<h4>{chooseLanguage(issue.name)}</h4>
									<p>{chooseLanguage(issue.description)}</p>
									<img src={issue.image} alt={chooseLanguage(issue.name)} />
								</div>
							{/each}
						</div>

						{#each Object.entries(point['accessibility-information']['accessibility-features-1-5']) as [key, value]}
							<div class="card">
								<h4>{key}</h4>
								<p>{value}</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
			<hr class="hfl-hr" />
		{/each}
	</div>
	<p>
		Think we ought to add a place you like? Or hoping that we'll review a place you're interested
		in? <a href="/reach-out/contact-us" class="hfl-a">Reach out!</a>
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
</style>
