import json
import networkx as nx
import os
import os.path as osp
import matplotlib.pyplot as plt
import numpy as np
from copy import deepcopy
from bisect import bisect_left, bisect_right

with open('busstops.geojson') as fd : 
    busStopData = json.load(fd)

busStops = list(map(lambda x : x['properties']['name'], busStopData['features']))
positions = list(map(lambda x : tuple(x['geometry']['coordinates']), busStopData['features']))
connectivityGraph = nx.MultiDiGraph()
for b, d in zip(busStops, busStopData['features']) : 
    connectivityGraph.add_node(b, location=d['geometry'])
pos = dict(zip(busStops, positions))
busFiles = list(filter(lambda x : x.startswith('2'), os.listdir()))

def getGeometry(d, geom) : 
    if isinstance(d, list) : 
        for thing in d : 
            yield from getGeometry(thing, geom)
    elif isinstance(d, dict) : 
        for k, v in d.items():  
            if k == 'type' and v == geom : 
                yield d
            else :
                yield from getGeometry(v, geom)

def getStops (busFile) : 
    with open(busFile) as fd : 
        data = json.load(fd) 
    return list(map(
        lambda x : x['properties']['name'],
        filter(
            lambda x : 'properties' in x \
            and 'name' in x['properties'], 
            data['features']
        )
    ))

def getData(busFile) : 
    with open(busFile) as fd : 
        return json.load(fd)

busNames = list(map(lambda x: osp.splitext(x)[0], busFiles))
allBusData = dict(zip(busNames, map(getData, busFiles)))
busRoutes = list(map(getStops, busFiles))

busDict = dict(zip(busNames, busRoutes))

condensedBusDict = dict()

def routeLen (coords) : 
    coords = list(map(np.array, coords))
    delta = list(map(lambda x, y : x - y, coords, coords[1:]))
    return sum(map(np.linalg.norm, delta))

def calculateChangePoints (coordinates) : 
    totalLen = routeLen(coordinates)
    pts = [12.5 * i for i in range(8)]
    idx = []
    percentages = [100 * routeLen(coordinates[:i]) / totalLen for i in range(len(coordinates))]
    for pt in pts : 
        idx.append(bisect_left(percentages, pt))
    return idx

def route(a, b, k): 
    routedata = deepcopy(next(getGeometry(allBusData[k], 'LineString')))
    ls = np.array(routedata['coordinates'])
    breakpoints = calculateChangePoints(routedata['coordinates'])
    mean = ls.mean(0)
    std = 1 # ls.std()
    aPt = np.array(pos[a])
    bPt = np.array(pos[b])
    normLS = (ls - mean) / std
    normA = (aPt - mean) / std
    normB = (bPt - mean) / std
    i = np.argmin(((normLS - normA) ** 2).sum(1))
    j = np.argmin(((normLS - normB) ** 2).sum(1))
    if i < j : 
        breakpoints = dict([(int(thing - i), breakpoints.index(thing)) for thing in breakpoints[bisect_left(breakpoints, i):bisect_right(breakpoints, j)]])
        routedata['coordinates'] = routedata['coordinates'][i:j+1]
    else :
        breakpoints = dict([(int(i - thing), breakpoints.index(thing)) for thing in breakpoints[bisect_left(breakpoints, j):bisect_right(breakpoints, i)]][::-1])
        routedata['coordinates'] = routedata['coordinates'][j:i+1][::-1]
    return dict(
        route=routedata,
        breakpoints=breakpoints,
    )

for k, v in busDict.items() : 
    condensedBusDict[k] = list(filter(lambda x : x in busStops, v))

count = 0
for k, v in condensedBusDict.items() :
    for a, b in zip(v, v[1:]) :
        f1 = f'../audio/edges/{k}/{a}-{b}/audio.mp3'
        f2 = f'../audio/edges/{k}/{b}-{a}/audio.mp3'
        count += osp.exists(f1)
        count += osp.exists(f2)
        front = route(a, b, k)
        back = route(b, a, k)
        frontLen = routeLen(front['route']['coordinates'])
        backLen = routeLen(back['route']['coordinates'])
        connectivityGraph.add_edge(
            a, 
            b, 
            bus=k, 
            length=frontLen,
            audio=osp.exists(f1),
            **front
        )
        connectivityGraph.add_edge(
            b, 
            a, 
            bus=k, 
            length=backLen,
            audio=osp.exists(f2),
            **back
        )
    

finalData = nx.node_link_data(connectivityGraph) 
with open('connectivity.json', 'w+') as fd : 
    json.dump(finalData, fd)
