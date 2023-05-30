import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Path, G, Defs, ClipPath } from 'react-native-svg'

const LogoIcon = props => (
  <View
    style={[
      StyleSheet.absoluteFill,
      { alignItems: 'center', justifyContent: 'center' },
    ]}>
    <Svg
      width={400}
      height={200}
      fill="none"
      viewBox="0 0 390 25"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#a)">
        <Path
          d="M150.38 11.964c.146-.484.194-.969.194-1.501 0-3.391-2.775-6.152-6.183-6.152-.779 0-1.509.145-2.19.388C140.74 1.938 137.819 0 134.46 0c-4.772 0-8.666 3.875-8.666 8.622 0 .533.048 1.066.146 1.598-2.386.388-4.187 2.422-4.187 4.844 0 1.744.925 3.294 2.337 4.166a22.138 22.138 0 0 1 4.187-1.647s-1.753-6.152.292-6.54c2.531-.435 2.726.243 7.887-.338 5.501-.533 10.321.387 10.321.387.974 0 .876 2.035.73 3.536-.146 1.502-.633 2.858-.633 2.858 1.948.533 3.7 1.211 5.161 1.986 1.169-.726 1.996-1.986 1.996-3.487-.049-2.083-1.655-3.778-3.651-4.02Z"
          fill="#1D55CC"
        />
        <Path
          d="M137.868 20.974c7.205 0 13.632.968 17.867 3.536-2.678-3.585-9.688-6.152-17.867-6.152-8.18 0-15.19 2.567-17.868 6.152 4.236-2.568 10.662-3.536 17.868-3.536Z"
          fill="#1D55CC"
        />
        <Path
          d="M239.182 16.76a4.075 4.075 0 0 1-1.801 1.453c-1.51.63-2.873.29-3.798-1.114l8.131-3.39c-.098-.291-.195-.63-.341-.873-1.363-3.294-4.431-5.57-8.374-3.972-3.408 1.405-4.625 5.135-3.262 8.477v.048c1.509 3.585 5.112 4.941 8.666 3.488a6.785 6.785 0 0 0 2.775-2.034l-1.996-2.083Zm-5.015-5.232c1.412-.58 2.678.049 3.506 1.454l-5.015 2.082c-.389-1.598.097-2.954 1.509-3.536ZM156.027 13.078c0-4.65 3.457-8.476 8.277-8.476 2.97 0 4.722 1.065 6.378 2.567l-1.266 1.356c-1.363-1.308-2.921-2.228-5.161-2.228-3.603 0-6.329 2.906-6.329 6.684v.049c0 3.778 2.726 6.733 6.329 6.733 2.24 0 3.7-.872 5.258-2.325l1.217 1.162c-1.704 1.744-3.554 2.858-6.523 2.858-4.723 0-8.18-3.73-8.18-8.38ZM172.24 4.166h1.801v16.953h-1.801V4.166ZM175.355 15.21c0-3.44 2.678-6.346 6.33-6.346 3.602 0 6.28 2.858 6.28 6.249v.048c0 3.39-2.678 6.297-6.329 6.297-3.652 0-6.281-2.858-6.281-6.248Zm10.76 0c0-2.616-1.947-4.747-4.479-4.747-2.629 0-4.43 2.131-4.43 4.65v.048c0 2.568 1.898 4.65 4.479 4.65 2.58 0 4.43-2.082 4.43-4.601ZM189.377 16.614v-7.46h1.801v7.024c0 2.229 1.217 3.633 3.359 3.633 2.045 0 3.603-1.501 3.603-3.778V9.155h1.753v12.013h-1.753v-2.083c-.828 1.307-2.045 2.325-4.138 2.325-2.921 0-4.625-1.938-4.625-4.796ZM201.159 15.161c0-3.972 2.872-6.297 5.793-6.297 2.24 0 3.7 1.211 4.625 2.567V4.166h1.802v16.953h-1.85v-2.422c-.974 1.453-2.386 2.664-4.625 2.664-2.873.049-5.745-2.228-5.745-6.2Zm10.467 0c0-2.81-2.142-4.65-4.382-4.65-2.337 0-4.235 1.744-4.235 4.65v.049c0 2.857 1.947 4.65 4.235 4.65 2.24-.049 4.382-1.938 4.382-4.699ZM218.88 19.52v1.648h-3.554V4.214h3.554v6.297c.877-1.162 2.045-2.034 3.895-2.034 2.921 0 5.696 2.277 5.696 6.442v.049c0 4.165-2.726 6.442-5.696 6.442-1.899 0-3.067-.872-3.895-1.89Zm6.037-4.552c0-2.132-1.412-3.488-3.067-3.488-1.655 0-3.018 1.356-3.018 3.44v.048c0 2.082 1.363 3.439 3.018 3.439 1.655 0 3.067-1.357 3.067-3.44ZM242.347 14.967c0-4.214 2.726-6.49 5.696-6.49 1.899 0 3.067.871 3.895 1.84V4.166h3.554v16.953h-3.554v-1.744c-.877 1.163-2.045 2.035-3.895 2.035-2.921 0-5.696-2.277-5.696-6.443Zm9.639 0c0-2.131-1.363-3.487-3.018-3.487-1.655 0-3.067 1.356-3.067 3.439v.048c0 2.083 1.412 3.44 3.067 3.44 1.655 0 3.018-1.405 3.018-3.44ZM256.709 19.52l1.509-2.325c1.363.97 2.775 1.502 3.944 1.502 1.022 0 1.509-.387 1.509-.92v-.049c0-.775-1.217-1.017-2.581-1.453-1.752-.533-3.748-1.308-3.748-3.73v-.048c0-2.519 2.044-3.972 4.576-3.972 1.607 0 3.311.533 4.674 1.453l-1.363 2.422c-1.217-.727-2.483-1.162-3.408-1.162-.877 0-1.315.387-1.315.871v.049c0 .678 1.169 1.017 2.532 1.501 1.753.582 3.797 1.405 3.797 3.682v.048c0 2.761-2.093 4.02-4.771 4.02-1.753 0-3.7-.58-5.355-1.889ZM268.052 20.005a.975.975 0 0 1 1.948 0 .974.974 0 0 1-1.948 0Zm1.851 0a.871.871 0 0 0-.877-.872.87.87 0 0 0-.876.872.87.87 0 0 0 .876.872.871.871 0 0 0 .877-.872Zm-1.266-.533h.438c.146 0 .243.048.341.097a.372.372 0 0 1 .097.242c0 .145-.097.29-.243.34l.243.387h-.243l-.244-.34h-.195v.34h-.243v-1.066h.049Zm.438.484c.097 0 .195-.048.195-.145 0-.097-.049-.145-.195-.145h-.244v.29h.244Z"
          fill="#001238"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" transform="translate(120)" d="M0 0h150v24.51H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  </View>
)

export default LogoIcon