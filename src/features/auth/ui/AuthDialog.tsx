'use client'

import { use } from 'react'

import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'

import {
  AuthDialogSettersContext,
  AuthDialogStateContext,
} from '../model/AuthDialogContext'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'

export function AuthDialog() {
  const authDialogState = use(AuthDialogStateContext)
  const setters = use(AuthDialogSettersContext)

  return (
    <Dialog
      open={authDialogState === 'login' || authDialogState === 'signup'}
      disablePointerDismissal
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {authDialogState === 'login'
              ? 'Login to your account'
              : 'Create new account'}
          </DialogTitle>
          <DialogDescription>
            Enter fields below to
            {authDialogState === 'login'
              ? ' login to your account'
              : ' create new account'}
            <br />
            <span className='flex justify-between'>
              <span>
                {authDialogState === 'login'
                  ? "Hasn't account yet?"
                  : 'Already has an account?'}
              </span>
              <Button
                variant='link'
                onClick={
                  authDialogState === 'login'
                    ? setters?.openSignupDialog
                    : setters?.openLoginDialog
                }
                className='h-auto'
              >
                {authDialogState === 'login' ? 'Sign Up' : 'Login'}
              </Button>
            </span>
          </DialogDescription>
        </DialogHeader>
        {authDialogState === 'login' ? (
          <LoginForm id='auth-form' />
        ) : (
          <SignupForm id='auth-form' />
        )}
        <DialogFooter>
          <Button onClick={setters?.closeAuthDialog} variant='outline'>
            Close
          </Button>
          <Button type='submit' form='auth-form'>
            {authDialogState === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
