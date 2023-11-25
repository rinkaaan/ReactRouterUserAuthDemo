import {
  redirect,
  useActionData,
  useNavigation,
  useSearchParams,
} from 'react-router-dom'
import { authSlice } from '../slices/authSlice.js'
import { RouterForm } from '../common/aliases.js'
import {
  AppLayout,
  Button,
  Container,
  ContentLayout,
  Form,
  FormField,
  Header, SideNavigation,
  SpaceBetween,
} from '@cloudscape-design/components'
import { Input } from '../components/Input'

export function loader() {
  if (authSlice.isAuthenticated) {
    return redirect('/dashboard')
  }
  return null
}

export async function action({ request }) {
  const formData = await request.formData()
  const username = formData.get('username')

  if (!username) {
    return {
      error: 'You must provide a username to log in',
    }
  }

  try {
    await authSlice.signIn(username)
  } catch (error) {
    return {
      error: 'Invalid login attempt',
    }
  }

  const redirectTo = formData.get('redirectTo')
  console.log('redirectTo:', redirectTo)
  return redirect(redirectTo || '/dashboard')
}

export function Component() {
  const [searchParams, _] = useSearchParams()
  const navigation = useNavigation()
  const actionData = useActionData()
  const isLoggingIn = navigation.formData?.get('username') != null

  return (
    <AppLayout
      navigation={
        <SideNavigation
          items={[
            {
              type: 'section',
              text: 'Links',
              items: [
                {
                  type: 'link',
                  text: 'Dashboard',
                  href: '/dashboard',
                },
                {
                  type: 'link',
                  text: 'Logout',
                  href: '/logout',
                },
              ],
            },
          ]}
        />
      }
      content={
        <ContentLayout
          header={
            <SpaceBetween size='m'>
              <Header variant='h1' description='This is a demo!'>
                Login
              </Header>
            </SpaceBetween>
          }
        >
          <Container>
            <RouterForm method='post' replace>
              <Form
                actions={
                  <SpaceBetween direction='horizontal' size='xs'>
                    <Button variant='primary' disabled={isLoggingIn}>
                      {isLoggingIn ? 'Logging in...' : 'Login'}
                    </Button>
                  </SpaceBetween>
                }
              >
                <input
                  type='hidden'
                  name='redirectTo'
                  value={searchParams.get('from') || '/dashboard'}
                />
                <FormField label='Username' errorText={actionData?.error}>
                  <Input name='username'/>
                </FormField>
              </Form>
            </RouterForm>
          </Container>
        </ContentLayout>
      }
    />
  )
}
