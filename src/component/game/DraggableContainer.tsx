import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import styled from 'styled-components';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';

import { Column } from './Column';

const Container = styled.div`
    display: flex;
`;

const InnerList: FC<any> = memo(({ column, rowMap, index }) => {
    console.log('rowMap is ', rowMap)
    console.log('column.rowIds is ', column.rowIds)
    const rows = useMemo(() => column.rowIds.map(id => rowMap[id]), [column.rowIds, rowMap]);
    console.log('column here is ', rows)
    return <Column key={column.id} column={column} rows={rows} index={index} />;
});

export const DraggableContainer: FC<any> = ({ data }) => {
    const [rows, setRows] = useState(data.rows);
    const [columns, setColumns] = useState(data.columns);

    const updateRowRelocationInSameColumn = useCallback(
        result => {
            const { destination, source, draggableId } = result;
            const column = columns[source.droppableId];
            const newRowIds = Array.from(column.rowIds);

            newRowIds.splice(source.index, 1);
            newRowIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...column,
                rowIds: newRowIds,
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
            const startRowIds = Array.from(start.rowIds);
            startRowIds.splice(source.index, 1);
            const newStart = {
                ...start,
                rowIds: startRowIds,
            };

            const finishRowIds = Array.from(finish.rowIds);
            finishRowIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                rowIds: finishRowIds,
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
            const { destination, source, type } = result;
            if (!destination) {
                return;
            }

            if (destination.droppableId === source.droppableId && destination.index === source.index) {
                return;
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
        [columns, updateRowRelocationInDifferentColumn, updateRowRelocationInSameColumn],
    );

    console.log('data is ', data)
    console.log('data.columnOrder is ', data.columnOrder)

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
                {data.columnOrder.map((columnId, index) => {
                    const column = columns[columnId];
                    console.log('go inside')
                    console.log('rows are ', rows)
                    console.log('column is ', column)
                    return <InnerList key={column.id} column={column} rowMap={rows} index={index} />;
                })}
            </Container>
        </DragDropContext>
    );
}
