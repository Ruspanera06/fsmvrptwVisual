import React, { useState, useEffect, useRef } from 'react'
import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import coseBilkent from 'cytoscape-cose-bilkent';
import spread from 'cytoscape-spread';
import cola from 'cytoscape-cola';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";
import useWebSocket, { ReadyState } from 'react-use-websocket';


//uncomment if you want an example
let nodes = [
    [0, 0, 0, 0],
    [5, 0, 100, 180],
    [10, 0, 90, 150],
    [7, 0, 200, 220],
    [23, 0, 115, 148],
    [15, 0, 347, 500],
    [6, 0, 264, 290],
    [71, 0, 410, 563],
    [4, 0, 380, 456],
    [16, 0, 683, 730],
    [38, 0, 587, 758],
    [9, 0, 350, 388],
    [46, 0, 864, 931],
    [3, 0, 451, 525],
    [16, 0, 711, 743],
    [8, 0, 385, 415]
];

let arcs = [
    [0, 1, 10], [0, 3, 40], [0, 5, 45], [1, 4, 5], [2, 4, 5],
    [2, 7, 10], [2, 5, 25], [3, 6, 10], [3, 2, 5], [4, 1, 25],
    [4, 6, 15], [5, 2, 5], [5, 3, 20], [6, 0, 10], [7, 0, 15],
    [8, 9, 10], [8, 11, 40], [8, 13, 45], [9, 12, 5], [10, 12, 5],
    [10, 15, 10], [10, 13, 25], [11, 14, 10], [11, 10, 5],
    [12, 9, 25], [12, 14, 15], [13, 10, 5], [13, 11, 20],
    [14, 8, 10], [15, 8, 15], [7, 15, 50], [15, 7, 50]
];

let vehicles = [
    [20, 20],
    [30, 35],
    [40, 50],
    [70, 120],
    [120, 225]
];

let originalArcs = null;

vehicles = vehicles.map((x, i) => {
    return {
        id: i,
        q: x[0],
        f: x[1],
    }
});

// comment if you want an example

// let nodes = [];
// let arcs = [];
// let vehicles = [];
// let originalArcs = null;



function Arc({ ele, setArcMenu }) {
    const arc = arcs[parseInt(ele.id().replace('n', ''), 10)];

    useEffect(() => {
        const modalInstance = new bootstrap.Modal(document.getElementById("menuModal"));
        modalInstance.show();
    }, []);

    function disposeModal() {
        setArcMenu(null)
        document.querySelectorAll('.modal-backdrop').forEach(e => e.remove());
    };

    function editStats() {
        let d = document.querySelector('#d').value;
        arc[2] = parseInt(d, 10);
        ele.data('label', arc[2]);
        disposeModal();
    }

    useEffect(() => {
        const handleContextMenu = (e) => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);


    return (
        <>
            <div
                className="modal fade"
                id="menuModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Modifica Arco
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={disposeModal}
                            />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="d" className="form-label">
                                    Peso
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="d"
                                    defaultValue={arc[2]}
                                    min={0}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={disposeModal}
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={editStats}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>);
}

function Node({ ele, setNodeMenu }) {
    // find the element
    let n = nodes[parseInt(ele.id(), 10)];

    // make the modal visible by activating the bootstrap script
    useEffect(() => {
        const modalInstance = new bootstrap.Modal(document.getElementById("menuModal"));
        modalInstance.show();
    }, []);

    //simply remove the bg
    function disposeModal() {
        setNodeMenu(null)
        document.querySelectorAll('.modal-backdrop').forEach(e => e.remove());
    };

    //updating the data of the node
    function editStats() {
        if (ele.id() == 0) {
            n[0] = 0;
            n[2] = 0;
            n[3] = 0;
            disposeModal();
        }
        else {
            let q = document.querySelector('#q').value;
            let a = document.querySelector('#a').value;
            let b = document.querySelector('#b').value;
            n[0] = parseInt(q, 10);
            n[2] = parseInt(a, 10);
            n[3] = parseInt(b, 10);
            disposeModal();
        }
    }

    //remove the rightclick default function 
    useEffect(() => {
        const handleContextMenu = (e) => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    return (
        <>
            <div
                className="modal fade"
                id="menuModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Modifica Nodo
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={disposeModal}
                            />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="q" className="form-label">
                                    Peso
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="q"
                                    defaultValue={n[0]}
                                    min={0}
                                    {...(ele.id() == 0 ? { max: 0 } : {})}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="a" className="form-label">
                                    Time Window Start
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="a"
                                    defaultValue={n[2]}
                                    min={0}
                                    {...(ele.id() == 0 ? { max: 0 } : {})}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="b" className="form-label">
                                    Time Window End
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="b"
                                    defaultValue={n[3]}
                                    min={0}
                                    {...(ele.id() == 0 ? { max: 0 } : {})}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={disposeModal}
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={editStats}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function Vehicle({ id, removeHandle, vehiclesState, onStateChange }) {


    function onChangeQ(n) {
        let copy = vehiclesState.slice();
        copy[copy.indexOf(copy.find(x => x.id == id))].q = n;
        onStateChange(copy);
    }

    function onChangeF(n) {
        let copy = vehiclesState.slice();
        copy[copy.indexOf(copy.find(x => x.id == id))].f = n;
        onStateChange(copy);
    }
    return (
        <>
            <li className="list-group-item position-relative bg-dark-subtle">
                <button
                    type="button"
                    className="btn-close position-absolute top-0 end-0 p-3 "
                    aria-label="Close"
                    onClick={removeHandle}
                />
                <div className='container mt-3'>
                    <div className='row'>
                        <div className='col-6'>
                            <label htmlFor={'q' + id} className="form-label">
                                Capacity
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                defaultValue={vehiclesState.find(x => x.id == id).q}
                                placeholder="Q"
                                id={'q' + id}
                                name={'q' + id}
                                onChange={(e) => onChangeQ(parseInt(e.target.value, 10))}
                                min={0}
                            />
                        </div>
                        <div className='col-6'>
                            <label htmlFor={'f' + id} className="form-label">
                                Cost
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                defaultValue={vehiclesState.find(x => x.id == id).f}
                                placeholder="F"
                                id={'f' + id}
                                name={'f' + id}
                                onChange={(e) => onChangeF(parseInt(e.target.value, 10))}
                                min={0}
                            />
                        </div>
                    </div>
                </div>
            </li>
        </>

    );
}

function VehiclesMenu(vehiclesState) {
    const [nextIndex, setNextIndex] = useState(vehicles.length > 0 ? vehicles[vehicles.length - 1].id + 1 : 0);
    function removeHandle(id) {
        let u = vehiclesState.vehiclesState.slice();
        u.splice(u.indexOf(u.find(x => x.id == id)), 1);
        vehiclesState.setVehiclesState(u);
    }

    function addVehicle() {
        let tmp = [...vehiclesState.vehiclesState];
        tmp.push({
            id: nextIndex,
            q: 0,
            f: 0,
        });
        setNextIndex(nextIndex + 1);
        vehiclesState.setVehiclesState(tmp);
    }


    return (
        <>
            <div className='col h-100 my-4 overflow-y-scroll'>
                <div className='container'>
                    <div className='row align-items-center justify-content-center'>
                        <div className="col-6"><h2 className='text-center m-0'>Vehicles</h2></div>
                        <div className="col-2">
                            <button type="button" className="btn btn-primary" onClick={addVehicle} >
                                <span className='fs-1'>+</span>
                            </button>
                        </div>
                    </div>
                </div>

                <ul className="list-group p-0 m-2 mh-70">
                    {
                        vehiclesState.vehiclesState.map(x => {
                            return <Vehicle key={x.id} id={x.id} removeHandle={() => removeHandle(x.id)} vehiclesState={vehiclesState.vehiclesState} onStateChange={vehiclesState.setVehiclesState} />
                        })
                    }
                </ul>
            </div>
        </>
    );
}

let selectedNode = null;


function Graph() {
    const cyRef = useRef(null);
    const [nodeMenu, setNodeMenu] = useState(null);
    const [arcMenu, setArcMenu] = useState(null);
    const [connected, setConnected] = useState(false);
    const [vehiclesState, setVehiclesState] = useState(vehicles);
    const [z, setZ] = useState("infinite");
    const [editable, setEditable] = useState(true);
    const editableRef = useRef(editable);
    // console.log(editable)
    const WS_URL = "ws://127.0.0.1:8080/ws";
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        connected ? WS_URL : null,
        {
            shouldReconnect: () => false
        }
    );

    //cyto useEffect
    useEffect(() => {
        cytoscape.use(cxtmenu);
        cytoscape.use(coseBilkent);
        cytoscape.use(spread);
        cytoscape.use(cola);
        const elements = [
            ...nodes.map((_, i) => ({ data: { id: `${i}` } })),
            ...arcs.map((a, i) => ({
                data: { id: `n${i}`, source: `${a[0]}`, target: `${a[1]}`, label: `${a[2]}` }
            }))
        ];

        const cy = cytoscape({
            container: cyRef.current,
            elements,
            layout: {
                name: 'breadthfirst',
                directed: true,
                padding: 10,
                roots: ['0']
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#0d6efd',
                        'label': 'data(id)',
                        'color': '#fff',
                        'text-valign': 'center',
                        'text-outline-width': 2,
                        'text-outline-color': '#0d6efd'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#6c757d',  // ✅ colore di default
                        'target-arrow-color': '#6c757d',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'control-point-weight': 0.5,
                        'label': 'data(label)',
                        'font-size': 12,
                        'color': '#000',
                        'text-rotation': 'autorotate',
                        'text-background-color': '#fff',
                        'text-background-opacity': 1,
                        'text-border-width': 1,
                        'text-border-color': '#000',
                        'z-index': 10,
                    },
                },
                {
                    selector: 'edge[color]',
                    style: {
                        'width': 3,
                        'line-color': 'data(color)',
                        'target-arrow-color': 'data(color)',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'control-point-weight': 0.5,
                        'label': 'data(label)',
                        'font-size': 12,
                        'color': '#000',
                        'text-rotation': 'autorotate',
                        'text-background-color': '#fff',
                        'text-background-opacity': 1,
                        'text-border-width': 1,
                        'text-border-color': '#000',
                        'z-index': 10,
                    }
                },
            ]
        });
        cyRef.current = cy;


        cy.style()
            .selector('.selected')
            .style({
                'border-width': 4,
                'border-color': '#FF0000'
            })
            .update();
        

        //layout
        cy.layout({
            name: 'cola',
            edgeLength: 150,
            centerGraph: false,
            maxSimulationTime: 4000,
            animate: false,
            randomize: true,
            stop: ()=>{
                cy.layout({name:"spread", padding: 40}).run();
            }
        }).run();

        // cy.layout({
        //     name: 'spread'
        // }).run();

        //control pannel for nodes
        cy.cxtmenu({
            selector: 'node',
            commands: [
                {
                    content: 'edit',
                    select: (ele) => {
                        if(editableRef.current){
                            showNodeMenu(ele, nodeMenu, setNodeMenu);
                        }
                    }
                },
                {
                    content: 'X',
                    select: (ele) => {
                        console.log(editableRef.current);
                        if(editableRef.current){
                            removeElement(ele, cy);
                        } return;
                    }
                }
            ]
        });
        // control pannel for arcs
        cy.cxtmenu({
            selector: 'edge',
            commands: [
                {
                    content: 'modifica',
                    select: (ele) => {
                        if(!editableRef.current) return;
                        showArcMenu(ele, arcMenu, setArcMenu);
                    }
                },
                {
                    content: 'X',
                    select: (ele) => {
                        if(!editableRef.current) return;
                        removeElement(ele, cy);
                    }
                }
            ]
        });

        //create node with right click
        cy.on('cxttap', function (evt) {
            if(!editableRef.current) return;
            if (evt.target === cy) {
                const position = evt.position;
                let n = [0, 0, 0, 0, { x: position.x, y: position.y }];
                nodes.push(n);

                cy.add({
                    group: "nodes",
                    data: { id: `${nodes.length - 1}` },
                    position: { x: position.x, y: position.y }
                });

            }
        });

        //add an arc by clicking 2 node(the sequence of click is important)
        cy.on('tap', 'node', function (evt) {
            if(!editableRef.current) return;
            const node = evt.target;
            if (!selectedNode) {
                selectedNode = node;
                node.addClass('selected');
            } else if (selectedNode !== node) {
                arcs.push([parseInt(selectedNode.id(), 10), parseInt(node.id(), 10), 10]);
                selectedNode.removeClass('selected');
                selectedNode = null;
                reconstructGraph();
            } else {
                selectedNode.removeClass('selected');
                selectedNode = null;
            }
        });

        // remove the selected node for userfriendly interface
        cy.on('tap', function (event) {
            if (event.target === cy) {
                if (selectedNode) {
                    selectedNode.removeClass('selected');
                    selectedNode = null;
                }
            }
        });

    }, []);

    useEffect(() => {
    editableRef.current = editable;
}, [editable]);

    //websocket

    // click to start connection
    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            console.log(getJson())
            sendJsonMessage(getGraph());
            // cyRef.current.autoungrabify(true);
            // cyRef.current.autolock(true);
            cyRef.current.autounselectify(true);
        }
    }, [readyState]);

    //every time a new solution comes
    useEffect(() => {
        if (lastJsonMessage !== null) {
            setZ(lastJsonMessage.z)
            if (originalArcs === null) {
                originalArcs = [...arcs];
            }
        }
        showSolution(lastJsonMessage);
        if(lastJsonMessage !== null){
            console.log("ciao")
            sendJsonMessage("OK");
        }
    }, [lastJsonMessage]);


    return (
        <>
            {nodeMenu && <Node ele={nodeMenu} setNodeMenu={setNodeMenu} />}
            {arcMenu && <Arc ele={arcMenu} setArcMenu={setArcMenu} />}
            <div className='container-flow h-100'>
                <div className='row h-100'>
                    <div className='col-9 h-100'>
                        <div className='w-100 h-100' ref={cyRef}></div>
                    </div>
                    <VehiclesMenu vehiclesState={vehiclesState} setVehiclesState={setVehiclesState} />
                    <div className='position-absolute top-0 left-0'>
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => {setConnected(prev => !prev); setEditable(() => false)}}>
                            {connected === false ? 'Connect To Socket' : 'Disconnect From Socket'}
                        </button>
                        <p>z: {z}</p>
                    </div>
                </div>
            </div>
        </>
    );

    function getGraph() {
        const json = {
            "graph": JSON.stringify(
                {
                    "nodes": nodes.map(n => [n[0], n[2], n[3]]),
                    "arcs": arcs.map(a => [a[0], a[1], a[2]])
                }
            ),
            "fleet": JSON.stringify(
                {
                    "vehicles": vehiclesState.map(v => [v.q, v.f])
                }
            )
        };
        return json;
    }
    function getJson() {
        return JSON.stringify(getGraph())
    }

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function showSolution(solution) {
        if (solution !== null) {
            cyRef.current.edges().remove();
            arcs = [];
            let colors = [
                '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
                '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe',
                '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000',
                '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080'
            ];
            colors = shuffleArray(colors);
            solution.routes.map((r, i) => {
                renderRoute(r[0], colors[i])
            });
            reconstructGraph();
        }
    }

    //TO DO change the label
    function renderRoute(route, color) {
        route.map((a, i) => {
            arcs.push([a.i, a.j, i + 1, color]);
        });
    }

    function removeElement(ele, cy) {
        const removedGroup = ele.union(ele.connectedEdges());
        if (ele.group() === 'nodes') {
            nodes.splice(parseInt(ele.id()), 1);
            nodes[0] = [0, 0, 0, 0];
            const removedIds = removedGroup.map(ele => ele.id());
            arcs = arcs.filter((_, index) => {
                const arcId = `n${index}`;
                return !removedIds.includes(arcId);
            });
            synchronizeArcs(parseInt(ele.id().replace('n', ''), 10));
        }
        else {
            arcs.splice(parseInt(ele.id().replace('n', ''), 10), 1)
        }
        cy.remove(ele);
        reconstructGraph();
    }

    function getGraphElements() {
        let tmp = {};
        let positions = {};
        cyRef.current.nodes().map((node) => {
            tmp[node.id()] = node.position();
        });
        Object.values(tmp).map((pos, i) => {
            positions[`${i}`] = pos
        });

        console.log(originalArcs)
        const combinedArcs = originalArcs !== null ? [...arcs, ...originalArcs]: [...arcs];
        const elements = [
            ...nodes.map((_, i) => ({
                data: { id: `${i}` },
                position: positions[i] || undefined
            })),
            ...combinedArcs.map((a, i) => {
                let tmp = {
                    data: { id: `n${i}`, source: `${a[0]}`, target: `${a[1]}`, label: `${a[2]}` }
                }
                if (a.length === 4) {tmp.data.color = a[3];}
                else{tmp.data.color = "#6c757d";}
                return tmp;
            }),

        ];
        return elements;
    }

    function synchronizeArcs(i) {
        arcs = arcs.map(x => {
            if (x[0] > i) {
                x[0] -= 1;
            }
            if (x[1] >= i) {
                x[1] -= 1;
            }
            return x;
        })
    }
    function reconstructGraph() {
        let el = getGraphElements();
        cyRef.current.elements().remove();
        cyRef.current.add(el);
    }

    function showNodeMenu(ele, nodeMenu, setNodeMenu) {
        setNodeMenu(ele);
    }

    function showArcMenu(ele, arcMenu, setArcMenu) {
        setArcMenu(ele);
    }

}

export default Graph
