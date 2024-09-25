import React from 'react'
import classes from './FeedbackTab.module.css'

export default function FeedbackTab() {
  return (
    <div className={classes['feedback-tab']}>
      <h2>Feedback for Learning With Seabird</h2>
      <p>See something on the website that needs to be changed or updated?</p>
      <a href="mailto:PARCCollab@ufv.ca"><button>
        Send us an email
        </button>
        </a>
    </div>
  )
}
