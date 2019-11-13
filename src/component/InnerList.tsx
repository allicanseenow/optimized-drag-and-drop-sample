import React, { FC, memo } from 'react';
import { Task } from './Task';

export const InnerList: FC<any> = memo(({ tasks }) => {
    return tasks.map((task, index) => <Task key={task.id} task={task} index={index} />);
});
