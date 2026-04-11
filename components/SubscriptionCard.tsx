import { formatCurrency } from '@/lib/currencies'
import { formateStatusLabel, formateSubscriptionDateTime } from '@/lib/utils'
import clsx from 'clsx'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

const SubscriptionCard = ({ name, currency, billing, icon, price, color, category, plan, renewalDate, onPress, expanded, paymentMethod, startDate , status}: SubscriptionCardProps) => {
    return (
        <Pressable onPress={onPress} className={clsx('sub-card', expanded ? 'sub-card-expanded' : 'bg-card')} style={!expanded && color ? { backgroundColor: color } : undefined}>
            <View className='sub-head'>
                <View className="sub-main">
                    <Image source={icon} className='sub-icon' />
                    <View className="sub-copy">
                        <Text className='sub-title' numberOfLines={1}>{name}</Text>
                        <Text className='sub-meta' numberOfLines={1}>
                            {category?.trim() || plan?.trim() || renewalDate ? formateSubscriptionDateTime(renewalDate) : ''}
                        </Text>
                    </View>
                </View>
                <View className="sub-price-box">
                    <Text className="sub-price">{formatCurrency(price)}</Text>
                    <Text className="sub-billing">{billing}</Text>
                </View>
            </View>

            {expanded && (
                <View className='sub-body'>
                    <View className="sub-details">
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label">Payments:</Text>
                                <Text className="sub-value" numberOfLines={1} ellipsizeMode='tail'> {paymentMethod?.trim()} </Text>
                            </View>
                        </View>
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label">Category:</Text>
                                <Text className="sub-value" numberOfLines={1} ellipsizeMode='tail'> {category?.trim() || plan?.trim() || ''} </Text>
                            </View>
                        </View>
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label">Started:</Text>
                                <Text className="sub-value" numberOfLines={1} ellipsizeMode='tail'> {startDate ? formateSubscriptionDateTime(startDate) : ''} </Text>
                            </View>
                        </View>
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label">Renewal Date:</Text>
                                <Text className="sub-value" numberOfLines={1} ellipsizeMode='tail'> {renewalDate ? formateSubscriptionDateTime(renewalDate) : 'NA'} </Text>
                            </View>
                        </View>
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label">Status:</Text>
                                <Text className="sub-value" numberOfLines={1} ellipsizeMode='tail'> {status ? formateStatusLabel(status) : ''} </Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </Pressable>
    )
}

export default SubscriptionCard