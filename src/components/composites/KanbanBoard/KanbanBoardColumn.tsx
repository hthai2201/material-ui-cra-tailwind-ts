import React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Icon,
  Paper,
  Typography,
} from "@mui/material";
import { getFirstLetters } from "./utils";
import CommentIcon from "@mui/icons-material/Comment";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Column, Task } from "./types";
import moment from "moment";
import DUMMY_DATA from "./dummyData.json";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

type Props = {
  column: Column;
  tasks: Task[];
  index: number;
};

const KanbanBoardColumn = (props: Props) => {
  const { column, tasks, index } = props;
  return (
    <Draggable draggableId={`COLUMN-${column.id}`} index={index}>
      {(provided, snapshot) => {
        return (
          <div>
            <Droppable type="TASK" droppableId={column.id}>
              {(dropProvided, dropSnapshot) => {
                return (
                  <Paper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    sx={{
                      minWidth: 379,
                      width: 379,
                      bgcolor: "#F8F8F8",
                      padding: 2,
                    }}
                  >
                    <Typography {...provided.dragHandleProps} variant="h6">
                      {column.name}
                    </Typography>

                    <div
                      ref={dropProvided.innerRef}
                      {...dropProvided.droppableProps}
                      className="flex flex-col mt-4 gap-4"
                    >
                      {tasks.map((task, taskIndex) => (
                        <Draggable
                          key={task.id}
                          draggableId={`TASK-${task.id}`}
                          index={taskIndex}
                        >
                          {(dragProvided, dragSnapshot) => (
                            <TaskCard task={task} provided={dragProvided} />
                          )}
                        </Draggable>
                      ))}
                      {dropProvided.placeholder}
                    </div>
                  </Paper>
                );
              }}
            </Droppable>
          </div>
        );
      }}
    </Draggable>
  );
};

export default KanbanBoardColumn;
