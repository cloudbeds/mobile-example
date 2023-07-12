import React, { memo } from 'react'
import { Text, VStack } from 'native-base'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@fortawesome/fontawesome-svg-core'

import { DashboardTypes } from '../../models/reservation'

interface Props {
  text: string
  iconColor: any
  type: DashboardTypes
}

const EmptyView = ({ text, iconColor, type }: Props) => {
  return (
    <VStack alignItems="center" space="5" p="7">
      <FontAwesomeIcon
        icon={
          (type === DashboardTypes.inHouse ? faMoon : faCheckCircle) as Icon
        }
        size={32}
        color={iconColor}
      />
      <Text size="sm" fontWeight="500" textAlign="center">
        {text}
      </Text>
    </VStack>
  )
}

export default memo(EmptyView)
