// @flow

import type { } from '../../common/type-common'
import type { Planet } from '../../planets/type-planets'

export type DragDropListProps = {
    items: Array<Planet>,
    header?: boolean,
    handleSearch?: (e: Event) => void,
}

export type DragDropListStates = {
    items: Array<Planet>,
}

export type DragDropItemProps = {
    isDragging: boolean,
    text: string,
    type: string,
    connectDropTarget: (Element) => void,
}

export type DragDropItemStates = {
    items: Array<Planet>,
}
