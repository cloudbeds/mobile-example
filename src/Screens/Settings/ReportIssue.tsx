import React from 'react'
import WebView from 'react-native-webview'
import { Box } from 'native-base'

import { useDimensions } from '../../Hooks'
import { ios } from '../../Theme/devices'
import { googleSurveyURL } from '../../models/constants'

import Layout from '../../Components/Layout'

function ReportIssue() {
  const { height } = useDimensions()

  return (
    <Layout noPadding>
      <Box height={height - (ios ? 0 : 82)}>
        <WebView source={{ uri: googleSurveyURL }} />
      </Box>
    </Layout>
  )
}

export default ReportIssue
