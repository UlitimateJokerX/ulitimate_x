import { useState } from 'react'
import { Button, ButtonToolbar, Form } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import moment from 'moment'
import $ from 'jquery'
import * as qs from 'qs'

// 取得預測比例
function handleSelect (e, updateSelectedFunc, updateDataFunc, updateRecommendListFunc) {
  const sport = e.target.value

  fetch(`/api/sport_analysis/playsport_prediction?sport=${sport}`)
    .then(r => r.json())
    .then(d => {
      updateSelectedFunc(sport)
      updateDataFunc(d.ret)

      // 切換球種需清空checkbox與推薦清單
      updateRecommendListFunc([])
      $("input[type=checkbox]:checked").prop('checked', false)
    })
    .catch(e => {
      alert(`Call omnipotent system error: ${e.message}`)
    })
}

// 計算推薦清單
function handleCalculate (e, selectedSport, updateRecommendList) {
  const checked = $("input[type=checkbox]:checked")
  const matchArray = []

  checked.map(m => {
    const matchId = checked[m].id.split('_')[0]
    let playtype = checked[m].id.split('_')[1]

    if (checked[m].id.split('_').length > 2) {
      playtype = `${checked[m].id.split('_')[1]}_${checked[m].id.split('_')[2]}`
    }

    matchArray.push({match_id: matchId, playtype})
  })

  const queryString = qs.stringify({
    sport: selectedSport,
    matches: matchArray
  })

  fetch(`/api/sport_analysis/recommend?${queryString}`)
    .then(r => r.json())
    .then(d => {
      const recommendList = []

      d.ret.map((recommend, index) => {
        if (recommend.star == 3) {
          recommendList.push(recommend.playtype)
        }
      })

      updateRecommendList(recommendList)
    })
    .catch(e => {
      alert(`Call omnipotent system error: ${e.message}`)
    })
}

// 顯示預測比例
function ShowData (props) {
  const selectedSport = props.selected
  const predictionResult = props.data

  if (selectedSport === '' && predictionResult.length === 0) {
    return <h1>Choose one kind of sport.</h1>
  }

  if (selectedSport !== '' && predictionResult.length === 0) {
    return <h1>{selectedSport} has no match today or not yet open betting.</h1>
  }

  return (
    <div>
      <Table striped hover variant='dark' className='text-center'>
        <thead>
          <tr>
            <th>Match</th>
            <th>Strong<br />Team</th>
            <th>Resource</th>
            <th>Away Win</th>
            <th>Home Win</th>
            <th>Weak+1.5</th>
            <th>Strong-1.5</th>
            <th>Total Big</th>
            <th>Total Small</th>
          </tr>
        </thead>
        <tbody>
          {predictionResult.map((r, index) => {
            return (
              <tr key={r.match_id}>
                <td>{r.match}</td>
                <td>{r.strong_team}</td>
                <td>Forum<br />Expert</td>
                <td>
                  {r.away_win}
                  <br />
                  <input type='checkbox' id={`${r.match_id}_away_win`} />
                </td>
                <td>
                  {r.home_win}
                  <br />
                  <input type='checkbox' id={`${r.match_id}_home_win`} />
                </td>
                <td>
                  {r.handicap_weak}
                  <br />
                  <input type='checkbox' id={`${r.match_id}_handicap_weak`} />
                </td>
                <td>
                  {r.handicap_strong}
                  <br />
                  <input type='checkbox' id={`${r.match_id}_handicap_strong`} />
                </td>
                <td>
                  {r.total_big}
                  <br />
                  <input type='checkbox' id={`${r.match_id}_total_big`} />
                </td>
                <td>
                  {r.total_small}
                  <br />
                  <input type='checkbox' id={`${r.match_id}_total_small`} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <center>
        <Button variant='danger' onClick={e => {handleCalculate(e, selectedSport, props.updateRecommendList)}}>Ｃalculate</Button>
      </center>
    </div>
  )
}

// 顯示推薦清單
function ShowRecommends (props) {
  const recommendList = props.data

  if (recommendList.length == 0) {
    return <div />
  }

  return (
    <div>
      <h1>[Recommend List]</h1>
      {
        recommendList.map((r, index) => {
          return <h1>{r}</h1>
        })
      }
    </div>
  )
}

/**
 * 主頁面：賽事預測
 */
function PlaysportPrediction () {
  const [selected, updateSelected] = useState('')
  const [data, updateData] = useState([])
  const [recommendList, updateRecommendList] = useState([])

  return (
    <div>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Text className='text-muted'>
            <h1>{moment().format('YYYY-MM-DD')}</h1>
          </Form.Text>
        </Form.Group>
      </Form>
      <ButtonToolbar>
        <Button
          className='mr-2'
          variant='primary'
          onClick={e => handleSelect(e, updateSelected, updateData, updateRecommendList)}
          value='MLB'
        >
          MLB
        </Button>
        <Button
          className='mr-2'
          variant='secondary'
          onClick={e => handleSelect(e, updateSelected, updateData, updateRecommendList)}
          value='NPB'
        >
          NPB
        </Button>
        <Button
          className='mr-2'
          variant='warning'
          onClick={e => handleSelect(e, updateSelected, updateData, updateRecommendList)}
          value='CPBL'
        >
          CPBL
        </Button>
        <Button
          className='mr-2'
          variant='info'
          onClick={e => handleSelect(e, updateSelected, updateData, updateRecommendList)}
          value='KBO'
        >
          KBO
        </Button>
      </ButtonToolbar>
      <br />
      <ShowData data={data} selected={selected} updateRecommendList={updateRecommendList} />
      <ShowRecommends data={recommendList} />
    </div>
  )
}

export default PlaysportPrediction
