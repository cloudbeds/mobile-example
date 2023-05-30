import React from 'react'
import { Text, VStack } from 'native-base'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'

const EmptyView = ({ text, iconColor }) => {
  return (
    <VStack alignItems="center" space="5" p="7">
      <FontAwesomeIcon icon={faCheckCircle} size={32} color={iconColor} />
      <Text size="sm" fontWeight="500" textAlign="center">
        {text}
      </Text>
    </VStack>
  )
}

export default EmptyView
