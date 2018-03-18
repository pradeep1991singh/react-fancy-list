// $FlowFixMe

import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd'
import type { DragDropItemProps, DragDropListStates } from './type-drag-drop'

const ItemTypes = {
    CARD: 'card'
};

class DragDropItem extends Component<DragDropItemProps, DragDropListStates> {
    render() {
        const {
            isDragging,
            name,
            type,
            population,
            gravity,
            surface_water
        } = this.props;

        const style = {
            opacity: isDragging ? 0 : 1,
        };

        return this.props.connectDragSource(this.props.connectDropTarget(
            <div className={`list-item ${type}`} style={style}>
                <p>PLANET : {name}</p>
                <p>POPULATION : {population}</p>
                <p>GRAVITY : {gravity}</p>
                <p>SURFACE WATER : {surface_water}</p>
            </div>
        ));
    }
}

const cardSource = {
    beginDrag: (props) => { return { id: props.id } }
}

const DragSourceDecorator = DragSource(ItemTypes.CARD, cardSource,
    (connect, monitor) => {
        return {
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging()
        };
    });

const cardTarget = {
    hover: (props, monitor) => {
        let draggedId = monitor.getItem().id;

        if (draggedId !== props.id) {
            props.swapCards(draggedId, props.id);
        }
    }
};

const DropTargetDecorator = DropTarget(ItemTypes.CARD, cardTarget,
    connect => {
        return {
            connectDropTarget: connect.dropTarget()
        };
    });

export default DropTargetDecorator(DragSourceDecorator(DragDropItem));
