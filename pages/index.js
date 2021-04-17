import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
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
