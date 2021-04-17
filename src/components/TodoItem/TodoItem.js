import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import MoreVerticalIcon from '@material-ui/icons/MoreVert';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'

function getStyle(provided, style) {
    if (!style) {
      return provided.draggableProps.style;
    }
  
    return {
      ...provided.draggableProps.style,
      ...style,
    };
}

const TodoItem = React.memo(({ provided, ...props }) => {
    const [checked, setChecked] = useState(false);

    const handleToggle = () => {
        setChecked(_checked => !_checked);
    };

    const labelId = `checkbox-list-label-${props.idx}`;
    
    return (
        <div
            ref={provided.innerRef}
            isDragging={props.isDragging}
            isGroupedOver={props.isGroupedOver}
            {...provided.draggableProps}
            style={getStyle(provided, {})}
            data-is-dragging={props.isDragging}
            data-testid={props.idx.toString()}
            data-index={props.idx}
            aria-label={props.title}
        >
            <ListItem 
                role={undefined}
                dense
            >
                <ListItemIcon>
                    <IconButton edge="end" aria-label="comments" {...provided.dragHandleProps}>
                        <DragIndicatorIcon />
                    </IconButton>
                </ListItemIcon>
                <ListItemText id={labelId} primary={props.title} />
                <ListItemSecondaryAction>
                    <Checkbox
                        edge="start"
                        checked={checked}
                        tabIndex={-1}
                        disableRipple
                        onClick={handleToggle}
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                    <IconButton edge="end" aria-label="comments">
                        <MoreVerticalIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    )
})

export default TodoItem