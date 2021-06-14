import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { ZoomControl } from 'mapbox-gl-controls';
import './Mapload.css';
import * as turf from '@turf/turf';
import './Modal.css';
import AnecdoteModal from './AnecdoteModal'
 
mapboxgl.accessToken = 'pk.eyJ1IjoicHJhbm1hbjExMTAiLCJhIjoiY2trdmg3dDNqMjBidTJ1czFjZnJhdXczbCJ9.iiySDdrwpE0p-hFUAKtU7Q';


const Mapload = () => {
    const mapContainerRef = useRef(null);
 
    const [busNo, setBusNo] = useState(null);
    const [lng, setLng] = useState(77.5985813140869);
    const [lat, setLat] = useState(12.943333543267157);
    const [zoom, setZoom] = useState(12.5);
    const [displayMenu, setDisplayMenu] = useState(false);
    const [journeyStarted, setJourneyStarted] = useState(false);
  
    // Initialize map when component mounts
    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/pranman1110/ckljhzuuy0ibx17qo8ulkjx1m',
        center: [lng, lat],
        zoom: zoom
      });

      // Add navigation control (the +/- zoom buttons)
      map.addControl(new ZoomControl(), 'top-right');
  
      map.on('move', () => {
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        setZoom(map.getZoom().toFixed(2));
      });

        var point = {
            'type': 'FeatureCollection',
            'features': [{
                'type': 'Feature',
                'properties': {
                    'description': 'random point to iterate',
                    'icon': 'bus'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [0,0]
                }
            }]
        };

        var point1 = {
            'type': 'FeatureCollection',
            'features': [{
                'type': 'Feature',
                'properties': {
                    'description': 'random point to iterate',
                    'icon': 'bus'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [0,0]
                }
            }]
        };

        var point2 = {
            'type': 'FeatureCollection',
            'features': [{
                'type': 'Feature',
                'properties': {
                    'description': 'random point to iterate',
                    'icon': 'bus'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [0,0]
                }
            }]
        };

        // Number of steps to use in the arc and animation, more steps means
        // a smoother arc and animation, but too many steps will result in a
        // low frame rate
        var steps = 3000;
        var prevStart = 0;
        var prevEnd = 0;
        var animationFrameId;
        var mute = false;
 
        var counter = 0;
        var markers = null;
 
        map.on('load', function () {

            map.addSource('currRoute', {
                'type': 'geojson',
                'data': point1
            });

            map.addLayer({
                'id': 'currRoute',
                'type': 'line',
                'source': 'currRoute',
                'layout': {
                'line-join': 'round',
                'line-cap': 'round'
                },
                'paint': {
                'line-color': '#2077ce',
                'line-width': 5
                }
            });

            map.addSource('currstops', {
                'type': 'geojson',
                'data': point2
            });

            map.addSource('point', {
                'type': 'geojson',
                'data': point
            });

            map.addLayer({
                'id': 'point',
                'source': 'point',
                'type': 'symbol',
                'layout': {
                    'icon-size': 2,
                    'icon-image': 'bus',
                    'icon-rotate': ['get', 'bearing'],
                    'icon-rotation-alignment': 'map',
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true
                }
            });

            // Add a source and layer displaying a point which will be animated in a circle

            map.addSource('busstops', {
                'type': 'geojson',
                'data': 'https://pranman11.github.io/bus-data/busstops.geojson'
            });

            map.addLayer({
                'id': 'busstops',
                'source': 'busstops',
                'type': 'symbol',
                'layout': {
                    'icon-size': 2.5,
                    'icon-image': 'bus',
                    'icon-rotate': ['get', 'bearing'],
                    'icon-rotation-alignment': 'map',
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true
                },
            });

            var popup = new mapboxgl.Popup();

            function animate(routeGeoJsonData) {
                    var start =
                    routeGeoJsonData.features[0].geometry.coordinates[
                        counter >= steps ? counter - 1 : counter
                    ];
                    var end =
                    routeGeoJsonData.features[0].geometry.coordinates[
                        counter >= steps ? counter : counter + 1
                    ];
                    // console.log("start: " + start + "end: " + end);
                    if (!start || !end || (prevStart === start && prevEnd === end)){
                        counter = 0;
                        
                        console.log("journey ended");
                        // map.flyTo({center: [lng, lat],
                        //     zoom: 12,
                        //     speed: 0.5,
                        // });
                        cancelAnimationFrame( animationFrameId );
                        map.getSource('point').setData(point1);
                        map.getSource('currRoute').setData(point1);
                        setJourneyStarted(false);
                        setDisplayMenu(false);
                        setBusNo(null);
                        return;
                    }
                    
                    prevStart = start;
                    prevEnd = end;
                    // Update point geometry to a new position based on counter denoting
                    // the index to access the arc
                    point.features[0].geometry.coordinates =
                    routeGeoJsonData.features[0].geometry.coordinates[counter];
                    
                    // Calculate the bearing to ensure the icon is rotated to match the route arc
                    // The bearing is calculated between the current point and the next point, except
                    // at the end of the arc, which uses the previous point and the current point
                    point.features[0].properties.bearing = turf.bearing(
                        turf.point(start),
                        turf.point(end)
                    );
                    
                    // Update the source with this new data
                    map.getSource('point').setData(point);
                    // map.panTo(start, {duration: 100});
                    
                    // Request the next frame of animation as long as the end has not been reached
                    if (counter < steps) {
                        animationFrameId = requestAnimationFrame(() => animate(routeGeoJsonData));
                    }
                    counter = counter + 1;
                }

            map.on('click', 'busstops', (e) => {
                if(!journeyStarted) {
                    setJourneyStarted(true);
                    map.getCanvas().style.cursor = 'pointer';
                    console.log(e.features[0].properties);
                    setBusNo(e.features[0].properties.busNo);
                    steps = e.features[0].properties.steps;
                    var busNo = e.features[0].properties.busNo;
                    var busStopName = e.features[0].properties.description;
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    var busRouteUrl = e.features[0].properties.busRouteUrl;

                    var audioJourney = new Audio(e.features[0].properties.journeySoundUrl);
                    var audioReturnJourney =  new Audio(e.features[0].properties.journeyReturnUrl)
                    var busStopAudio = new Audio(e.features[0].properties.soundUrl);
                    busStopAudio.play();

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }

                    popup.setLngLat(e.lngLat)
                        .setHTML('<p><strong>You are at '+busStopName + ' Bus Stop, waiting for bus '+ busNo +'</strong> to come. <i class="icon-volume-2"></i></p><br/><button id="startjourney-'+busNo+'">Start Journey</button><br><br><button id="startReturnjourney-'+busNo+'">Start Return Journey</button>')
                        .addTo(map);
                    
                    popup.on('close', function(e) {
                        busStopAudio.pause();
                    })
  
                    document.getElementById('startjourney-'+busNo).addEventListener('click', () => {
                        map.getSource('currRoute').setData(point1);
                        popup.remove();
                        console.log(this);

                        var routeGeoJsonData = null;
                        // audioJourney.addEventListener('loadeddata', (event) =>  {
                            document.getElementById('mute-button').addEventListener('click', () => {
                                if(!mute){
                                    console.log(mute);
                                    audioJourney.volume = 0;
                                    mute = true;
                                    console.log(mute);
                                } else {
                                    console.log(mute);
                                    audioJourney.volume = 1.0;
                                }
                            });

                            document.getElementById('refresh-map').addEventListener('click', () => {
                                counter = 0;
                        
                                console.log("journey ended");
                                // map.flyTo({center: [lng, lat],
                                //     zoom: 12,
                                //     speed: 0.5,
                                // });
                                cancelAnimationFrame( animationFrameId );
                                map.getSource('point').setData(point1);
                                map.getSource('currRoute').setData(point1);
                                audioJourney.pause();
                                setJourneyStarted(false);
                                setDisplayMenu(false);
                                setBusNo(null);
                            });

                            fetch(busRouteUrl)
                            .then(response => response.json())
                            .then(data => {
                                routeGeoJsonData = data;
                                map.getSource('currRoute').setData(routeGeoJsonData.features[0]);
    
                                var lineDistance = null;
                                lineDistance = turf.length(routeGeoJsonData.features[0]);
                                var arc = [];
        
                                console.log(routeGeoJsonData.features[0].geometry.coordinates[0]);
        
                                // map.flyTo({center: routeGeoJsonData.features[0].geometry.coordinates[0],
                                //     zoom: 13,
                                //     speed: 0.5,
                                // });
    
                                // Draw an arc between the `origin` & `destination` of the two points
                                for (var i = 0; i < lineDistance; i += lineDistance / steps) {
                                    var segment = turf.along(routeGeoJsonData.features[0], i);
                                    arc.push(segment.geometry.coordinates);
                                 }
                                routeGeoJsonData.features[0].geometry.coordinates = arc;
    
                                busStopAudio.pause();
                                audioJourney.play();
                                setTimeout(() => animate(routeGeoJsonData), 4000);
        
                                setDisplayMenu(true);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                        // });

                    });

                    document.getElementById('startReturnjourney-'+busNo).addEventListener('click', () => {
                        map.getSource('currRoute').setData(point1);
                        popup.remove();
                        console.log(this);

                        var routeGeoJsonData = null;

                            document.getElementById('mute-button').addEventListener('click', () => {
                                if(!mute){
                                    audioReturnJourney.volume = 0;
                                    mute = true;
                                } else {
                                    audioReturnJourney.volume = 1.0;
                                    mute = false;
                                }
                            });

                            document.getElementById('refresh-map').addEventListener('click', () => {
                                counter = 0;
                        
                                console.log("journey ended");
                                // map.flyTo({center: [lng, lat],
                                //     zoom: 12,
                                //     speed: 0.5,
                                // });
                                cancelAnimationFrame( animationFrameId );
                                audioReturnJourney.pause();
                                map.getSource('point').setData(point1);
                                map.getSource('currRoute').setData(point1);
                                setJourneyStarted(false);
                                setDisplayMenu(false);
                                setBusNo(null);
                            });
                            
                        fetch(busRouteUrl)
                        .then(response => response.json())
                        .then(data => {
                            routeGeoJsonData = data;
                            routeGeoJsonData.features[0].geometry.coordinates.reverse();
                            map.getSource('currRoute').setData(routeGeoJsonData.features[0]);
                            
                            var lineDistance = null;
                            lineDistance = turf.length(routeGeoJsonData.features[0]);
                            var arc = [];
    
                            console.log(routeGeoJsonData.features[0].geometry.coordinates[0]);
    
                            // map.flyTo({center: routeGeoJsonData.features[0].geometry.coordinates[0],
                            //     zoom: 13,
                            //     speed: 0.5,
                            // });

                            // Draw an arc between the `origin` & `destination` of the two points
                            for (var i = 0; i < lineDistance; i += lineDistance / steps) {
                                var segment = turf.along(routeGeoJsonData.features[0], i);
                                arc.push(segment.geometry.coordinates);
                             }
                            routeGeoJsonData.features[0].geometry.coordinates = arc;

                            busStopAudio.pause();
                            audioReturnJourney.play();
                            setTimeout(() => animate(routeGeoJsonData), 4000);
    
                            setDisplayMenu(true);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    });
                } else {
                    //
                }
            });
        });
      // Clean up on unmount
      return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    return (
      <div>
        {/* <Router>
            <SideNavbar />
            <Switch>
                <Route path='/about' component={About} />
                <Route path='/music' component={Music} />
            </Switch>
        </Router> */}
        <div className={`anecdote-modal ${displayMenu ? 'Show' : ''}`}>
            <AnecdoteModal busNo = {busNo}/>
        </div>
        <div className='map-container' ref={mapContainerRef} />
      </div>
    );
};
 
export default Mapload;
