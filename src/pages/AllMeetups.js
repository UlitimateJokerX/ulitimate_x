import MeetupList from '../components/meetups/MeetupList'

const DUMMY_DATA = [
  {
    id: '1',
    title: '1',
    iamge: '1',
    address: '1',
    description: '1'
  },
  {
    id: '2',
    title: '2',
    iamge: '2',
    address: '2',
    description: '2'
  }
]

function AllMeetupsPage () {
  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={DUMMY_DATA} />
    </section>
  )
}

export default AllMeetupsPage
