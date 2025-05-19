import React, { useState, useEffect, useRef } from 'react'
import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";

cytoscape.use(cxtmenu);

// const colors = ['#ff0000', '#00cc66', '#ff9900', '#6633cc', '#0099ff'];
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
    [70, 120],
    [70, 120],
    [70, 120],
    [70, 120],
    [70, 120],
    [70, 120],
    [70, 120],
    [70, 120],
    [70, 120],
    [70, 120],
    [70, 120],
    [70, 120],
    [70, 120],
    [70, 120],
    [70, 120],


    [120, 225]
];

// function UndoButton({onClick}){
//     return (
//         <button onClick={onClick}>
//           {'<-'}
//         </button>
//       );
// }

// function ProceedButton(onClick){
//     return (
//         <button onClick={onClick}>
//           {'->'}
//         </button>
//     );
// }

function Arc({ ele, setArcMenu }) {
    // const arc = arcs.find((a) => `n${a[3]}` === ele.id());
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
        arc[2] = d;
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

    //unpdating the data of the node
    function editStats() {
        let q = document.querySelector('#q').value;
        let a = document.querySelector('#a').value;
        let b = document.querySelector('#b').value;
        n[0] = q;
        n[2] = a;
        n[3] = b;
        disposeModal();
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

function Vehicle({ i, removeHandle, vehiclesState, onStateChange }) {


    function onChangeQ(n) {
        let copy = vehiclesState.slice();
        copy[i][0] = n;
        onStateChange(copy);
    }

    function onChangeF(n) {
        let copy = vehiclesState.slice();
        copy[i][1] = n;
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
                            <label htmlFor={'q'+i} className="form-label">
                                Capacity
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                defaultValue={vehiclesState[i][0]}
                                placeholder="Q"
                                id={'q'+i}
                                name={'q'+i}
                                onChange={(e) => onChangeQ(parseInt(e.target.value, 10))}
                                min={0}
                            />
                        </div>
                        <div className='col-6'>
                            <label htmlFor={'f'+i} className="form-label">
                                Cost
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                defaultValue={vehiclesState[i][1]}
                                placeholder="F"
                                id={'f'+i}
                                name={'f'+i}
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

function VehiclesMenu() {
    const [vehiclesState, setVehiclesState] = useState(vehicles);
    function removeHandle(i) {
        // splice doesn't work because it gives back the 

        vehiclesState.splice(i, 1);
        let u = [...vehiclesState]

        setVehiclesState(u);
        // setVehiclesState(vehiclesState.filter((_, index) => index !== i));
    }

    return (
        <>
            <div className='col h-100 my-4'>

                <h2 className='text-center m-0'>Vehicles</h2>
                <ul className="list-group p-0 m-2 mh-70 overflow-y-scroll">
                    {
                        vehiclesState.map((x, i) => {
                            return <Vehicle key={i} i={i} removeHandle={() => removeHandle(i)} vehiclesState={vehiclesState} onStateChange={setVehiclesState} />
                        })
                    }
                    <li className='list-group-item h-100'></li>
                </ul>
            </div>
        </>
    );
}

let selectedNode = null;


function Graph() {
    const cyRef = useRef(null);
    // const [undoStack, setUndoStack] = useState([]);
    // const [stackIndex, setStackIndex] = useState(0);
    const [nodeMenu, setNodeMenu] = useState(null);
    const [arcMenu, setArcMenu] = useState(null);

    useEffect(() => {
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
                        'line-color': '#6c757d',
                        'target-arrow-color': '#6c757d',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'unbundled-bezier',
                        // 'control-point-distance': 20,
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
                {
                    selector: 'edge',
                    style: {
                        'curve-style': 'bezier',
                        // 'control-point-distance': 'data(distance)',
                        'control-point-weight': 0.5,
                        'target-arrow-shape': 'triangle',
                        'line-color': '#888',
                        'target-arrow-color': '#888',
                        'width': 2,
                    },
                },
            ]
        });
        cyRef.current = cy;
        // cy.layout({ name: 'cose', animate: true }).run();
        cy.style()
            .selector('edge')
            .style({
                'curve-style': 'bezier',
                // 'control-point-distance': 30,
                'control-point-weight': 0.5,
                'target-arrow-shape': 'triangle',
                'line-color': '#ccc',
                'target-arrow-color': '#ccc'
            })
            .update();


        cy.style()
            .selector('.selected')
            .style({
                'border-width': 4,
                'border-color': '#FF0000'
            })
            .update();
        //control pannel for nodes
        cy.cxtmenu({
            selector: 'node',
            commands: [
                {
                    content: 'edit',
                    select: (ele) => {
                        showNodeMenu(ele, nodeMenu, setNodeMenu);
                    }
                },
                {
                    content: 'X',
                    select: (ele) => {
                        removeElement(ele, cy);
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
                        showArcMenu(ele, arcMenu, setArcMenu);
                    }
                },
                {
                    content: 'X',
                    select: (ele) => {
                        removeElement(ele, cy);
                    }
                }
            ]
        });

        //create node with right click
        cy.on('cxttap', function (evt) {
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
            const node = evt.target;
            if (!selectedNode) {
                selectedNode = node;
                node.addClass('selected');
            } else if (selectedNode !== node) {
                let arc = {
                    group: 'edges',
                    data: {
                        id: (arcs.length).toString(),
                        source: selectedNode.id(),
                        target: node.id(),
                        label: 10,
                    }
                }
                cy.add(arc);
                // arcs.push(arc)
                arcs.push([selectedNode.id(), node.id(), 10]);
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

        // colorBranchesFrom('0', cy);

    }, []);


    return (
        <>
            {nodeMenu && <Node ele={nodeMenu} setNodeMenu={setNodeMenu} />}
            {arcMenu && <Arc ele={arcMenu} setArcMenu={setArcMenu} />}
            <div className='container-flow h-100'>
                <div className='row h-100'>
                    <div className='col-9 h-100'>
                        {/* style={{ height: '90vh', width: '100%' }} */}
                        <div className='w-100 h-100' ref={cyRef}></div>
                    </div>
                    <VehiclesMenu />
                </div>
            </div>
        </>
    );

    // function getGraphJson(){
    //     let graphJson = {
    //         "nodes": nodes,
    //         "arcs": arcs
    //     }
    //     return JSON.stringify(graphJson)
    // }

    // TO DO
    // function getVehicleJson(){

    // }

    function removeElement(ele, cy) {
        const removedGroup = ele.union(ele.connectedEdges());
        // let stack = {
        //     status: 'remove',
        //     elements: removedGroup.json()
        // };

        // setUndoStack(undoStack.push(stack));
        // setStackIndex(stackIndex + 1);
        if (ele.group() === 'nodes') {
            nodes.splice(ele.id(), 1);
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
        const positions = {};
        cyRef.current.nodes().map((node, i) => {
            if (parseInt(node.id(), 10) !== i) {
                positions[(parseInt(node.id(), 10) - 1).toString()] = node.position();
            }
            else {
                positions[node.id()] = node.position();
            }
        });

        const elements = [
            ...nodes.map((_, i) => ({
                data: { id: `${i}` },
                position: positions[i] || undefined
            })),
            ...arcs.map((a, i) => ({
                data: { id: `n${i}`, source: `${a[0]}`, target: `${a[1]}`, label: `${a[2]}` }
            }))
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
