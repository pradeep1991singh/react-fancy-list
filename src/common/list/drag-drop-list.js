// $FlowFixMe

import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import DragDropItem from './drag-drop-item'
import './drag-drop.css';

import type { DragDropListProps, DragDropListStates } from './type-drag-drop'

class DragDropList extends Component<DragDropListProps, DragDropListStates>{
    state: DragDropListStates = {
        items: []
    }

    componentWillReceiveProps(nextProps: DragDropListProps) {
        if (nextProps.items !== this.state.items)
            this.setState({ items: nextProps.items })
    }

    compareCards = (item1, item2) => {
        return item1.order - item2.order;
    }

    swapCards = (id1, id2) => {
        const items = this.state.items;

        const item1 = items.filter(c => c.id === id1)[0];
        const item2 = items.filter(c => c.id === id2)[0];
        const item1Order = item1.order;
        item1.order = item2.order;
        item2.order = item1Order;

        items.sort(this.compareCards);

        this.setState({ items });
    }

    render() {
        return (
            <div className='list-container'>
                {this.props.header &&
                    <div className="list-item list-header">
                        <p>Name - Population</p>
                        {this.props.handleSearch &&
                            <input type="text"
                                className="search-box"
                                placeholder="Search . . ."
                                autoComplete="off"
                                onChange={this.props.handleSearch} />
                        }
                    </div>
                }

                {this.state.items &&
                    this.state.items.map((item, index) => {
                        return (
                            <DragDropItem key={item.id}
                                {...item}
                                swapCards={this.swapCards} />
                        );
                    })
                }
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(DragDropList);
