import React, { memo } from 'react'
import { Badge, Box, IBoxProps } from 'native-base'

interface Props extends IBoxProps {
  bgColor?: any
  dotColor?: any
}

const StyledBadge: React.FC<Props> = ({
  bgColor = 'white',
  dotColor = 'warning.400',
  ...props
}) => {
  return (
    <Box
      position={'absolute'}
      bg={bgColor}
      right={0}
      top={0}
      mt={1}
      mr={1}
      rounded={'full'}
      width={4}
      height={4}
      alignItems={'center'}
      justifyContent={'center'}
      p={0}
      {...props}>
      <Badge
        rounded={'full'}
        width={'2.5'}
        height={'2.5'}
        p={0}
        bg={dotColor}
      />
    </Box>
  )
}

export default memo(StyledBadge)
