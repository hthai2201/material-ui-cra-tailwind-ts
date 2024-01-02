import React from "react";
import {
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { getFirstLetters } from "./utils";
import CommentIcon from "@mui/icons-material/Comment";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Column, Task } from "./types";
import moment from "moment";
import DUMMY_DATA from "./dummyData.json";
import { DraggableProvided } from "react-beautiful-dnd";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

type Props = {
  task: Task;
  provided: DraggableProvided;
  onClick?: (task: Task) => void;
};

const TaskCard = (props: Props) => {
  const { task, provided, onClick } = props;
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("run");
    onClick?.(task);
  };
  return (
    <div
      onClick={handleClick}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Card>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {task.task_name}
          </Typography>
          <div className="flex gap-2">
            <div className="flex">
              <CommentIcon fontSize="small" />
              {task.comment_count}
            </div>
            <div className="flex">
              <AttachFileIcon fontSize="small" />
              {task.attachment_count}
            </div>
            <div className="flex">
              <ScheduleIcon fontSize="small" />
              {moment(task.due_date).format("DD MMM YYYY")}
            </div>
          </div>
          {!!task.assignees.length && (
            <AvatarGroup
              max={4}
              color="red"
              spacing={0}
              classes={{ avatar: "w-6 h-6 text-xs" }}
            >
              {task.assignees?.map((assignee, assigneeIndex) => {
                return (
                  <Avatar
                    sx={{
                      bgcolor: DUMMY_DATA.avatar_colors[assigneeIndex],
                    }}
                    key={assignee.id}
                    alt={assignee.name}
                  >
                    {getFirstLetters(assignee.name)}
                  </Avatar>
                );
              })}
            </AvatarGroup>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCard;
