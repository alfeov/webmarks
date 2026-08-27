'use client'

import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'

import { useAuthDialogContext } from '../model/AuthDialogContext'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'

export function AuthDialog() {
  const { mode, openSignupDialog, openLoginDialog, closeAuthDialog } =
    useAuthDialogContext()

  return (
    <Dialog
      open={mode === 'login' || mode === 'signup'}
      disablePointerDismissal
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' ? 'Login to your account' : 'Create new account'}
          </DialogTitle>
          <DialogDescription>
            Enter fields below to
            {mode === 'login'
              ? ' login to your account'
              : ' create new account'}
            <br />
            <span className='flex justify-between'>
              <span>
                {mode === 'login'
                  ? "Hasn't account yet?"
                  : 'Already has an account?'}
              </span>
              <Button
                variant='link'
                onClick={mode === 'login' ? openSignupDialog : openLoginDialog}
                className='h-auto'
              >
                {mode === 'login' ? 'Sign Up' : 'Login'}
              </Button>
            </span>
          </DialogDescription>
        </DialogHeader>
        {mode === 'login' ? <LoginForm /> : <SignupForm />}
        <DialogFooter>
          <Button onClick={closeAuthDialog} variant='outline'>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
