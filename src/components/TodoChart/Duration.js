import { VictoryChart, VictoryBar, VictoryLabel } from 'victory'

import { connect } from 'react-redux'

const DurationChart = ({ todo_by_duration, title }) => {

    return (
        <VictoryChart 
            domainPadding={{ x: 20, y: 20 }}
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
                data={todo_by_duration.map(r => ({
                    x: r.title,
                    y: r.todos.length
                }))}
            />
        </VictoryChart>
    )
}

const mapStateToProps = (state) => {
    let todo_by_duration = []

    for(let duration of state.durations.durations){
        todo_by_duration.push({
            title: duration.title,
            todos: state.todos.todos.filter(r => r.completed === true && r.duration.id === duration.id)
        })
    }

    return {
        todo_by_duration
    }
}

export default connect(mapStateToProps)(DurationChart)