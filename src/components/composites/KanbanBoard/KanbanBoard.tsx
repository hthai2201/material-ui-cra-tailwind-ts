import React, { useEffect, useState } from "react";
import DUMMY_DATA from "./dummyData.json";
import { Task, Column } from "./types";
import { Box, Container } from "@mui/material";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

import reorder, { reorderTasks } from "./reoder";
import KanbanBoardColumn from "./KanbanBoardColumn";
import { groupBy } from "./utils";
import TaskDetailsModal from "./TaskDetailsModal";
function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const [isOpenTaskDetailsModal, setIsOpenTaskDetailsModal] =
    useState<Task | null>(null);
  useEffect(() => {
    setColumns(DUMMY_DATA.columns);
    setTasks(groupBy(DUMMY_DATA.tasks as Task[], (i) => i.column_id));
  }, []);

  const onDragEnd: OnDragEndResponder = (result) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...columns];
        shallow.splice(result.source.index, 1);
        setColumns(shallow);
        return;
      }

      const withQuoteRemoved = [...columns];

      withQuoteRemoved.splice(result.source.index, 1);

      const orderedColumns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      setColumns(orderedColumns);
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const reorderedorder = reorder(columns, source.index, destination.index);

      setColumns(reorderedorder);

      return;
    }

    // Task;
    const data = reorderTasks({
      tasks: tasks,
      source,
      destination,
    });
    setTasks(data.tasks);
  };
  const handleOpenTaskDetailsModal = (task: Task) => {
    setIsOpenTaskDetailsModal(task);
  };
  const handleCloseTaskDetailsModal = () => {
    setIsOpenTaskDetailsModal(null);
  };
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ padding: 8, height: "100vh" }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => {
            return (
              <div
                className="h-full flex gap-4 overflow-auto"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columns.map((column, columnIndex) => {
                  const currentColumnTasks = tasks[column.id] || [];
                  return (
                    <KanbanBoardColumn
                      index={columnIndex}
                      key={column.id}
                      column={column}
                      tasks={currentColumnTasks}
                      onOpenTaskDetails={handleOpenTaskDetailsModal}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
      <TaskDetailsModal
        task={isOpenTaskDetailsModal}
        open={!!isOpenTaskDetailsModal}
        onClose={handleCloseTaskDetailsModal}
      />
    </Container>
  );
}

export default KanbanBoard;
