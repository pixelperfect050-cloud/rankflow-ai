"use client";

import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface DragDropAdapterProps<T> {
  items: T[];
  keyExtractor: (item: T) => string;
  onReorder: (reorderedItems: T[]) => void;
  renderItem: (item: T, dragHandleProps: any, index: number) => React.ReactNode;
  droppableId?: string;
}

/**
 * Adapter wrapper for @hello-pangea/dnd.
 * Hides the library implementation details from the rest of the application.
 */
export function DragDropAdapter<T>({ 
  items, 
  keyExtractor, 
  onReorder, 
  renderItem,
  droppableId = "dnd-adapter-list"
}: DragDropAdapterProps<T>) {
  
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    if (sourceIndex === destinationIndex) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, reorderedItem);
    
    onReorder(newItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef}
            className="flex flex-col gap-2"
          >
            {items.map((item, index) => {
              const id = keyExtractor(item);
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`transition-all ${snapshot.isDragging ? 'z-50 shadow-lg scale-[1.02] ring-2 ring-emerald-500 rounded-lg' : ''}`}
                    >
                      {renderItem(item, provided.dragHandleProps, index)}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
