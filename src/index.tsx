// @flow
import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, DropResult, DragStart } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { Column } from './component/Column';
import initialData from './initial-data';
import '@atlaskit/css-reset';
// import "./style.css";

const Container = styled.div`
    display: flex;
`;

const App = () => {
    const [state, setState] = useState(initialData);
    const [homeIndex, setHomeIndex] = useState();

    const onDragStart = useCallback(
        (start: DragStart) => {
            const homeIndex = state.columnOrder.indexOf(start.source.droppableId);
            setHomeIndex(homeIndex);
        },
        [state.columnOrder],
    );

    const onDragUpdate = useCallback(
        update => {
            const { destination } = update;
            const opacity = destination ? destination.index / Object.keys(state.tasks).length : 0;
            document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity}`;
        },
        [state.tasks],
    );

    const updateRowRelocationInSameColumn = useCallback(
        result => {
            const { destination, source, draggableId } = result;
            const column = state.columns[source.droppableId];
            const newTaskIds = Array.from(column.taskIds);

            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...column,
                taskIds: newTaskIds,
            };

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setState(newState);
        },
        [state],
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
            console.log('result is ',result)

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds,
            };

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                },
            };

            setState(newState);
        },
        [state],
    );

    const onDragEnd = useCallback(
        (result: DropResult) => {
            setHomeIndex(null);
            const { destination, source } = result;
            if (!destination) {
                return;
            }

            if (destination.droppableId === source.droppableId && destination.index === source.index) {
                return;
            }

            const start = state.columns[source.droppableId];
            const finish = state.columns[destination.droppableId];

            console.log('result outside is ', result)
            if (start === finish) {
                return updateRowRelocationInSameColumn(result);
            }

            // Moving from one list to another
            updateRowRelocationInDifferentColumn(result, start, finish);
        },
        [state.columns, updateRowRelocationInDifferentColumn, updateRowRelocationInSameColumn],
    );

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
            <Container>
                {state.columnOrder.map((columnId, index) => {
                    const column = state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

                    const isDropDisabled = index < homeIndex;

                    return <Column key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} />;
                })}
            </Container>
        </DragDropContext>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
