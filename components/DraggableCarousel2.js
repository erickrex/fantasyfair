import React, {Component, useState, useRef, useEffect} from 'react'
import Image from 'next/image'
import next from 'next'
import { useContext } from "react";

import { GameStateContext } from "../data/Context";
import { eliminationMen1, eliminationMen2 } from "../data/ChamberContenders";
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const columnsFromBackend = {
  ["Winners"]: {
    title: "Winner (top), eliminated superstars, first eliminated should be at the bottom",
    items: []
  },
  ["Selection"]: {
    title: "Contenders",
    items: eliminationMen1.contenders
  }
};


const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function DraggableCarousel2() {
  const [columns, setColumns] = useState(columnsFromBackend);

  console.log(columns["Selection"].items);


  return (
    <div style={{ justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.title}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId} direction={columnId=="Winners"?"vertical":"horizontal"}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={columnId=="Winners"?{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                          display: "flex", flexDirection: "column"
                        }:{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: "90vw",
                          minHeight: 200,
                          display: "flex", flexDirection: "row", overflow: "auto"
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                              
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "5px",
                                      minHeight: "50px",
                                      maxHeight: "100px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.name}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}


export default DraggableCarousel2;