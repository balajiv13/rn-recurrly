import ListHeading from '@/components/ListHeading';
import SubscriptionCard from '@/components/SubscriptionCard';
import UpcomingSubscriptionCard from '@/components/UpcomingSubscriptionCard';
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS } from '@/constants/data';
import { icons } from '@/constants/icons';
import '@/global.css';
import { formatCurrency } from '@/lib/currencies';
import { useUser } from '@clerk/expo';
import dayjs from 'dayjs';
import { styled } from 'nativewind';
import { useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

const SafeAreaView = styled(RNSafeAreaView);

/**
 * Render the app's home screen containing welcome greeting with authenticated user info,
 * balance overview, upcoming subscriptions, and all active subscriptions.
 *
 * The screen is protected by auth state and only rendered for signed-in users.
 *
 * @returns The home screen React component with user data and subscription list
 */
export default function App() {
  const { user } = useUser();
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>();

  // Use authenticated user's first name for greeting, fallback to default
  const userName = user?.firstName || HOME_USER.name;

  return (
    <SafeAreaView className="flex-1 p-5 bg-background">
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View className="home-header">
              <View className='home-user'>
                {user?.imageUrl ? (
                  <Image 
                    source={{ uri: user.imageUrl }} 
                    className='home-avatar' 
                    defaultSource={require('@/assets/images/avatar.png')}
                  />
                ) : (
                  <Image source={require('@/assets/images/avatar.png')} className='home-avatar' />
                )}
                <Text className='home-user-name'>{userName}</Text>
              </View>
              <Image source={icons.add} className='home-add-icon'></Image>
            </View>

            <View className='home-balance-card'>
              <Text className='home-balance-label'>Balance</Text>
              <View className='home-balance-row'>
                <Text className='home-balance-amount'>{formatCurrency(HOME_BALANCE.amount)}</Text>
                <Text className='home-balance-date'>{dayjs(HOME_BALANCE.nextRenewalDate).format('MMMM D')}</Text>
              </View>
            </View>

            <View className='mb-5'>
              <ListHeading title="Upcoming" />
              <FlatList data={UPCOMING_SUBSCRIPTIONS} renderItem={({ item }) => (<UpcomingSubscriptionCard {...item} />)}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={<Text className='home-empty-state' >No upcoming renewal yet.</Text>}
              />
            </View>
            <ListHeading title="All Subscriptions" />

          </>
        )}
        data={HOME_SUBSCRIPTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubscriptionCard {...item} expanded={expandedSubscriptionId === item.id} onPress={() => setExpandedSubscriptionId((currendId) => (currendId === item.id ? null : item.id))} />
        )}
        extraData={expandedSubscriptionId}
        ItemSeparatorComponent={() => (<View className='h-4' />)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text className='home-empty-state' >No subscriptions yet.</Text>}
        contentContainerClassName='pb-30'
      />
    </SafeAreaView>
  );
}
