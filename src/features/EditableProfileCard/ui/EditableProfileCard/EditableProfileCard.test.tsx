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

    expect(
      screen.getByTestId(
        'EditableProfileCardHeader.CancelButton'
      )
    ).toBeInTheDocument()
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

    await user.clear(
      await screen.getByTestId('ProfileCard.firstName')
    )
    await user.clear(
      await screen.getByTestId('ProfileCard.lastName')
    )

    await user.type(
      await screen.getByTestId('ProfileCard.firstName'),
      'test'
    )
    await user.type(
      await screen.getByTestId('ProfileCard.lastName'),
      'test'
    )

    expect(
      screen.getByTestId('ProfileCard.firstName')
    ).toHaveValue('test')
    expect(
      screen.getByTestId('ProfileCard.lastName')
    ).toHaveValue('test')

    await user.click(
      await screen.getByTestId(
        'EditableProfileCardHeader.CancelButton'
      )
    )

    expect(
      screen.getByTestId('ProfileCard.firstName')
    ).toHaveValue(mockProfile.firstName)
    expect(
      screen.getByTestId('ProfileCard.lastName')
    ).toHaveValue(mockProfile.lastName)
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

    await user.clear(
      await screen.getByTestId('ProfileCard.firstName')
    )
    await user.clear(
      await screen.getByTestId('ProfileCard.lastName')
    )

    await user.type(
      await screen.getByTestId('ProfileCard.firstName'),
      'test'
    )
    await user.type(
      await screen.getByTestId('ProfileCard.lastName'),
      'test'
    )

    await user.click(
      await screen.getByTestId(
        'EditableProfileCardHeader.SubmitButton'
      )
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

    await user.clear(
      await screen.getByTestId('ProfileCard.firstName')
    )

    await user.click(
      await screen.getByTestId(
        'EditableProfileCardHeader.SubmitButton'
      )
    )

    expect(
      screen.getByTestId(
        'EditableProfileCard.Error.Paragraph'
      )
    ).toBeInTheDocument()
  })
})
