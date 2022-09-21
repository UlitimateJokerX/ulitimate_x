// Components
import NewMeetupForm from '../components/meetups/NewMeetupForm'

function NewMeetupPage () {
  function addMeetupHandler (data) {
    // const requestOptions = {
    //   method: 'GET',
    //   // body: JSON.stringify({a: '123'}),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }

    fetch('/api/test')
      .then(r => r.json())
      .then(d => console.log(d))
      .catch(e => {
        console.log('error: ', e.message)
      })
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  )
}

export default NewMeetupPage
