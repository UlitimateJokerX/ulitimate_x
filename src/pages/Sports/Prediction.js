import { useState } from 'react'
import { Button, ButtonToolbar, Form } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import moment from 'moment'
import _ from 'lodash'
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
  const playtypeCorrespondenceMap = {
    'away_win': 'home_win',
    'home_win': 'away_win',
    'handicap_weak': 'handicap_strong',
    'handicap_strong': 'handicap_weak',
    'total_big': 'total_small',
    'total_small': 'total_big'
  }
  const playtype = props.playtype
  const num = props.match[`${props.playtype}_num`]
  const total = num + props.match[`${playtypeCorrespondenceMap[`${playtype}`]}_num`]
  const recommendScore = _.includes(props.exportRecommend[playtype], props.match.id) ? 0.5 : 0
  let recommendEmoji = ''

  if (((num / total) + recommendScore) >= 1) {
    recommendEmoji = '👑'
  }

  return <>{recommendEmoji}</>
}

// 專家推薦勾選
function handleExportRecommend (e, exportRecommend, setExportRecommendFunc) {
  const matchId = e.target.id.split('_')[0]
  const playtype = `${e.target.id.split('_')[1]}_${e.target.id.split('_')[2]}`
  const isRecommended = e.target.checked
  let newExportRecommend = _.clone(exportRecommend)

  if (isRecommended) {
    newExportRecommend[playtype].push(matchId)
  }

  if (!isRecommended) {
    newExportRecommend[playtype].splice(_.indexOf(newExportRecommend[playtype], matchId), 1)
  }

  setExportRecommendFunc(newExportRecommend)
}

// 顯示預測人數
function ShowData (props) {
  const selectedSport = props.selected
  const predictionResult = props.data
  const [exportRecommend, setExportRecommend] = useState({
    away_win: [],
    home_win: [],
    handicap_weak: [],
    handicap_strong: [],
    total_big: [],
    total_small: []
  })

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
            const now = moment().format('A HH:mm')

            return (
              <tr key={index}>
                <td className={now > r.time ? 'text-danger' : 'text-success'}>{r.time}</td>
                <td>{r.team_away}<br />@{r.team_home}</td>
                <td>
                  <ShowRecommendEmoji match={r} playtype='away_win' exportRecommend={exportRecommend} />
                  {r.team_away}({r.away_win_num})
                  {' '}
                  <input type='checkbox' id={`${r.id}_away_win`} onClick={e => handleExportRecommend(e, exportRecommend, setExportRecommend)} />
                  <br />
                  <ShowRecommendEmoji match={r} playtype='home_win' exportRecommend={exportRecommend} />
                  {r.team_home}({r.home_win_num})
                  {' '}
                  <input type='checkbox' id={`${r.id}_home_win`} onClick={e => handleExportRecommend(e, exportRecommend, setExportRecommend)} />
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
                  <ShowRecommendEmoji match={r} playtype='total_big' exportRecommend={exportRecommend} />
                  大{r.total_score}({r.total_big_num})
                  {' '}
                  <input type='checkbox' id={`${r.id}_total_big`} onClick={e => handleExportRecommend(e, exportRecommend, setExportRecommend)} />
                  <br />
                  <ShowRecommendEmoji match={r} playtype='total_small' exportRecommend={exportRecommend} />
                  小{r.total_score}({r.total_small_num})
                  {' '}
                  <input type='checkbox' id={`${r.id}_total_small`} onClick={e => handleExportRecommend(e, exportRecommend, setExportRecommend)} />
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
