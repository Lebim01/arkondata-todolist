import { Container, Grid } from '@material-ui/core';
import TodoList from 'src/components/TodoList'

export default function Index() {

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TodoList />
                </Grid>
            </Grid>
        </Container>
    );
}
