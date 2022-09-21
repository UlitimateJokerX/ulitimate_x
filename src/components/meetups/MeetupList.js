import MeetupItem from './MeetupItem'
import classes from './MeetupItem.module.css'

function MeetupList (props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map(m => {
        return <MeetupItem
          key={m.id}
          id={m.id}
          image={m.image}
          title={m.title}
          address={m.address}
          description={m.description}
        />
      })}
    </ul>
  )
}

export default MeetupList
