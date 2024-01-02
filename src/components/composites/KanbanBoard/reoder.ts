import { DraggableLocation } from "react-beautiful-dnd";
import { Task } from "./types";

// a little function to help us with reordering the result
const reorder = <D>(list: D[], startIndex = 0, endIndex = 0): D[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder;

export const reorderTasks = ({
  tasks,
  source,
  destination,
}: {
  tasks: Record<string, Task[]>;
  source: DraggableLocation;
  destination: DraggableLocation;
}) => {
  const current = [...tasks[source.droppableId]];
  const next = [...(tasks[destination.droppableId] || [])];
  const target: Task = {
    ...current[source.index],
  };
  // moving to same list
  if (source.droppableId === destination.droppableId) {
    swapAttr(current, source.index, destination.index, "sort");
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...tasks,
      [source.droppableId]: reordered,
    };
    return {
      tasks: result,
    };
  }

  current.splice(source.index, 1);
  current.forEach((item, index) => {
    if (index < source.index) {
      return;
    }
    item.sort--;
  });
  target.column_id = destination.droppableId;
  next.splice(destination.index, 0, target);
  let currSort = next[destination.index - 1]?.sort || 0;
  next.forEach((item, index) => {
    if (index < source.index) {
      return;
    }
    currSort++;
    item.sort = currSort;
  });
  const result = {
    ...tasks,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };
  return {
    tasks: result,
  };
};

function swapAttr<D>(
  data: D[],
  sourceIndex: number,
  destIndex: number,
  attr: keyof D
): D[] {
  if (!data || !data[sourceIndex] || !data[destIndex]) {
    return data;
  }
  const temp = data[sourceIndex][attr];
  data[sourceIndex][attr] = data[destIndex][attr];
  data[destIndex][attr] = temp;
  return data;
}
