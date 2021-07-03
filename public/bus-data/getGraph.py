import json
import networkx as nx
import os
import os.path as osp
import matplotlib.pyplot as plt
import numpy as np
from copy import deepcopy

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

def route(a, b, k): 
    routedata = deepcopy(next(getGeometry(allBusData[k], 'LineString')))
    ls = np.array(routedata['coordinates'])
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
        routedata['coordinates'] = routedata['coordinates'][i:j+1]
    else :
        routedata['coordinates'] = routedata['coordinates'][j:i+1][::-1]
    return routedata

for k, v in busDict.items() : 
    condensedBusDict[k] = list(filter(lambda x : x in busStops, v))

for k, v in condensedBusDict.items() :
    for a, b in zip(v, v[1:]) :
        connectivityGraph.add_edge(a, b, bus=k, route=route(a, b, k))
        connectivityGraph.add_edge(b, a, bus=k, route=route(b, a, k))


finalData = nx.node_link_data(connectivityGraph) 
with open('connectivity.json', 'w+') as fd : 
    json.dump(finalData, fd)
print(connectivityGraph.number_of_edges(), connectivityGraph.number_of_nodes())
