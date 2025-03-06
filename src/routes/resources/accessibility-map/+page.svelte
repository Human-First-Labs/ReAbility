<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import { onMount, onDestroy } from 'svelte';
	import { slide } from 'svelte/transition';

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
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

<div class="map-container" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
	<div class="map" bind:this={mapContainer}></div>
</div>

<style>
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
