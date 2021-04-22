import { IconButton, Tooltip } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList'

import { connect } from 'react-redux'
import { filter } from 'src/redux/actions/todos'
import DurationChip from 'src/components/TodoItem/components/DurationChip'

const TodoListFilter = (props) => {

    const selectDuration = (item) => {
        props.filter(item !== null ? item.id : null)
    }

    return (  
        <DurationChip 
            button={(handleClick) => (
                <Tooltip title="Filtrar">
                    <IconButton onClick={handleClick} color={props.activeFilter ? 'secondary' : 'default'}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )} 
            all
            editable 
            onSelect={selectDuration} 
        />
    )
}

const mapStateToProps = (state) => ({
    durations: state.durations.durations,
    activeFilter: state.todos.activeFilter
})

const mapDispatchToProps = (dispatch) => ({
    filter: (item) => dispatch(filter(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoListFilter)