import { Container, Grid, Card, CardContent, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useRouter } from 'next/router'

import CompletedChart from 'src/components/TodoChart/Completed'
import DurationChart from 'src/components/TodoChart/Duration'

export default function Charts(props) {
    const router = useRouter()

    const goHome = () => {
        router.push('/')
    }

    return (
        <Container>
            <Card elevation={2}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <IconButton onClick={goHome}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CompletedChart title='Cantidad de tareas completadas por dia' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DurationChart title='Cantidad de tareas completadas por duración' />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}
