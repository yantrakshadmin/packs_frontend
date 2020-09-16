import React, { useState,Suspense } from 'react';
import { Steps } from 'antd';
import { PFEPSteps } from '../../steps/PFEPSteps';
import { Loading } from '../../components/Loading';

const { Step } = Steps;


export const PFEPMainForm = ({ id, onCancel,onDone }) => {
  const [active,setActive] = useState(0)

  const CurrentComponent = (PFEPSteps[active].component);

  return (
    <div>
      <Steps size='small' current={active} labelPlacement='vertical'>
        {PFEPSteps.map((step)=>(<Step title={step.title} />))}
      </Steps>
      <br />
      <Suspense fallback={Loading}>
        <CurrentComponent
          onNext={()=>{setActive(active+1)}}
          onDone={onDone}
          onCancel={onCancel}
          id={id} />
      </Suspense>
    </div>
  );
};

