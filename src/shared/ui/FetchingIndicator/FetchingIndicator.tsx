'use client'

import { Spinner } from '@/shared/ui/spinner'
import {
  AbsoluteWrapper,
  PortalWrapper,
  StickyWrapper,
} from '@/shared/ui/Sticky'

import styles from './FetchingIndicator.module.css'

//! set body position relative

export interface FetchingIndicatorProps {
  condition: boolean
  className?: string
}

export function FetchingIndicator({
  className,
  condition,
}: FetchingIndicatorProps) {
  return (
    <>
      <PortalWrapper>
        <AbsoluteWrapper
          className={`left-[50%] z-50 translate-x-[-50%] ${className}`}
        >
          <StickyWrapper className='top-[80px]'>
            {condition && (
              <div
                className={`bg-input dark:bg-chart-4 rounded-2xl p-[5px] ${styles.animation}`}
              >
                <Spinner data-testid='fetching-indicator' className='size-6' />
              </div>
            )}
          </StickyWrapper>
        </AbsoluteWrapper>
      </PortalWrapper>
    </>
  )
}
