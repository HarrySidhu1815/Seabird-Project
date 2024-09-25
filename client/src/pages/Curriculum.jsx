import React from 'react'
import CurriculumHeader from '../components/CurriculumHeader/CurriculumHeader'
import Resource from '../components/Resource/Resource'
import classes from './pages.module.css'
import { useSelector } from 'react-redux'
import AccessButton from '../UI/AccessButton'
import FeedbackTab from '../UI/FeedbackTab'

export default function Curriculum() {
  const {currentUser} = useSelector((state) => state.user)

  return (
    <div>
      <CurriculumHeader />
      <div>
      <Resource />
      </div>
      {!currentUser && (
          <div className={classes.lockPanel}>
            <AccessButton />
            </div>
        )}
        {currentUser && <FeedbackTab />}
    </div>
  )
}
