import React, { useState } from 'react'
import { Box, Input } from 'native-base'
import Hero from '../../Components/Hero/Hero'
import { useGetGuestsByFilter } from '../../Hooks/api'

function Search({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('')
  const { isLoading, isError, data, refetch } = useGetGuestsByFilter('search', {
    guestName: searchTerm,
    status: 'in_house'
  })

  const handleSearch = (q) => {
    setSearchTerm(q)
  }

  return (
    <Box style={{ }}>
      <Hero image>
        <Input
          color="white"
          rounded="3xl"
          bg="white"
          mt="5"
          placeholder="Search for a Guest"
          onChangeText={(q) => handleSearch(q)}
          value={searchTerm}
        />
      </Hero>


    </Box>
  )
}

export default Search
