<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import { onMount, onDestroy } from 'svelte';
	import { slide } from 'svelte/transition';
	import mapPoints from '$lib/content/accessibility-map.json';
	import type { ContentSentence } from '$lib/text-translator/types';
	import { chooseLanguage } from '$lib/text-translator/translator-state.svelte';

	interface MapPoint {
		id: number;
		name: ContentSentence;
		description: ContentSentence;
		latitude: number;
		longitude: number;
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
	let lng, lat, zoom;

	lng = 14.3754;
	lat = 35.9375;
	zoom = 10;

	let initialState = { lng, lat, zoom };

	onMount(() => {
		map = new mapboxgl.Map({
			container: mapContainer,
			accessToken: MAPBOX_TOKEN,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});

		map.on('load', () => {
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
				source: 'places',
				type: 'circle',
				paint: {
					'circle-radius': 6,
					'circle-color': '#B42222'
				}
			});

			const popup = new mapboxgl.Popup({
				closeButton: false,
				closeOnClick: false
			});

			map.on('mouseenter', 'places', (e) => {
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
			});

			map.on('click', 'places', () => {
				map.getCanvas().style.cursor = '';
				popup.remove();
			});

			map.on('mouseleave', 'places', () => {
				map.getCanvas().style.cursor = '';
				popup.remove();
			});
		});
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }} class="fullscreen column">
	<p>
		Most life changing injury comes with some form or level of inability of movement. Be it the use
		of a wheelchair, or simply the inability to walk for very long, this can make it difficult to
		get around. This makes it important that before commiting to a place, you would want to know how
		accessible it is, and while there is a lot of information out there, it is usually either
		outdated, not detailed enough, or incomplete.
	</p>
	<p>
		To help with this, we have created a map with the intention of building a list of places, and
		very detailed accessibility information, so that you can know what to expect before you go.
	</p>
	<div class="map-container">
		<div class="map" bind:this={mapContainer}></div>
	</div>
</div>

<style>
	.fullscreen {
		width: 100%;
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
</style>
