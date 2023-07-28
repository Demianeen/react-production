import { screen, waitFor } from '@testing-library/react'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'
import { mockProfile } from '@/entities/Profile/testing'
import { profileReducer } from '../../model/slice/profileSlice'
import { EditableProfileCard } from './EditableProfileCard'

const options = {
  preloadedState: {
    user: {
      authData: {
        id: 1,
      },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
}

describe('features/EditableProfileCard', () => {
  it('should toggle readonly mode', async () => {
    const { user } = componentRender(
      <EditableProfileCard id={1} />,
      options
    )

    await user.click(
      await screen.findByTestId(
        'EditableProfileCardHeader.EditButton'
      )
    )

    await waitFor(async () => {
      expect(
        screen.getByTestId('EditableProfileCardHeader.CancelButton')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('EditableProfileCardHeader.SubmitButton')
      ).toBeInTheDocument()
    })

    await user.click(
      await screen.findByTestId(
        'EditableProfileCardHeader.CancelButton'
      )
    )

    await waitFor(async () => {
      expect(
        screen.getByTestId('EditableProfileCardHeader.EditButton')
      ).toBeInTheDocument()
    })
  })

  it('should reset data after cancel', async () => {
    const { user } = componentRender(
      <EditableProfileCard id={1} />,
      options
    )

    await user.click(
      await screen.findByTestId(
        'EditableProfileCardHeader.EditButton'
      )
    )

    await user.clear(screen.getByTestId('ProfileCard.firstName'))
    await user.clear(screen.getByTestId('ProfileCard.lastName'))

    await user.type(
      screen.getByTestId('ProfileCard.firstName'),
      'test'
    )
    await user.type(
      screen.getByTestId('ProfileCard.lastName'),
      'test'
    )

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue(
      'test'
    )
    expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue(
      'test'
    )

    await user.click(
      screen.getByTestId('EditableProfileCardHeader.CancelButton')
    )

    await waitFor(async () => {
      expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue(
        mockProfile.firstName
      )
      expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue(
        mockProfile.lastName
      )
    })
  })

  it('should submit data', async () => {
    const { user } = componentRender(
      <EditableProfileCard id={1} />,
      options
    )

    await user.click(
      await screen.findByTestId(
        'EditableProfileCardHeader.EditButton'
      )
    )

    await user.clear(screen.getByTestId('ProfileCard.firstName'))
    await user.clear(screen.getByTestId('ProfileCard.lastName'))

    await user.type(
      screen.getByTestId('ProfileCard.firstName'),
      'test'
    )
    await user.type(
      screen.getByTestId('ProfileCard.lastName'),
      'test'
    )

    await user.click(
      screen.getByTestId('EditableProfileCardHeader.SubmitButton')
    )

    await waitFor(async () => {
      expect(
        await screen.findByTestId('ProfileCard.firstName')
      ).toHaveValue('test')
      expect(
        await screen.findByTestId('ProfileCard.lastName')
      ).toHaveValue('test')
    })
  })

  it('should not submit form with empty fields', async () => {
    const { user } = componentRender(
      <EditableProfileCard id={1} />,
      options
    )

    await user.click(
      await screen.findByTestId(
        'EditableProfileCardHeader.EditButton'
      )
    )

    await user.clear(screen.getByTestId('ProfileCard.age'))

    await user.click(
      screen.getByTestId('EditableProfileCardHeader.SubmitButton')
    )

    await waitFor(async () => {
      expect(
        await screen.findByTestId(
          'EditableProfileCardHeader.SubmitButton'
        )
      ).toBeInTheDocument()
    })
  })

  it('should show validation errors', async () => {
    const { user } = componentRender(
      <EditableProfileCard id={1} />,
      options
    )

    await user.click(
      await screen.findByTestId(
        'EditableProfileCardHeader.EditButton'
      )
    )

    await user.clear(screen.getByTestId('ProfileCard.firstName'))
    await user.type(
      screen.getByTestId('ProfileCard.firstName'),
      'test'
    )

    await user.clear(screen.getByTestId('ProfileCard.username'))
    await user.type(
      screen.getByTestId('ProfileCard.username'),
      'test'
    )

    await user.clear(screen.getByTestId('ProfileCard.lastName'))
    await user.type(
      screen.getByTestId('ProfileCard.lastName'),
      'test'
    )

    await user.clear(screen.getByTestId('ProfileCard.city'))
    await user.type(screen.getByTestId('ProfileCard.city'), 'test')

    await user.clear(screen.getByTestId('ProfileCard.age'))
    await user.type(screen.getByTestId('ProfileCard.age'), '1')

    await user.click(
      screen.getByTestId('EditableProfileCardHeader.SubmitButton')
    )

    await waitFor(async () => {
      expect(
        await screen.findByTestId(
          'EditableProfileCard.Error.Paragraph'
        )
      ).toBeInTheDocument()
    })
  })
})
