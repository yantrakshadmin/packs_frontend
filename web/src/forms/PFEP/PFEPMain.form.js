import React, { useEffect, useState,Suspense } from 'react';
import { Steps } from 'antd';
import { CLEAN_PFEP_DATA } from 'common/actions';
import { useDispatch, useSelector } from 'react-redux';
import { PFEPSteps } from '../../steps/PFEPSteps';
import { Loading } from '../../components/Loading';

const { Step } = Steps;


export const PFEPMainForm = ({ id, onCancel,onDone,lead }) => {
  const [active,setActive] = useState(0)
  const CurrentComponent = (PFEPSteps[active].component);
  const dispatch = useDispatch();
  return (
    <div>
      <Steps
        size='small'
        current={active}
        onChange={(e)=>{setActive(e)}}
        labelPlacement='vertical'>
        {PFEPSteps.map((step)=>(<Step title={step.title} />))}
      </Steps>
      <br />
      <Suspense fallback={Loading}>
        <CurrentComponent
          lead={lead}
          active={active}
          onNext={()=>{setActive(active+1);}}
          onDone={()=>{dispatch({ type:CLEAN_PFEP_DATA });  onDone()}}
          onCancel={()=>{dispatch({ type:CLEAN_PFEP_DATA });  onCancel()}}
          id={id} />
      </Suspense>
    </div>
  );
};

