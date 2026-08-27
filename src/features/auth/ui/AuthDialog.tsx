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

import {
  useAuthDialogActionsContext,
  useAuthDialogStateContext,
} from '../model/AuthDialogContext'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'

export function AuthDialog() {
  const authDialogState = useAuthDialogStateContext()
  const authDialogActions = useAuthDialogActionsContext()

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
                    ? authDialogActions.openSignupDialog
                    : authDialogActions.openLoginDialog
                }
                className='h-auto'
              >
                {authDialogState === 'login' ? 'Sign Up' : 'Login'}
              </Button>
            </span>
          </DialogDescription>
        </DialogHeader>
        {authDialogState === 'login' ? <LoginForm /> : <SignupForm />}
        <DialogFooter>
          <Button onClick={authDialogActions.closeAuthDialog} variant='outline'>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
