import { useState } from 'react'
import { Button, ButtonToolbar, Form } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import moment from 'moment'
import $ from 'jquery'
import * as qs from 'qs'
import Notification, { notify } from 'react-notify-bootstrap'

// 取得預測比例
function handleSelect (e, updateSelectedFunc, updateDataFunc, setLoadingFunc) {
  const sport = e.target.value

  setLoadingFunc(true)

  fetch(`/api/sports/prediction?sport=${sport}`)
    .then(r => r.json())
    .then(d => {
      if (d.result !== 'ok') {
        throw new Error(d.msg)
      }

      updateSelectedFunc(sport)
      updateDataFunc(d.ret)

      setLoadingFunc(false)
    })
    .catch(e => {
      notify({
        text:`Call omnipotent system error: ${e.message}`,
        variant: 'danger'
      })

      setLoadingFunc(false)
    })
}

// 顯示推薦符號
function ShowRecommendEmoji (props) {
  const num = props.num
  const total = props.total
  const exportRecommended = $(`input#${props.mid}`)
  console.log(exportRecommended.prop("checked"))

  if ((num / total) > 0.7) {
    return <>👑</>
  }

  return <></>
}

// 專家推薦勾選
function handleExportRecommend (e) {
  console.log(e.target.checked)
}

// 顯示預測人數
function ShowData (props) {
  const selectedSport = props.selected
  const predictionResult = props.data

  if (selectedSport === '' && predictionResult.length === 0) {
    return <></>
  }

  if (selectedSport !== '' && predictionResult.length === 0) {
    return <h3 className='text-center'>{selectedSport} has no match today or not yet open betting.</h3>
  }

  return (
    <div>
      <Table striped hover variant='dark' className='text-center' responsive>
        <thead>
          <tr>
            <th></th>
            <th>Match</th>
            <th>Who Win?</th>
            <th>Handicap</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
        {
          predictionResult.map((r, index) => {
            return (
              <tr key={r.id}>
                <td>{r.time}</td>
                <td>{r.team_away}<br />@{r.team_home}</td>
                <td>
                  <ShowRecommendEmoji num={r.away_win_num} total={r.away_win_num + r.home_win_num} mid={`${r.id}_away_win`} />
                  {r.team_away}({r.away_win_num})
                  {' '}
                  <input type='checkbox' id={`${r.id}_away_win`} onClick={handleExportRecommend} />
                  <br />
                  <ShowRecommendEmoji num={r.home_win_num} total={r.away_win_num + r.home_win_num} mid={`${r.id}_home_win`} />
                  {r.team_home}({r.home_win_num})
                  {' '}
                  <input type='checkbox' id={`${r.id}_home_win`} />
                </td>
                <td>
                {
                  r.stronger_team === 'home' ?
                  <>
                    客+{r.handicap_score}({r.handicap_weak_num})
                    {' '}
                    <input type='checkbox' id={`${r.id}_handicap_weak`} />
                    <br />
                    主-{r.handicap_score}({r.handicap_strong_num})
                    {' '}
                    <input type='checkbox' id={`${r.id}_handicap_strong`} />
                  </>
                  :
                  <>
                    客-{r.handicap_score}({r.handicap_strong_num})
                    {' '}
                    <input type='checkbox' id={`${r.id}_handicap_strong`} />
                    <br />
                    主+{r.handicap_score}({r.handicap_weak_num})
                    {' '}
                    <input type='checkbox' id={`${r.id}_handicap_weak`} />
                  </>
                }
                </td>
                <td>
                  大{r.total_score}({r.total_big_num})
                  {' '}
                  <input type='checkbox' id={`${r.id}_total_big`} />
                  <br />
                  小{r.total_score}({r.total_small_num})
                  {' '}
                  <input type='checkbox' id={`${r.id}_total_small`} />
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </Table>
    </div>
  )
}

/**
 * 賽事預測頁面
 */
function PredictionPage () {
  const [selected, updateSelected] = useState('')
  const [data, updateData] = useState([])
  const [isLoading, setLoading] = useState(false)

  return (
    <>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Text className='text-muted'>
            <h3 className='text-center'>
              Match prediction({moment().format('YYYY-MM-DD')})
            </h3>
          </Form.Text>
        </Form.Group>
      </Form>
      <Container fluid>
        <Row className='justify-content-md-center'>
          <Col sm={1} className='text-right'><h3>⚾</h3></Col>
          <Col sm={5}>
            <ButtonToolbar>
              <Button
                className='mr-2'
                variant='primary'
                onClick={e => handleSelect(e, updateSelected, updateData, setLoading)}
                value='MLB'
              >
                MLB
              </Button>
              <Button
                className='mr-2'
                variant='secondary'
                onClick={e => handleSelect(e, updateSelected, updateData, setLoading)}
                value='NPB'
              >
                NPB
              </Button>
              <Button
                className='mr-2'
                variant='warning'
                onClick={e => handleSelect(e, updateSelected, updateData, setLoading)}
                value='CPBL'
              >
                CPBL
              </Button>
              <Button
                className='mr-2'
                variant='info'
                onClick={e => handleSelect(e, updateSelected, updateData, setLoading)}
                value='KBO'
              >
                KBO
              </Button>
            </ButtonToolbar>
          </Col>
          <Col sm={1} className='text-right'><h3>🏀</h3></Col>
          <Col sm={5}>
            <ButtonToolbar>
              <Button
                className='mr-2'
                variant='primary'
                onClick={e => handleSelect(e, updateSelected, updateData, setLoading)}
                value='NBA'
              >
                NBA
              </Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </Container>
      {
        !isLoading ?
        <>
          <ShowData data={data} selected={selected} setLoading={setLoading} />
        </>
        :
        <div className='text-center'>
          <Spinner as='span' variant='info' animation='border' role='status' aria-hidden='true' />
        </div>
      }
      <Notification options={{position: 'top'}} />
    </>
  )
}

export default PredictionPage
