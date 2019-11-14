import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { DragDropContext, DropResult, DragStart, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { Column } from './';
import initialData from '../initial-data';
import '@atlaskit/css-reset';

const Container = styled.div`
    display: flex;
`;

const InnerList: FC<any> = memo(({ column, taskMap, index }) => {
    const tasks = useMemo(() => column.taskIds.map(taskId => taskMap[taskId]), [column.taskIds, taskMap]);

    return <Column key={column.id} column={column} tasks={tasks} index={index} />;
});

export const DraggableGrid = () => {
    const [tasks, setTasks] = useState(initialData.tasks);
    const [columns, setColumns] = useState(initialData.columns);
    const [columnOrder, setColumnOrder] = useState(initialData.columnOrder);
    const [homeIndex, setHomeIndex] = useState();

    const onDragStart = useCallback(
        (start: DragStart) => {
            const homeIndex = columnOrder.indexOf(start.source.droppableId);
            setHomeIndex(homeIndex);
        },
        [columnOrder],
    );

    const onDragUpdate = useCallback(
        update => {
            const { destination } = update;
            const opacity = destination ? destination.index / Object.keys(tasks).length : 0;
            document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity}`;
        },
        [tasks],
    );

    const updateColumnOrder = useCallback(
        result => {
            const { destination, source, draggableId } = result;

            const newColumnOrder = [...columnOrder];
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            setColumnOrder(newColumnOrder);
        },
        [columnOrder],
    );

    const updateRowRelocationInSameColumn = useCallback(
        result => {
            const { destination, source, draggableId } = result;
            const column = columns[source.droppableId];
            const newTaskIds = Array.from(column.taskIds);

            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...column,
                taskIds: newTaskIds,
            };

            const newColumns = { ...columns, [newColumn.id]: newColumn };

            setColumns(newColumns);
        },
        [columns],
    );

    const updateRowRelocationInDifferentColumn = useCallback(
        (result: DropResult, start, finish) => {
            const { destination, source, draggableId } = result;
            if (!destination) return;
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = {
                ...start,
                taskIds: startTaskIds,
            };
            console.log('result is ', result);

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds,
            };

            const newColumns = {
                ...columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            };

            setColumns(newColumns);
        },
        [columns],
    );

    const onDragEnd = useCallback(
        (result: DropResult) => {
            setHomeIndex(null);
            const { destination, source, type } = result;
            if (!destination) {
                return;
            }

            if (destination.droppableId === source.droppableId && destination.index === source.index) {
                return;
            }

            if (type === 'column') {
                return updateColumnOrder(result);
            }

            const start = columns[source.droppableId];
            const finish = columns[destination.droppableId];

            console.log('result outside is ', result);
            if (start === finish) {
                return updateRowRelocationInSameColumn(result);
            }

            // Moving from one list to another
            updateRowRelocationInDifferentColumn(result, start, finish);
        },
        [columns, updateColumnOrder, updateRowRelocationInDifferentColumn, updateRowRelocationInSameColumn],
    );

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
            <Droppable droppableId="all-col" direction="horizontal" type="column">
                {provided => (
                    <Container {...provided.droppableProps} ref={provided.innerRef}>
                        {columnOrder.map((columnId, index) => {
                            const column = columns[columnId];

                            return <InnerList key={column.id} column={column} taskMap={tasks} index={index} />;
                        })}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    );
};
