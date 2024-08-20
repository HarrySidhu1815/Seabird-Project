import React from 'react'
import CurriculumHeader from '../components/CurriculumHeader/CurriculumHeader'
import Resource from '../components/Resource/Resource'
import classes from './Interviews.module.css'
import { useSelector } from 'react-redux'
import AccessButton from '../UI/AccessButton'
import ReactPlayer from 'react-player';


export default function Curriculum() {
  const {currentUser} = useSelector((state) => state.user)
  const VIDEO_PATH = 'https://youtu.be/SjQpLqd_eJg';
  return (
    <div>
      <ReactPlayer url={VIDEO_PATH} controls={true} />
      <CurriculumHeader />
      <div className={`${!currentUser ? classes['restricted_cuuriculum'] : ''}`}>
      <Resource />
      </div>
      {!currentUser && (
          <div className={classes.lockPanel}>
            <AccessButton />
            </div>
        )}
    </div>
  )
}
