import { VictoryChart, VictoryBar, VictoryLabel } from 'victory'

import { connect } from 'react-redux'

const CompletedChart = ({ todo_by_date, title }) => {

    return (
        <VictoryChart 
            title
            domainPadding={{ x: 20, y: 20 }}
            scale={{ x: "time" }}
            theme={{
                axis: {
                    style: {
                        grid: {
                            fill: "none",
                            stroke: "none",
                            pointerEvents: "painted"
                        },
                        tickLabels: {
                            fill: "white",
                            padding: 10
                        },
                    },
                },
            }}
        >
            <VictoryLabel text={title} x={15} y={15} style={{ fill: 'white' }} />
            <VictoryBar
                labelComponent={<VictoryLabel dy={15}/>}
                labels={({ datum }) => datum.y}
                style={{
                    data: { fill: "tomato" },
                    labels: { fill: "white" },
                }}
                data={todo_by_date.map(r => ({
                    x: r.date,
                    y: r.todos.length
                }))}
            />
        </VictoryChart>
    )
}

const mapStateToProps = (state) => {
    let todo_by_date = []

    for(let todo of state.todos.todos.filter(r => r.completed === true)){
        if(!todo_by_date.find(r => r.date.getDate() === todo.completed_at.getDate())){
            todo_by_date.push({
                date: new Date(todo.completed_at.getYear(), todo.completed_at.getMonth(), todo.completed_at.getDate()),
                todos: []
            })
        }

        let index = todo_by_date.findIndex(r => r.date.getDate() === todo.completed_at.getDate())
        todo_by_date[index].todos.push(todo)
    }

    return {
        todo_by_date
    }
}

export default connect(mapStateToProps)(CompletedChart)