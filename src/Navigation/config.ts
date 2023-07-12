import { CardStyleInterpolators } from '@react-navigation/stack'

const buildCoolModalConfig = (params: any) => ({
  allowsDragToDismiss: true,
  allowsTapToDismiss: true,
  backgroundOpacity: params.backgroundOpacity || 0.7,
  blocksBackgroundTouches: true,
  cardStyle: {
    backgroundColor: 'transparent',
  },
  cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
  cardOverlayEnabled: false,
  headerShown: false,
  presentation: 'transparentModal',
})

export const modalConfig = {
  options: ({ route: { params = {} } }) => ({
    ...buildCoolModalConfig({
      ...params,
      springDamping: 1,
      transitionDuration: 0,
    }),
  }),
}
