import type { NextPage } from 'next'

import { Card, CardContent, CardHeader, Grid } from '@mui/material'

import { Layout } from '../components/layouts'
import { EntryList } from '../components/ui'

const Home: NextPage = () => {
  return (
    <Layout title='Home - BoardJira'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" />
            {/*TODO: agregar una nueva entrada */}
            <EntryList />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" />
            <EntryList />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" />
            <EntryList />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Home
