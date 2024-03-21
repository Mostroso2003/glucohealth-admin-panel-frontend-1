import { FunctionComponent, useCallback } from 'react'
import MainCard from 'components/cards/MainCard'
import Table from './table'
import usePaginate from './use-paginate'
import { useNavigate } from 'react-router'
import { styled } from 'styled-components'
import { Button, Typography } from '@mui/material'
import { IconCirclePlus } from '@tabler/icons'

const AirlineTicketsPage: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate()
  const { airlineTickets, paginate, setPage, fetchAirlineTickets } =
    usePaginate()

  const goToCreate = useCallback(() => {
    navigate('/airline-tickets/create')
  }, [navigate])

  return (
    <MainCard
      className={className}
      headerClass={'page-header'}
      title={
        <div className={'page-header'}>
          <Typography variant='h3' className={'title-header'}>
            Pasajes de Avión
          </Typography>
          <Button
            color='primary'
            variant={'outlined'}
            onClick={goToCreate}
            startIcon={<IconCirclePlus />}
          >
            Crear
          </Button>
        </div>
      }
    >
      <Table
        items={airlineTickets}
        paginate={paginate}
        onChange={setPage}
        fetchItems={fetchAirlineTickets}
      />
    </MainCard>
  )
}

interface Props {
  className?: string
}

export default styled(AirlineTicketsPage)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`
