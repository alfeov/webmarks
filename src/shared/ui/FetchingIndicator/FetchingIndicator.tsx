'use client'

import { Spinner } from '@/shared/ui/spinner'
import {
  AbsoluteWrapper,
  StickyPortalWrapper,
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
      {condition && (
        <StickyPortalWrapper>
          <AbsoluteWrapper
            className={`left-[50%] translate-x-[-50%] ${className}`}
          >
            <StickyWrapper className='top-[80px]'>
              <div
                className={`bg-input dark:bg-chart-4 rounded-2xl p-[5px] ${styles.animation}`}
              >
                <Spinner className='size-6' />
              </div>
            </StickyWrapper>
          </AbsoluteWrapper>
        </StickyPortalWrapper>
      )}
    </>
  )
}
