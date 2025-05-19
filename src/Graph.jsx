import React, { useState, useEffect, useRef } from 'react'
import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";

cytoscape.use(cxtmenu);

const colors = ['#ff0000', '#00cc66', '#ff9900', '#6633cc', '#0099ff'];
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
    [0, 1, 10, 0], [0, 3, 40, 1], [0, 5, 45, 2], [1, 4, 5, 3], [2, 4, 5, 4],
    [2, 7, 10, 5], [2, 5, 25, 6], [3, 6, 10, 7], [3, 2, 5, 8], [4, 1, 25, 9],
    [4, 6, 15, 10], [5, 2, 5, 11], [5, 3, 20, 12], [6, 0, 10, 13], [7, 0, 15, 14],
    [8, 9, 10, 15], [8, 11, 40, 16], [8, 13, 45, 17], [9, 12, 5, 18], [10, 12, 5, 19],
    [10, 15, 10, 20], [10, 13, 25, 21], [11, 14, 10, 22], [11, 10, 5, 23],
    [12, 9, 25, 24], [12, 14, 15, 25], [13, 10, 5, 26], [13, 11, 20, 27],
    [14, 8, 10, 28], [15, 8, 15, 29], [7, 15, 50, 30], [15, 7, 50, 31]
];

// let nextNodeId;
let nextArcId;

// keeping the node 
if (arcs.length > 0) {
    nextArcId = Math.max(...arcs.map(function (arc) {
        return arc[3];
    })) + 1;
}
else {
    nextArcId = 0;
}



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

    function editStats(){
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
    function editStats(){
        let q = document.querySelector('#q').value;
        let a = document.querySelector('#a').value;
        let b = document.querySelector('#b').value;
        console.log(n);
        n[0] = q;
        n[2] = a;
        n[3] = b;
        console.log(n)
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

let selectedNode = null;


function Graph() {
    const cyRef = useRef(null);
    // const [undoStack, setUndoStack] = useState([]);
    // const [stackIndex, setStackIndex] = useState(0);
    const [nodeMenu, setNodeMenu] = useState(null);
    const [arcMenu, setArcMenu] = useState(null);

    //
    useEffect(() => {
        const elements = [
            ...nodes.map((_, i) => ({ data: { id: `${i}` } })),
            ...arcs.map((a, i) => ({
                data: { id:`n${i}`, source: `${a[0]}`, target: `${a[1]}`, label: `${a[2]}` }
            }))
        ];
        console.log(arcs.length)

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
                let n = [0, 0, 0, 0, {x: position.x, y: position.y}];
                nodes.push(n);

                cy.add({
                    group:"nodes", 
                    data: { id: `${nodes.length-1}`}, 
                    position: {x: position.x, y: position.y}
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
                        id: nextArcId.toString(),
                        source: selectedNode.id(),
                        target: node.id(),
                        label: 10,
                    }
                }
                nextArcId += 1;
                cy.add(arc);
                arcs.push(arc)
                arcs.push([selectedNode.id(), node.id(), 10]);
                selectedNode.removeClass('selected');
                selectedNode = null;
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

        colorBranchesFrom('0', cy);

    }, []);


    return (
        <>
            {nodeMenu && <Node ele={nodeMenu} setNodeMenu={setNodeMenu} />}
            {arcMenu && <Arc ele={arcMenu} setArcMenu={setArcMenu} />}
            <div style={{ height: '80vh', width: '100%' }} ref={cyRef}></div>
        </>
    );

    function removeElement(ele, cy) {
        const removedGroup = ele.union(ele.connectedEdges());
        // let stack = {
        //     status: 'remove',
        //     elements: removedGroup.json()
        // };

        // setUndoStack(undoStack.push(stack));
        // setStackIndex(stackIndex + 1);
        if(ele.group() === 'nodes'){
            nodes.splice(ele.id(),1);
            const removedIds = removedGroup.map(ele => ele.id());
            arcs = arcs.filter((_, index) => {
                const arcId = `n${index}`;
                return !removedIds.includes(arcId);
            });
            synchronizeArcs(parseInt(ele.id().replace('n', ''), 10));
        }
        else{
            arcs.splice(parseInt(ele.id().replace('n', ''),10),1)
        }
        // console.log(ele)
        // console.log(undoStack);
        cy.remove(ele);
        reconstructGraph();
    }

    function getGraphElements(){
        const elements = [
            ...nodes.map((_, i) => ({ data: { id: `${i}` } })),
            ...arcs.map((a, i) => ({
                data: { id:`n${i}`, source: `${a[0]}`, target: `${a[1]}`, label: `${a[2]}` }
            }))
        ];
        return elements;
    }

    function synchronizeArcs(i){
        console.log(arcs)
        arcs = arcs.map(x=>{
            console.log(x)
            if(x[0] > i){
                x[0] -= 1;
            }
            if(x[1] >= i){
                x[1] -= 1;
            }
            return x;
        })
        console.log(arcs)
    }
    function reconstructGraph(){
        cyRef.current.elements().remove();
        cyRef.current.add(getGraphElements());
        colorBranchesFrom('0', cyRef.current)
    }

    function showNodeMenu(ele, nodeMenu, setNodeMenu) {
        setNodeMenu(ele);
    }

    function showArcMenu(ele, arcMenu, setArcMenu) {
        setArcMenu(ele);
    }

}

function colorBranchesFrom(rootId, cy) {

    const root = cy.getElementById(rootId);
    const outEdges = root.outgoers('edge');
    const visitedEdges = new Set();

    outEdges.forEach((edge, i) => {
        const color = colors[i % colors.length];
        paintBranch(edge, color, visitedEdges);
    });
}

function paintBranch(edge, color, visitedEdges) {
    if (visitedEdges.has(edge.id())) return;

    edge.style({
        'line-color': color,
        'target-arrow-color': color
    });

    visitedEdges.add(edge.id());

    const target = edge.target();
    const nextEdges = target.outgoers('edge');

    nextEdges.forEach(nextEdge => {
        paintBranch(nextEdge, color, visitedEdges);
    });
}

export default Graph
