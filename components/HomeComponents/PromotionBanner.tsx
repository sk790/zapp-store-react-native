import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function PromotionBanner() {
  return (
    <View style={{marginHorizontal:5,paddingVertical:10}}>
      <Image
        source={require("@/assets/images/sale-banner.jpg")}
        style={{ width: "100%", height: 125, borderRadius: 5 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})